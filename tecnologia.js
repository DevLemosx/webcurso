// ==========================================================================
// DevLemosx — tecnologia.js
// Carrega uma tecnologia (via ?slug=), com cursos e roadmap relacionados.
// ==========================================================================

const SUPABASE_URL = "https://jfmondwquspxpdyresho.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_CRc_KmnL5c9lfk7DdiGpjg_ouQ8_7DJ";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SIGLAS = { HTML: "<>", CSS: "{}", JavaScript: "JS", Python: "PY", PHP: "PHP", SQL: "DB", Java: "JV", Git: "GIT", "Lógica": "LP" };

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

const CHAVE_FAVORITOS = "devlemosx_favoritos";

function lerFavoritos() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_FAVORITOS)) || [];
  } catch {
    return [];
  }
}

function ehFavorito(cursoId) {
  return lerFavoritos().includes(cursoId);
}

function alternarFavorito(cursoId) {
  const favoritos = lerFavoritos();
  const pos = favoritos.indexOf(cursoId);
  if (pos === -1) favoritos.push(cursoId);
  else favoritos.splice(pos, 1);
  localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
  return pos === -1;
}

document.addEventListener("click", (evento) => {
  const botao = evento.target.closest(".card-fav-btn");
  if (!botao) return;
  const favoritadoAgora = alternarFavorito(botao.dataset.favId);
  botao.textContent = favoritadoAgora ? "❤️" : "🤍";
  botao.classList.toggle("ativo", favoritadoAgora);
});

// ---- Reaproveita o mesmo template de card usado na home ------------------
function criarCardCurso(curso) {
  const sigla = SIGLAS[curso.tecnologia] || "</>";
  const rotuloPreco = curso.gratuito ? "Grátis" : (curso.preco || "Pago");
  const classePreco = curso.gratuito ? "gratis" : "pago";
  const nota = curso.nota ? ` · ⭐ ${Number(curso.nota).toFixed(1)}` : "";
  const subtitulo = (curso.plataforma ? `${curso.tecnologia} · ${curso.plataforma}` : curso.tecnologia) + nota;
  const metaExtra = [curso.carga_horaria, curso.idioma].filter(Boolean).join(" · ");
  const favoritado = ehFavorito(curso.id);
  const bannerConteudo = curso.imagem_url
    ? `<img src="${curso.imagem_url}" alt="${curso.nome}" class="card-img" loading="lazy">`
    : `<span class="card-hex">${sigla}</span>`;

  return `
    <article class="course-card">
      <div class="card-banner">
        ${bannerConteudo}
        <span class="card-price ${classePreco}">${rotuloPreco}</span>
        <span class="card-level">${curso.nivel}</span>
        <button type="button" class="card-fav-btn ${favoritado ? "ativo" : ""}" data-fav-id="${curso.id}" aria-label="Favoritar curso" title="Favoritar">
          ${favoritado ? "❤️" : "🤍"}
        </button>
      </div>
      <div class="card-body">
        <p class="card-category">${subtitulo}</p>
        <h3 class="card-title">${curso.nome}</h3>
        <p class="card-teacher">Por ${curso.professor || "Vários instrutores"}${metaExtra ? " · " + metaExtra : ""}</p>
        <p class="card-desc">${curso.descricao || ""}</p>
        <a href="${curso.link}" target="_blank" rel="noopener sponsored" class="card-cta" data-curso-id="${curso.id}" data-curso-nome="${curso.nome.replace(/"/g, '&quot;')}" data-curso-tecnologia="${curso.tecnologia}">
          Ver Curso
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M7 17 17 7M8 7h9v9"/></svg>
        </a>
      </div>
    </article>
  `;
}

// ---- Rastreio de cliques nos links de afiliado ---------------------------
document.addEventListener("click", (evento) => {
  const link = evento.target.closest(".card-cta");
  if (!link) return;

  supabaseClient
    .from("cliques")
    .insert([{
      curso_id: link.dataset.cursoId || null,
      curso_nome: link.dataset.cursoNome || null,
      tecnologia: link.dataset.cursoTecnologia || null,
      origem: window.location.pathname,
    }])
    .then(({ error }) => {
      if (error) console.error("Não foi possível registrar o clique:", error);
    });
});

async function carregarTecnologia() {
  if (!slug) {
    document.getElementById("techNome").textContent = "Tecnologia não especificada";
    return;
  }

  try {
    const { data: tech, error: erroTech } = await supabaseClient
      .from("tecnologias")
      .select("*")
      .eq("slug", slug)
      .single();
    if (erroTech || !tech) throw erroTech || new Error("Tecnologia não encontrada");

    document.title = `${tech.nome} | DevLemosx`;
    document.getElementById("techBadge").textContent = SIGLAS[tech.nome] || "</>";
    document.getElementById("techNome").textContent = tech.nome;
    document.getElementById("techNomeCursos").textContent = tech.nome;
    document.getElementById("techCursosTag").textContent = `$ ls ./cursos --tecnologia=${tech.slug}`;
    document.getElementById("techOQueE").textContent = tech.o_que_e || "";
    document.getElementById("techMercado").textContent = tech.mercado || "";
    document.getElementById("techOndeUsar").textContent = tech.onde_usar || "";
    document.getElementById("techSalario").textContent = tech.salario_medio || "—";
    document.getElementById("techSalarioNota").textContent = tech.salario_nota || "";

    supabaseClient
      .from("visualizacoes")
      .insert([{ tipo: "tecnologia", referencia: tech.slug, origem: document.referrer || null }])
      .then(({ error }) => {
        if (error) console.error("Não foi possível registrar a visualização:", error);
      });

    if (tech.salario_atualizado_em) {
      const data = new Date(tech.salario_atualizado_em + "T00:00:00");
      const formatada = data.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
      document.getElementById("techSalarioData").textContent = `Atualizado em ${formatada}`;
    }

    // Link pro roadmap relacionado
    if (tech.roadmap_slug) {
      const link = document.getElementById("techRoadmapLink");
      link.href = `roadmap.html?slug=${encodeURIComponent(tech.roadmap_slug)}`;
      link.hidden = false;
    }

    // Cursos relacionados (query automática pela tecnologia)
    const cursosGrid = document.getElementById("techCursosGrid");
    const { data: cursos, error: erroCursos } = await supabaseClient
      .from("cursos")
      .select("*")
      .eq("tecnologia", tech.nome)
      .order("criado_em", { ascending: false });
    if (erroCursos) throw erroCursos;

    cursosGrid.innerHTML = (cursos && cursos.length)
      ? cursos.map(criarCardCurso).join("")
      : `<p class="empty-state">Nenhum curso cadastrado ainda pra ${tech.nome}.</p>`;

    // Projetos pra praticar — busca direto na tabela projetos pela tecnologia
    const { data: projetos, error: erroProjetos } = await supabaseClient
      .from("projetos")
      .select("*")
      .contains("tecnologias", [tech.nome])
      .order("ordem");

    if (!erroProjetos && projetos && projetos.length) {
      document.getElementById("techProjetosBlock").hidden = false;
      document.getElementById("techProjetosGrid").innerHTML = projetos.map(criarProjetoCard).join("");
      document.querySelectorAll(".req-item input[type='checkbox']").forEach((checkbox) => {
        checkbox.addEventListener("change", () => alternarRequisito(checkbox));
      });
      projetos.forEach((p) => atualizarProgressoProjeto(p.id));
    }
  } catch (erro) {
    console.error("Não foi possível carregar a tecnologia:", erro);
    document.getElementById("techNome").textContent = "Tecnologia não encontrada";
  }
}

// ---- Progresso do checklist de um projeto (localStorage, sem login) ------
function chaveProjeto(projetoId) {
  return `devlemosx_projeto_${projetoId}`;
}

function lerRequisitosFeitos(projetoId) {
  try {
    return JSON.parse(localStorage.getItem(chaveProjeto(projetoId))) || [];
  } catch {
    return [];
  }
}

function alternarRequisito(checkbox) {
  const projetoId = checkbox.dataset.projetoId;
  const index = Number(checkbox.dataset.reqIndex);
  const feitos = lerRequisitosFeitos(projetoId);
  const pos = feitos.indexOf(index);

  if (pos === -1) feitos.push(index);
  else feitos.splice(pos, 1);

  localStorage.setItem(chaveProjeto(projetoId), JSON.stringify(feitos));
  atualizarProgressoProjeto(projetoId);
}

function atualizarProgressoProjeto(projetoId) {
  const card = document.querySelector(`[data-projeto-card="${projetoId}"]`);
  if (!card) return;
  const total = card.querySelectorAll(".req-item").length;
  const feitos = lerRequisitosFeitos(projetoId);
  card.querySelector(".projeto-progress").textContent = `${feitos.length}/${total} concluído`;
  card.classList.toggle("projeto-completo", feitos.length === total && total > 0);
}

// ---- Cria o HTML de um card de projeto -----------------------------------
function criarProjetoCard(projeto) {
  const feitos = lerRequisitosFeitos(projeto.id);

  const requisitosHtml = (projeto.requisitos || [])
    .map((req, i) => `
      <li class="req-item">
        <label>
          <input type="checkbox" data-projeto-id="${projeto.id}" data-req-index="${i}" ${feitos.includes(i) ? "checked" : ""}>
          <span>${req}</span>
        </label>
      </li>
    `).join("");

  return `
    <div class="projeto-card" data-projeto-card="${projeto.id}">
      <div class="projeto-header">
        <h3 class="projeto-nome">${projeto.nome}</h3>
        <span class="nivel-badge">${projeto.nivel}</span>
      </div>
      <p class="projeto-desc">${projeto.descricao || ""}</p>
      <p class="step-block-label">Checklist</p>
      <ul class="req-list">${requisitosHtml}</ul>
      <p class="projeto-progress">0/0 concluído</p>
    </div>
  `;
}

document.getElementById("year").textContent = new Date().getFullYear();
carregarTecnologia();
