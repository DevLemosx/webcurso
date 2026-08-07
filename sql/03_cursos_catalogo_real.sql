-- ============================================================
-- DevLemosx — Substituir todos os cursos pelos novos (gratuitos, PT-BR)
-- Apaga tudo que existe na tabela e insere os 13 cursos novos.
-- ============================================================

delete from public.cursos;

insert into public.cursos
  (nome, professor, descricao, plataforma, tecnologia, tags, nivel, gratuito, preco, link, destaque)
values
  ('Curso HTML5 e CSS3: Módulo - 1', 'Prof. Gustavo Guanabara', 'Aprenda a estruturar páginas web utilizando HTML5 e CSS3, criando páginas com semântica, formulários e boas práticas de desenvolvimento.', 'Curso em Vídeo', 'HTML', ARRAY['HTML','CSS'], 'Iniciante', true, '', 'https://www.cursoemvideo.com/curso/html5-css3-modulo1/', true),
  ('Curso HTML5 e CSS3: Módulo - 2', 'Prof. Gustavo Guanabara', 'Aprenda a estruturar páginas web utilizando HTML5 e CSS3, criando páginas com semântica, formulários e boas práticas de desenvolvimento.', 'Curso em Vídeo', 'HTML', ARRAY['HTML','CSS'], 'Iniciante', true, '', 'https://www.cursoemvideo.com/curso/curso-html5-e-css3-modulo-2-de-5-40-horas/', false),
  ('Curso HTML5 e CSS3: Módulo - 3', 'Prof. Gustavo Guanabara', 'Aprenda a estruturar páginas web utilizando HTML5 e CSS3, criando páginas com semântica, formulários e boas práticas de desenvolvimento.', 'Curso em Vídeo', 'HTML', ARRAY['HTML','CSS'], 'Intermediário', true, '', 'https://www.cursoemvideo.com/curso/curso-html5-e-css3-modulo-3-de-5-40-horas/', false),
  ('Curso HTML5 e CSS3: Módulo - 4', 'Prof. Gustavo Guanabara', 'Aprenda a estruturar páginas web utilizando HTML5 e CSS3, criando páginas com semântica, formulários e boas práticas de desenvolvimento.', 'Curso em Vídeo', 'HTML', ARRAY['HTML','CSS'], 'Intermediário', true, '', 'https://www.cursoemvideo.com/curso/curso-html5-e-css3-modulo-4-de-5-40-horas/', false),
  ('Curso HTML5 e CSS3: Módulo - 5', 'Prof. Gustavo Guanabara', 'Aprenda a estruturar páginas web utilizando HTML5 e CSS3, criando páginas com semântica, formulários e boas práticas de desenvolvimento.', 'Curso em Vídeo', 'HTML', ARRAY['HTML','CSS'], 'Avançado', true, '', 'https://www.cursoemvideo.com/curso/curso-html5-e-css3-modulo-5-de-5-40-horas/', false),
  ('Git e GitHub', 'Tiago Matos', 'Se você quer versionar seus projetos como um profissional, entender Git e GitHub é essencial! Aprenda os comandos mais usados no dia a dia, como commit, branch, merge, pull request e muito mais.', 'YouTube', 'Git', ARRAY['Git','GitHub'], 'Iniciante', true, '', 'https://www.youtube.com/watch?v=2c7yWlpWDJM&list=PLcoYAcR89n-qbO7YAVj5S0alABLis_QVU', false),
  ('Python 3 – Mundo 1', 'Prof. Gustavo Guanabara', 'Neste curso, você será guiado de forma progressiva, partindo do básico, para construir uma sólida compreensão da linguagem Python.', 'Curso em Vídeo', 'Python', ARRAY['Python'], 'Iniciante', true, '', 'https://www.cursoemvideo.com/curso/python-3-mundo-1/', true),
  ('Python 3 – Mundo 2', 'Prof. Gustavo Guanabara', 'Consolide o pensamento lógico e prepare-se para projetos mais avançados, com foco em estruturas de repetição e controle.', 'Curso em Vídeo', 'Python', ARRAY['Python'], 'Iniciante', true, '', 'https://www.cursoemvideo.com/curso/python-3-mundo-2/', false),
  ('Python 3 – Mundo 3', 'Prof. Gustavo Guanabara', 'Entenda como organizar, manipular e otimizar dados com as estruturas que sustentam toda a lógica da programação moderna.', 'Curso em Vídeo', 'Python', ARRAY['Python'], 'Intermediário', true, '', 'https://www.cursoemvideo.com/curso/python-3-mundo-3/', false),
  ('Python 3 – Mundo 4', 'Prof. Gustavo Guanabara', 'Transforme seus conhecimentos em projetos mais completos: Programação Orientada a Objetos, automação, APIs e manipulação de arquivos.', 'Curso em Vídeo', 'Python', ARRAY['Python'], 'Avançado', true, '', 'https://www.cursoemvideo.com/curso/python-3-mundo-4/', false),
  ('Curso de Algoritmos e Lógica de Programação', 'Prof. Gustavo Guanabara', 'Base necessária para quem quer aprender linguagens famosas do mercado, como C, Java, PHP e muitas outras.', 'Curso em Vídeo', 'Algoritmos', ARRAY['Algoritmos','Lógica de Programação'], 'Iniciante', true, '', 'https://www.cursoemvideo.com/curso/curso-de-algoritmo/', false),
  ('Curso de Javascript', 'Prof. Gustavo Guanabara', 'Ponto de partida perfeito para quem quer entrar no mundo da programação com uma das linguagens mais utilizadas do planeta. Gratuito, completo e 100% online.', 'Curso em Vídeo', 'JavaScript', ARRAY['JavaScript'], 'Iniciante', true, '', 'https://www.cursoemvideo.com/curso/javascript/', false),
  ('Java primeiros passos: Lógica de Programação e Algoritmos', NULL, 'Curso equivalente à disciplina de Lógica de Programação da faculdade, para iniciantes, usando Java como linguagem. Gratuito via cupom — pode expirar.', 'Udemy', 'Java', ARRAY['Java'], 'Iniciante', true, '', 'https://www.udemy.com/course/java-curso-logica-de-programacao/?couponCode=KEEPLEARNING', false);

-- ============================================================
-- Confira: select nome, tecnologia, tags, destaque from public.cursos order by criado_em;
-- ============================================================
