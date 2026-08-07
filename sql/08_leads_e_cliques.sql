-- ============================================================
-- DevLemosx — Fase 5: Captura de e-mail + Rastreio de cliques
-- ============================================================

-- 1. Captura de e-mail ------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  origem text,             -- de qual página veio o cadastro (pathname)
  criado_em timestamptz default now()
);

alter table public.leads enable row level security;

-- Qualquer visitante pode SE CADASTRAR (insert)...
create policy "Qualquer um pode se cadastrar"
on public.leads
for insert
to anon
with check (true);

-- ...mas ninguém de fora consegue LER a lista (sem policy de select pra "anon").
-- Só você vê os e-mails, pelo Table Editor ou SQL Editor do Supabase.

-- 2. Rastreio de cliques de afiliado -----------------------------------------
create table if not exists public.cliques (
  id uuid primary key default gen_random_uuid(),
  curso_id uuid references public.cursos(id) on delete set null,
  curso_nome text,          -- guardado também "solto" pra não perder o dado se o curso for apagado depois
  tecnologia text,
  criado_em timestamptz default now()
);

alter table public.cliques enable row level security;

create policy "Qualquer um pode registrar um clique"
on public.cliques
for insert
to anon
with check (true);

-- Sem policy de select pra "anon" — só você vê os cliques agregados.

-- ============================================================
-- Pra ver os resultados depois:
--
-- Lista de e-mails:
-- select email, criado_em from public.leads order by criado_em desc;
--
-- Ranking de cursos mais clicados:
-- select curso_nome, tecnologia, count(*) as total_cliques
-- from public.cliques
-- group by curso_nome, tecnologia
-- order by total_cliques desc;
--
-- Ranking por tecnologia:
-- select tecnologia, count(*) as total_cliques
-- from public.cliques
-- group by tecnologia
-- order by total_cliques desc;
-- ============================================================
