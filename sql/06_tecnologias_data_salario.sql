-- ============================================================
-- DevLemosx — Fase 3 complemento: rastrear quando o salário foi atualizado
-- ============================================================

alter table public.tecnologias
  add column if not exists salario_atualizado_em date default current_date;

update public.tecnologias
set salario_atualizado_em = current_date
where slug in ('html', 'css', 'javascript');

-- ============================================================
-- Confira: select slug, salario_medio, salario_atualizado_em from public.tecnologias;
-- ============================================================
