-- ============================================================
-- DevLemosx — Setup da tabela "cursos" no Supabase
-- Cole este script inteiro no SQL Editor do Supabase e rode.
-- ============================================================

-- 1. Cria a tabela
create table if not exists public.cursos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  professor text,
  descricao text,
  plataforma text,
  tecnologia text,        -- HTML, CSS, JavaScript, Python, PHP, SQL, Java
  nivel text,              -- Iniciante, Intermediário, Avançado
  gratuito boolean default false,
  preco text,               -- texto livre (ex: "R$ 49,90" ou "Verificar no site")
  link text not null,
  afiliacao_info text,     -- nota sua sobre como afiliar (não precisa mostrar no site)
  destaque boolean default false,
  criado_em timestamptz default now()
);

-- 2. Liga a segurança por linha (RLS) — obrigatório, senão a tabela
--    fica inacessível pela API mesmo com a anon key.
alter table public.cursos enable row level security;

-- 3. Libera SOMENTE leitura pública. Ninguém de fora consegue
--    inserir/editar/apagar usando a anon key — só você, pelo
--    painel do Supabase (que usa suas credenciais de dono).
create policy "Leitura pública dos cursos"
on public.cursos
for select
to anon
using (true);

-- 4. Popula a tabela com os 10 cursos que já estavam no cursos.json
insert into public.cursos
  (nome, professor, descricao, plataforma, tecnologia, nivel, gratuito, preco, link, afiliacao_info, destaque)
values
  ('Programação Web com HTML, CSS e PHP para Iniciantes', 'Wagner Cardoso', 'Do zero até publicar um site: marcação em HTML, formatação em CSS e back-end dinâmico em PHP.', 'Hotmart', 'PHP', 'Iniciante', false, 'Verificar no site', 'https://hotmart.com/pt-br/marketplace/produtos/programacao-web-com-html-css-e-php-para-iniciantes/R69731164V', 'Cadastre-se como afiliado direto na página do produto no Hotmart e gere seu link (hotlink) para este curso.', false),
  ('Marketplace de Programação da Hotmart', 'Vários produtores', 'Catálogo com dezenas de cursos de programação de diferentes produtores brasileiros, do básico ao avançado.', 'Hotmart', 'HTML', 'Iniciante', false, 'Varia por curso', 'https://hotmart.com/en/marketplace/categories/technology-and-software-development/programming', 'Navegue pela categoria, escolha um curso específico e clique em ''afiliar-se'' na página dele.', false),
  ('Discover — Programação do Zero com IA', 'Rocketseat', 'Fundamentos de programação, HTML, CSS e JavaScript, com certificado gratuito ao final.', 'Rocketseat', 'CSS', 'Iniciante', true, '', 'https://www.rocketseat.com.br/discover', 'Curso gratuito — não gera comissão, mas é ótimo para indicar como porta de entrada.', false),
  ('HTML, CSS, JavaScript, Java e Python — Trilhas Gratuitas', 'Comunidade DIO', 'Catálogo gratuito com cursos, bootcamps e desafios práticos em várias linguagens.', 'DIO (Digital Innovation One)', 'JavaScript', 'Iniciante', true, '', 'https://www.dio.me/', 'Curso gratuito — não gera comissão, mas é ótimo para indicar como porta de entrada.', false),
  ('HTML, CSS, JavaScript, Java e Python — Aulas em Vídeo', 'Curso em Vídeo', 'Canal gratuito no YouTube com cursos completos de várias linguagens; certificado pago opcional.', 'Curso em Vídeo', 'JavaScript', 'Iniciante', true, '', 'https://www.cursoemvideo.com/', 'Curso gratuito — não gera comissão, mas é ótimo para indicar como porta de entrada.', false),
  ('Formação Python', 'Vários instrutores', 'Trilha completa de Python, do básico à automação e análise de dados.', 'Alura', 'Python', 'Intermediário', false, 'Verificar no site', 'https://www.alura.com.br/cursos-online-programacao', 'Cadastre-se no programa de afiliados da Alura pela rede Awin e gere seu link.', false),
  ('Formação Java', 'Vários instrutores', 'Fundamentos de Java e orientação a objetos, com trilha até back-end e Spring.', 'Alura', 'Java', 'Intermediário', false, 'Verificar no site', 'https://www.alura.com.br/cursos-online-programacao', 'Cadastre-se no programa de afiliados da Alura pela rede Awin e gere seu link.', false),
  ('Cursos de JavaScript', 'Vários instrutores', 'Do básico ao avançado: DOM, async/await, frameworks e projetos práticos.', 'Udemy', 'JavaScript', 'Intermediário', false, 'Verificar no site', 'https://www.udemy.com/topic/javascript/', 'Aplique no programa de afiliados da Udemy (rede Impact, Awin ou Rakuten) e gere o link do curso escolhido.', false),
  ('Cursos de SQL e Banco de Dados', 'Vários instrutores', 'Consultas, joins e modelagem de banco de dados relacional na prática.', 'Udemy', 'SQL', 'Iniciante', false, 'Verificar no site', 'https://www.udemy.com/topic/sql/', 'Aplique no programa de afiliados da Udemy (rede Impact, Awin ou Rakuten) e gere o link do curso escolhido.', false),
  ('Certificados Profissionais em Ciência da Computação', 'Universidades parceiras', 'Cursos e certificados de universidades e empresas como Google e IBM, com opção de bolsa/gratuidade parcial.', 'Coursera', 'Python', 'Avançado', false, 'Verificar no site', 'https://www.coursera.org/', 'Cadastre-se no programa de afiliados da Coursera pela rede Impact (comissão de até 45%).', false);

-- ============================================================
-- Pronto. Pra conferir, rode:  select * from public.cursos;
-- ============================================================
