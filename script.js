// ==========================================================================
// DevLemosx — script.js
// Carrega cursos de cursos.json, renderiza cards, controla busca e filtros.
// ==========================================================================

// Sigla curta usada dentro do "selo hexagonal" de cada card
const SIGLAS = {
  HTML: "<>",
  CSS: "{}",
  JavaScript: "JS",
  Python: "PY",
  PHP: "PHP",
  SQL: "DB",
  Java: "JV"
};

let TODOS_OS_CURSOS = [];
let filtroAtivo = "todos";
let termoBusca = "";

const grid = document.getElementById("coursesGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const filterGroup = document.getElementById("filterGroup");

// ---- Carrega os cursos a partir do JSON -------------------------------
async function carregarCursos() {
  try {
    const resposta = await fetch("cursos.json");
    TODOS_OS_CURSOS = await resposta.json();
  } catch (erro) {
    // Se estiver abrindo o arquivo direto no navegador (file://), o fetch
    // pode ser bloqueado. Nesse caso, rode com um servidor local
    // (ex: "npx serve" ou a extensão Live Server) ou hospede no GitHub Pages/Netlify.
    console.error("Não foi possível carregar cursos.json:", erro);
    grid.innerHTML = `<p class="empty-state">Não foi possível carregar os cursos. Se você abriu o arquivo direto (file://), rode um servidor local ou publique no GitHub Pages/Netlify.</p>`;
    return;
  }
  renderizarCursos();
}

// ---- Cria o HTML de um card de curso -----------------------------------
function criarCardCurso(curso) {
  const sigla = SIGLAS[curso.categoria] || "</>";

  return `
    <article class="course-card">
      <div class="card-banner">
        <span class="card-hex">${sigla}</span>
        <span class="card-level">${curso.nivel}</span>
      </div>
      <div class="card-body">
        <p class="card-category">${curso.categoria}</p>
        <h3 class="card-title">${curso.titulo}</h3>
        <p class="card-teacher">Por ${curso.professor}</p>
        <p class="card-desc">${curso.descricao}</p>
        <a href="${curso.link}" target="_blank" rel="noopener sponsored" class="card-cta">
          Ver Curso
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M7 17 17 7M8 7h9v9"/></svg>
        </a>
      </div>
    </article>
  `;
}

// ---- Aplica filtro de categoria + busca por texto ----------------------
function renderizarCursos() {
  const termo = termoBusca.trim().toLowerCase();

  const filtrados = TODOS_OS_CURSOS.filter((curso) => {
    const passaFiltro = filtroAtivo === "todos" || curso.categoria === filtroAtivo;
    const passaBusca = curso.titulo.toLowerCase().includes(termo);
    return passaFiltro && passaBusca;
  });

  grid.innerHTML = filtrados.map(criarCardCurso).join("");
  emptyState.hidden = filtrados.length > 0;
}

// ---- Eventos: busca em tempo real ---------------------------------------
searchInput.addEventListener("input", (evento) => {
  termoBusca = evento.target.value;
  renderizarCursos();
});

// ---- Eventos: botões de filtro -------------------------------------------
filterGroup.addEventListener("click", (evento) => {
  const botao = evento.target.closest(".filter-btn");
  if (!botao) return;

  filterGroup.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  botao.classList.add("active");

  filtroAtivo = botao.dataset.filter;
  renderizarCursos();
});

// ==========================================================================
// Seção "Ferramentas que uso" — edite este array para adicionar/remover
// ==========================================================================
const FERRAMENTAS = [
  { nome: "VS Code", link: "https://code.visualstudio.com/", icone: "code" },
  { nome: "Git", link: "https://git-scm.com/", icone: "branch" },
  { nome: "GitHub", link: "https://github.com/", icone: "github" },
  { nome: "ChatGPT", link: "https://chat.openai.com/", icone: "spark" },
  { nome: "Figma", link: "https://figma.com/", icone: "layers" }
];

const ICONES = {
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 17 3 12l5-5M16 7l5 5-5 5"/></svg>',
  branch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="9" r="2.2"/><path d="M6 8.2V15.8M6 8.2C6 12 10 12 12 12h2.2"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.1 3.29 9.42 7.86 10.95.57.1.79-.25.79-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.29-1.68-1.29-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.42.36.78 1.07.78 2.16v3.2c0 .3.21.66.8.55A10.53 10.53 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5Z"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 14 9l7 2-7 2-2 7-2-7-7-2 7-2 2-7Z"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>'
};

function renderizarFerramentas() {
  const toolsGrid = document.getElementById("toolsGrid");
  toolsGrid.innerHTML = FERRAMENTAS.map((ferramenta) => `
    <a href="${ferramenta.link}" target="_blank" rel="noopener" class="tool-card">
      <div class="tool-icon">${ICONES[ferramenta.icone] || ""}</div>
      <p class="tool-name">${ferramenta.nome}</p>
      <p class="tool-link">Acessar →</p>
    </a>
  `).join("");
}

// ---- Ano do rodapé ---------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();

// ---- Inicialização -----------------------------------------------------
carregarCursos();
renderizarFerramentas();
