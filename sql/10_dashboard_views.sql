-- ============================================================
-- DevLemosx — Fase 6: Analytics com views agregadas (sem PII)
-- ============================================================

-- 1. Nova tabela: rastreio de "roadmap aberto" / "tecnologia visitada"
create table if not exists public.visualizacoes (
  id uuid primary key default gen_random_uuid(),
  tipo text not null,       -- 'roadmap' ou 'tecnologia'
  referencia text not null, -- slug do roadmap ou da tecnologia
  origem text,               -- de onde a pessoa veio (document.referrer)
  criado_em timestamptz default now()
);

alter table public.visualizacoes enable row level security;

create policy "Qualquer um pode registrar uma visualização"
on public.visualizacoes
for insert
to anon
with check (true);

-- Sem policy de select na tabela crua — só nas views agregadas abaixo,
-- que mostram apenas números totais, nunca o evento individual.

-- 2. Views agregadas — só contagens, sem e-mail, sem timestamp por pessoa
create or replace view public.ranking_cursos_cliques as
select curso_nome, tecnologia, count(*) as total_cliques
from public.cliques
group by curso_nome, tecnologia
order by total_cliques desc;

create or replace view public.ranking_tecnologias_cliques as
select tecnologia, count(*) as total_cliques
from public.cliques
where tecnologia is not null
group by tecnologia
order by total_cliques desc;

create or replace view public.ranking_por_origem as
select origem, count(*) as total_cliques
from public.cliques
where origem is not null
group by origem
order by total_cliques desc;

create or replace view public.ranking_downloads as
select roadmap_slug, count(*) as total_downloads
from public.downloads_pdf
group by roadmap_slug
order by total_downloads desc;

create or replace view public.ranking_roadmaps_visualizacoes as
select referencia as roadmap_slug, count(*) as total_visualizacoes
from public.visualizacoes
where tipo = 'roadmap'
group by referencia
order by total_visualizacoes desc;

create or replace view public.ranking_tecnologias_visualizacoes as
select referencia as tecnologia_slug, count(*) as total_visualizacoes
from public.visualizacoes
where tipo = 'tecnologia'
group by referencia
order by total_visualizacoes desc;

-- 3. Libera leitura pública SÓ dessas views (a chave publishable só
--    consegue ler o agregado, nunca clique/download/lead individual)
grant select on public.ranking_cursos_cliques to anon;
grant select on public.ranking_tecnologias_cliques to anon;
grant select on public.ranking_por_origem to anon;
grant select on public.ranking_downloads to anon;
grant select on public.ranking_roadmaps_visualizacoes to anon;
grant select on public.ranking_tecnologias_visualizacoes to anon;

-- ============================================================
-- Depois de rodar, se o Supabase não atualizar sozinho, vá em
-- Database > API e clique em "Reload schema".
-- ============================================================
