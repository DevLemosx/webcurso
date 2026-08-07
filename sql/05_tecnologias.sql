-- ============================================================
-- DevLemosx — Fase 3: Páginas de Tecnologia
-- ============================================================

create table if not exists public.tecnologias (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  nome text not null,
  o_que_e text,
  mercado text,
  onde_usar text,
  salario_medio text,
  salario_nota text,
  roadmap_slug text,      -- qual roadmap linkar (ex: 'frontend')
  etapa_titulo text,      -- de qual etapa puxar os "projetos pra praticar"
  criado_em timestamptz default now()
);

alter table public.tecnologias enable row level security;

create policy "Leitura pública das tecnologias"
on public.tecnologias
for select
to anon
using (true);

delete from public.tecnologias;

insert into public.tecnologias
  (slug, nome, o_que_e, mercado, onde_usar, salario_medio, salario_nota, roadmap_slug, etapa_titulo)
values
(
  'html',
  'HTML',
  'HTML (HyperText Markup Language) é a linguagem de marcação usada pra estruturar o conteúdo de qualquer página da web — títulos, parágrafos, imagens, links, formulários e listas. Não é uma linguagem de programação (não tem lógica, variáveis ou loops), mas é o esqueleto sobre o qual tudo em uma página é construído, inclusive sites feitos com frameworks como React ou Vue.',
  'HTML é pré-requisito pra praticamente qualquer vaga de desenvolvimento web, seja front-end, back-end ou full stack. Sozinho, dificilmente vira uma vaga específica — normalmente aparece somado a CSS e JavaScript no perfil de "Desenvolvedor Front-end". É o ponto de entrada mais comum pra quem tá começando na programação.',
  'Sites institucionais, landing pages, e-mails de marketing, aplicativos híbridos (WebView), documentação técnica e a própria estrutura por trás de qualquer app React, Vue ou Angular.',
  'R$ 2.500 – R$ 6.000/mês',
  'Estimativa pra nível júnior/Front-end no Brasil, com base em vagas do Glassdoor (jun/2026). Empresas maiores e consultorias costumam pagar acima disso — o Guia Salarial 2026 da Robert Half aponta júnior entre R$ 6.050 e R$ 8.750, e sênior entre R$ 12.450 e R$ 18.200. Varia bastante por região, porte da empresa e stack completa exigida.',
  'frontend',
  'HTML & CSS'
),
(
  'css',
  'CSS',
  'CSS (Cascading Style Sheets) é a linguagem que cuida da aparência de uma página web: cores, espaçamento, tipografia, layout e responsividade — adaptar o site pra celular, tablet e desktop. Enquanto o HTML define o que existe na página, o CSS define como isso é exibido.',
  'Assim como HTML, CSS quase nunca é uma vaga isolada — é parte do combo básico de qualquer Front-end. Onde CSS realmente se destaca é em vagas que pedem atenção a detalhes visuais, montagem de Design Systems, e domínio de ferramentas modernas como Flexbox, Grid e frameworks utilitários (Tailwind CSS).',
  'Todo site e aplicação web moderna, e-mails HTML responsivos, geração de PDF a partir de HTML/CSS, e animações de interface em apps híbridos.',
  'R$ 2.500 – R$ 6.000/mês',
  'Estimativa pra nível júnior/Front-end no Brasil, com base em vagas do Glassdoor (jun/2026). Empresas maiores e consultorias costumam pagar acima disso — o Guia Salarial 2026 da Robert Half aponta júnior entre R$ 6.050 e R$ 8.750, e sênior entre R$ 12.450 e R$ 18.200. Varia bastante por região, porte da empresa e stack completa exigida.',
  'frontend',
  'HTML & CSS'
),
(
  'javascript',
  'JavaScript',
  'JavaScript é a linguagem de programação que roda nos navegadores, responsável por toda a interatividade de um site: cliques, animações, validação de formulário, atualização de conteúdo sem recarregar a página. Com o Node.js, também roda fora do navegador — em servidores, scripts e até aplicativos desktop.',
  'É consistentemente uma das linguagens mais usadas e mais requisitadas do mundo. No Brasil, domina as vagas de Front-end (com React, Vue ou Angular), aparece forte em Back-end (Node.js) e em apps mobile (React Native). Saber JavaScript bem — principalmente com um framework como React — costuma abrir muito mais vagas e salários mais altos do que só HTML/CSS.',
  'Front-end de qualquer site moderno, back-end com Node.js, apps mobile com React Native, automações, extensões de navegador e ferramentas de linha de comando.',
  'R$ 3.500 – R$ 8.500+/mês',
  'Estimativa pra júnior/pleno com JavaScript e React no Brasil, com base em dados do Indeed e do Guia Salarial 2026 da Robert Half. Sênior costuma passar de R$ 12.000/mês. Varia bastante por região, porte da empresa e domínio de frameworks.',
  'frontend',
  'JavaScript'
);

-- ============================================================
-- Confira: select slug, nome, salario_medio from public.tecnologias;
-- ============================================================
