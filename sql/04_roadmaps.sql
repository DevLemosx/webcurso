-- ============================================================
-- DevLemosx — Fase 2: Roadmaps
-- ============================================================

create table if not exists public.roadmaps (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  slug text not null unique,
  descricao text,
  criado_em timestamptz default now()
);

create table if not exists public.roadmap_etapas (
  id uuid primary key default gen_random_uuid(),
  roadmap_id uuid references public.roadmaps(id) on delete cascade,
  ordem int not null,
  titulo text not null,
  descricao text,
  cursos_recomendados uuid[] default '{}',
  projetos_recomendados text[] default '{}',
  criado_em timestamptz default now()
);

alter table public.roadmaps enable row level security;
alter table public.roadmap_etapas enable row level security;

create policy "Leitura pública dos roadmaps" on public.roadmaps for select to anon using (true);
create policy "Leitura pública das etapas" on public.roadmap_etapas for select to anon using (true);

-- Limpa dados antigos, se você já tiver rodado esse script antes
delete from public.roadmap_etapas;
delete from public.roadmaps;

insert into public.roadmaps (titulo, slug, descricao) values

  ('Frontend', 'frontend', 'Do zero até criar interfaces modernas: HTML, CSS, JavaScript, Git e React.'),
  ('Backend', 'backend', 'Construa o lado servidor de uma aplicação: banco de dados, APIs e deploy.'),
  ('Python', 'python', 'Da lógica de programação até automação, dados e primeiros passos em IA.');


insert into public.roadmap_etapas (roadmap_id, ordem, titulo, descricao, cursos_recomendados, projetos_recomendados)
values

  ((select id from public.roadmaps where slug = 'frontend'), 1, 'HTML & CSS', 'Aprenda a estruturar e estilizar páginas web.', coalesce((select array_agg(id) from public.cursos where nome in ('Curso HTML5 e CSS3: Módulo - 1','Curso HTML5 e CSS3: Módulo - 2','Curso HTML5 e CSS3: Módulo - 3')), '{}'), ARRAY['Landing Page','Portfólio pessoal','Clone de uma página simples']),
  ((select id from public.roadmaps where slug = 'frontend'), 2, 'JavaScript', 'A linguagem que dá vida às páginas web.', coalesce((select array_agg(id) from public.cursos where nome in ('Curso de Javascript')), '{}'), ARRAY['Lista de tarefas (To-do)','Calculadora','Quiz interativo']),
  ((select id from public.roadmaps where slug = 'frontend'), 3, 'Git & GitHub', 'Versione seu código como um profissional.', coalesce((select array_agg(id) from public.cursos where nome in ('Git e GitHub')), '{}'), ARRAY['Subir seu primeiro projeto no GitHub','Criar um README caprichado']),
  ((select id from public.roadmaps where slug = 'frontend'), 4, 'React', 'A biblioteca mais usada do mercado pra criar interfaces.', '{}'::uuid[], ARRAY['Recriar a lista de tarefas em React','Consumir uma API pública']),
  ((select id from public.roadmaps where slug = 'frontend'), 5, 'TypeScript', 'JavaScript com tipagem — cada vez mais exigido em vagas.', '{}'::uuid[], ARRAY['Migrar um projeto JS existente pra TypeScript']),
  ((select id from public.roadmaps where slug = 'backend'), 1, 'Lógica de Programação', 'A base antes de qualquer linguagem de back-end.', coalesce((select array_agg(id) from public.cursos where nome in ('Curso de Algoritmos e Lógica de Programação')), '{}'), ARRAY['Fluxogramas de problemas simples']),
  ((select id from public.roadmaps where slug = 'backend'), 2, 'PHP', 'Uma das linguagens mais usadas em back-end no Brasil.', '{}'::uuid[], ARRAY['Formulário de contato com envio de e-mail']),
  ((select id from public.roadmaps where slug = 'backend'), 3, 'Banco de Dados (MySQL)', 'Armazene e consulte dados de verdade.', '{}'::uuid[], ARRAY['Modelar um banco de dados de uma loja simples']),
  ((select id from public.roadmaps where slug = 'backend'), 4, 'APIs', 'Conecte seu back-end com qualquer front-end ou app.', '{}'::uuid[], ARRAY['Criar uma API REST simples de tarefas']),
  ((select id from public.roadmaps where slug = 'backend'), 5, 'Docker', 'Empacote sua aplicação pra rodar em qualquer lugar.', '{}'::uuid[], ARRAY['Colocar sua API dentro de um container Docker']),
  ((select id from public.roadmaps where slug = 'backend'), 6, 'Deploy', 'Coloque seu projeto no ar de verdade.', '{}'::uuid[], ARRAY['Publicar sua API em um serviço gratuito (Render, Railway...)']),
  ((select id from public.roadmaps where slug = 'python'), 1, 'Lógica de Programação', 'A base antes de aprender qualquer linguagem.', coalesce((select array_agg(id) from public.cursos where nome in ('Curso de Algoritmos e Lógica de Programação')), '{}'), ARRAY['Exercícios de lógica com pseudocódigo']),
  ((select id from public.roadmaps where slug = 'python'), 2, 'Python Básico', 'Sintaxe, variáveis, condicionais e laços de repetição.', coalesce((select array_agg(id) from public.cursos where nome in ('Python 3 – Mundo 1','Python 3 – Mundo 2')), '{}'), ARRAY['Calculadora','Jogo de adivinhação de número']),
  ((select id from public.roadmaps where slug = 'python'), 3, 'Estruturas de Dados', 'Listas, dicionários, tuplas e conjuntos.', coalesce((select array_agg(id) from public.cursos where nome in ('Python 3 – Mundo 3')), '{}'), ARRAY['Agenda de contatos com listas e dicionários']),
  ((select id from public.roadmaps where slug = 'python'), 4, 'Programação Orientada a Objetos', 'Organize seu código em classes e objetos.', coalesce((select array_agg(id) from public.cursos where nome in ('Python 3 – Mundo 4')), '{}'), ARRAY['Sistema de cadastro de clientes com classes']),
  ((select id from public.roadmaps where slug = 'python'), 5, 'Banco de Dados', 'Persista dados de verdade nas suas aplicações.', '{}'::uuid[], ARRAY['CRUD simples com SQLite']),
  ((select id from public.roadmaps where slug = 'python'), 6, 'Frameworks Web (Flask / FastAPI)', 'Construa APIs e aplicações web com Python.', '{}'::uuid[], ARRAY['Criar uma API simples com Flask ou FastAPI']),
  ((select id from public.roadmaps where slug = 'python'), 7, 'Introdução à IA', 'Os primeiros passos pra usar IA nos seus projetos.', '{}'::uuid[], ARRAY['Um chatbot simples com regras ou com uma API de IA']);


-- Confira: select r.titulo, e.ordem, e.titulo, e.cursos_recomendados from public.roadmap_etapas e join public.roadmaps r on r.id = e.roadmap_id order by r.titulo, e.ordem;