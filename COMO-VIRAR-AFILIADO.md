# Como transformar os links do cursos.json em links de afiliado

Os links que estão no `cursos.json` são os links **reais das plataformas/cursos**, mas ainda
**não são links de afiliado**. Cada curso tem um campo `"afiliacao"` explicando o que fazer.
Resumo por plataforma:

## 🟠 Hotmart
1. Crie uma conta gratuita em https://hotmart.com
2. Vá até o produto (ex: o link do "Programação Web com HTML, CSS e PHP") e clique em **"Afiliar-se"**.
3. Se o produtor aprovar (a maioria aprova automático), a Hotmart gera um **hotlink** só seu.
4. Troque o `link` do curso no JSON por esse hotlink.

## 🟢 Eduzz / 🟣 Braip / 🔵 Monetizze
Mesmo processo do Hotmart: cadastro gratuito → marketplace → escolher o curso →
pedir afiliação → pegar o link exclusivo. Comissões nessas plataformas costumam ser as
mais altas do nicho (50%–90%, dependendo do produtor).

## 🔷 Alura
1. Cadastre-se na rede **Awin** (https://www.awin.com) — é ela quem administra o programa de afiliados da Alura.
2. Procure o programa "Alura BR" na Awin, peça aprovação.
3. Gere o link de afiliado a partir da URL do curso/trilha que você quer indicar.

## 🟪 Udemy
1. A Udemy não tem cadastro direto — você entra por uma rede parceira: **Impact**, **Awin** ou **Rakuten Advertising**.
2. Cadastre-se em uma delas e procure o programa "Udemy".
3. Depois de aprovado, gere o link a partir da URL do curso específico que você quer indicar.
4. Comissão costuma ficar por volta de 8%–15%, com cookie de rastreio curto (7 dias) — ou seja,
   a pessoa precisa comprar rápido depois de clicar no seu link.

## 🎓 Coursera
1. Cadastre-se na rede **Impact** (https://impact.com).
2. Procure o programa de afiliados da Coursera e peça aprovação.
3. Comissão de até 45%, cookie de 30 dias (bem mais generoso que a Udemy).

## 🎁 Cursos gratuitos (Rocketseat Discover, DIO, Curso em Vídeo)
Esses não pagam comissão — mas são ótimos para o botão **"Comece por Aqui"**, porque
geram confiança com quem ainda não vai comprar nada. Pode deixar o link direto, sem afiliação.

---

**Dica:** como seu público parece ser majoritariamente iniciante e brasileiro, os testes que
costumam converter melhor são: 1) cursos gratuitos pra puxar gente pro perfil, 2) Hotmart/Eduzz/Braip
pra monetizar de verdade (comissão alta), 3) Alura como opção "premium" em português pra quem já
decidiu levar a sério.
