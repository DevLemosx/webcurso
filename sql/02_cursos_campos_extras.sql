-- ============================================================
-- DevLemosx — Complemento da Fase 1
-- Rode depois do supabase-setup.sql original (não precisa
-- rodar de novo o que já rodou — isso só ADICIONA o que falta).
-- ============================================================

-- 1. Colunas que faltavam da tabela cursos
alter table public.cursos
  add column if not exists tags text[],
  add column if not exists idioma text,
  add column if not exists carga_horaria text,
  add column if not exists nota numeric,
  add column if not exists imagem_url text;

-- 2. Marca 2 cursos como "destaque" só pra você já ver a seção
--    funcionando no site. Troque à vontade pelo Table Editor
--    (é só marcar/desmarcar o checkbox "destaque" de qualquer curso).
update public.cursos
set destaque = true
where nome in ('Formação Python', 'Cursos de JavaScript');

-- 3. Exemplo de como preencher idioma, carga horária e nota
--    num curso específico (ajuste o "where" pro curso certo):
-- update public.cursos
-- set idioma = 'Português', carga_horaria = '40 horas', nota = 4.7
-- where nome = 'Formação Python';

-- ============================================================
-- Pra conferir: select nome, destaque, tags, idioma, nota from public.cursos;
-- ============================================================
