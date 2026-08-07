-- ============================================================
-- DevLemosx — Fase 5.5: Analytics mais rico + downloads de PDF
-- ============================================================

-- 1. Adiciona "origem" (de qual página veio) nos cliques de curso
alter table public.cliques
  add column if not exists origem text;

-- 2. Nova tabela: rastreio de downloads de PDF (por roadmap)
create table if not exists public.downloads_pdf (
  id uuid primary key default gen_random_uuid(),
  roadmap_slug text,
  arquivo text,
  origem text,
  criado_em timestamptz default now()
);

alter table public.downloads_pdf enable row level security;

create policy "Qualquer um pode registrar um download"
on public.downloads_pdf
for insert
to anon
with check (true);

-- Sem policy de select pra "anon" — só você vê os downloads, pelo Table Editor.

-- ============================================================
-- Pra consultar depois:
--
-- Cliques por curso, com origem:
-- select curso_nome, tecnologia, origem, count(*) from public.cliques
-- group by curso_nome, tecnologia, origem order by count(*) desc;
--
-- Ranking de PDFs mais baixados:
-- select roadmap_slug, count(*) as total_downloads from public.downloads_pdf
-- group by roadmap_slug order by total_downloads desc;
-- ============================================================
