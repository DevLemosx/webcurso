-- ============================================================
-- DevLemosx — Cursos com múltiplas tecnologias
-- ============================================================

-- 1. Nova coluna: lista completa de tecnologias do curso (array).
--    A coluna "tecnologia" (singular) continua existindo e vira só
--    a "principal" — decide o selo do card e o link direto.
alter table public.cursos
  add column if not exists tecnologias text[];

-- 2. Preenche a coluna nova pros cursos que já existem, usando a
--    tecnologia única de cada um como primeiro (e único) item do array.
update public.cursos
set tecnologias = ARRAY[tecnologia]
where tecnologias is null;

-- 3. Curso novo: Desenvolvimento Web Completo (Udemy)
--    Preencha "link" e "professor" antes de rodar.
insert into public.cursos
  (nome, professor, descricao, plataforma, tecnologia, tecnologias, tags, nivel, gratuito, preco, link, destaque)
values (
  'Desenvolvimento Web Completo - 20 cursos + 20 projetos',
  'PREENCHA_O_PROFESSOR',
  'Pacote com 20 cursos e mais de 117 horas de aula, cobrindo front-end e back-end na prática: HTML5, CSS3, Bootstrap, JavaScript moderno, PHP, MySQL, jQuery, MVC, APIs, WordPress e apps mobile com Ionic. Não exige conhecimento prévio.',
  'Udemy',
  'HTML',
  ARRAY['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL'],
  ARRAY['Bootstrap', 'jQuery', 'WordPress', 'Ionic', 'SASS', 'MVC', 'API', 'full stack'],
  'Iniciante',
  false,
  'Verificar no site',
  'PREENCHA_O_LINK_AQUI',
  false
);

-- ============================================================
-- Confira: select nome, tecnologia, tecnologias from public.cursos order by criado_em desc limit 5;
-- ============================================================
