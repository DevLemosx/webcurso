-- ============================================================
-- DevLemosx — Fase 4: Projetos pra Praticar
-- ============================================================

create table if not exists public.projetos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  descricao text,
  nivel text,
  tecnologias text[] not null default '{}',
  requisitos text[] default '{}',
  ordem int default 0,
  criado_em timestamptz default now()
);

alter table public.projetos enable row level security;

create policy "Leitura pública dos projetos"
on public.projetos
for select
to anon
using (true);

delete from public.projetos;

insert into public.projetos (nome, descricao, nivel, tecnologias, requisitos, ordem)
values
  ('Landing Page', 'Uma página única de divulgação de um produto, serviço ou evento, com seção de destaque, benefícios e um botão de call-to-action.', 'Iniciante', ARRAY['HTML','CSS'], ARRAY['Seção de destaque (hero) com título e botão','Seção listando pelo menos 3 benefícios/funcionalidades','Formulário ou botão de contato/inscrição','Layout responsivo (funciona bem no celular)','Publicado online (Netlify, GitHub Pages ou Vercel)'], 1),
  ('Portfólio', 'Um site pessoal pra mostrar seus projetos, habilidades e formas de contato — a primeira coisa que um recrutador vai ver.', 'Iniciante', ARRAY['HTML','CSS'], ARRAY['Seção ''sobre você'' com foto ou ilustração','Lista de pelo menos 3 projetos com link','Seção de habilidades/tecnologias','Links pras suas redes (GitHub, LinkedIn etc.)','Layout responsivo'], 2),
  ('Clone de site', 'Escolha um site conhecido (rede social, e-commerce, streaming) e recrie a tela inicial só com HTML e CSS, sem se preocupar com funcionalidade.', 'Intermediário', ARRAY['HTML','CSS'], ARRAY['Reproduzir o layout da página escolhida com fidelidade','Usar Flexbox e/ou Grid pro layout','Ser responsivo (adaptar pra celular)','Não copiar HTML pronto — escrever o código do zero'], 3),
  ('Loja Virtual (estática)', 'Uma página de e-commerce simples, mostrando produtos em cards, sem carrinho funcional (isso fica pra quando você aprender JavaScript).', 'Intermediário', ARRAY['HTML','CSS'], ARRAY['Grade de produtos com imagem, nome e preço','Página de detalhe de um produto','Filtro visual por categoria (só o design, sem funcionar ainda)','Layout responsivo'], 4),
  ('To-do List', 'O clássico projeto pra praticar manipulação do DOM: adicionar, concluir e remover tarefas.', 'Iniciante', ARRAY['JavaScript'], ARRAY['Adicionar uma nova tarefa pelo input','Marcar tarefa como concluída (riscar ou mudar estilo)','Remover uma tarefa da lista','Salvar as tarefas no localStorage (não sumir ao recarregar a página)'], 1),
  ('Calculadora', 'Uma calculadora funcional com as 4 operações básicas, testando lógica e eventos de clique.', 'Iniciante', ARRAY['JavaScript'], ARRAY['Botões de números e operações (+, -, ×, ÷)','Exibir o resultado na tela','Botão de limpar (C)','Funcionar também pelo teclado (bônus)'], 2),
  ('Quiz', 'Um quiz de múltipla escolha com pontuação final, ótimo pra praticar arrays e condicionais.', 'Intermediário', ARRAY['JavaScript'], ARRAY['Pelo menos 5 perguntas com 4 alternativas cada','Mostrar se a resposta foi certa ou errada','Contar a pontuação final','Tela de resultado com opção de refazer o quiz'], 3),
  ('Jogo da Memória', 'Jogo de cartas viradas pra baixo onde o jogador precisa encontrar os pares, praticando arrays, embaralhamento e manipulação do DOM.', 'Intermediário', ARRAY['JavaScript'], ARRAY['Embaralhar as cartas a cada partida','Virar carta ao clicar','Detectar par correto e par errado','Contar tentativas ou tempo de jogo'], 4),
  ('Consumo de API (Clima)', 'Buscar dados de uma API pública de previsão do tempo e exibir na tela, praticando fetch, async/await e tratamento de erro.', 'Avançado', ARRAY['JavaScript'], ARRAY['Buscar dados de uma API pública gratuita','Exibir os dados de forma organizada na tela','Tratar erro (ex: cidade não encontrada)','Loading state enquanto os dados carregam'], 5);

-- ============================================================
-- Confira: select nome, tecnologias, nivel from public.projetos order by tecnologias, ordem;
-- ============================================================
