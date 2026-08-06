// ==========================================================================
// DevLemosx — roadmap.js
// Carrega um roadmap específico (via ?slug=) e suas etapas, com progresso
// marcado por checkbox e salvo no localStorage — sem login.
// ==========================================================================

const SUPABASE_URL = "https://jfmondwquspxpdyresho.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_CRc_KmnL5c9lfk7DdiGpjg_ouQ8_7DJ";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

const stepsList = document.getElementById("stepsList");
const progressFill = document.getElementById("progressFill");
const progressLabel = document.getElementById("progressLabel");

let ETAPAS = [];
let CHAVE_STORAGE = "";

// ---- Progresso salvo no navegador (sem login) ----------------------------
function lerProgresso() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];
  } catch {
    return [];
  }
}

function salvarProgresso(idsConcluidos) {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(idsConcluidos));
}

function alternarEtapa(etapaId) {
  const concluidas = lerProgresso();
  const index = concluidas.indexOf(etapaId);

  if (index === -1) {
    concluidas.push(etapaId);
  } else {
    concluidas.splice(index, 1);
  }

  salvarProgresso(concluidas);
  atualizarUI(concluidas);
}

function atualizarUI(concluidas) {
  ETAPAS.forEach((etapa) => {
    const stepEl = document.getElementById(`step-${etapa.id}`);
    if (!stepEl) return;
    const feita = concluidas.includes(etapa.id);
    stepEl.classList.toggle("concluida", feita);
    stepEl.querySelector("input[type='checkbox']").checked = feita;
  });

  const total = ETAPAS.length;
  const feitas = concluidas.length;
  const percentual = total > 0 ? Math.round((feitas / total) * 100) : 0;

  progressFill.style.width = `${percentual}%`;
  progressLabel.textContent = `${feitas} de ${total} etapas concluídas`;
}

// ---- Monta o HTML de uma etapa --------------------------------------------
function criarEtapaHtml(etapa, cursosPorId) {
  const cursosHtml = (etapa.cursos_recomendados || []).length
    ? etapa.cursos_recomendados
        .map((id) => cursosPorId[id])
        .filter(Boolean)
        .map((curso) => `<li><a href="${curso.link}" target="_blank" rel="noopener sponsored">→ ${curso.nome}</a></li>`)
        .join("")
    : `<li class="empty-hint">Nenhum curso cadastrado ainda pra essa etapa.</li>`;

  const projetosHtml = (etapa.projetos_recomendados || [])
    .map((projeto) => `<li>${projeto}</li>`)
    .join("");

  return `
    <div class="step" id="step-${etapa.id}">
      <div class="step-connector"></div>
      <label class="step-marker">
        <input type="checkbox" data-etapa-id="${etapa.id}">
        <span class="step-marker-num">${etapa.ordem}</span>
        <svg class="step-marker-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg>
      </label>
      <div class="step-content">
        <h3 class="step-title">${etapa.titulo}</h3>
        <p class="step-desc">${etapa.descricao || ""}</p>
        <p class="step-block-label">Cursos recomendados</p>
        <ul class="step-courses">${cursosHtml}</ul>
        ${projetosHtml ? `<p class="step-block-label">Projetos pra praticar</p><ul class="step-projects">${projetosHtml}</ul>` : ""}
      </div>
    </div>
  `;
}

// ---- Carregamento principal -----------------------------------------------
async function carregarRoadmap() {
  if (!slug) {
    stepsList.innerHTML = `<p class="empty-state">Roadmap não especificado. <a href="roadmaps.html">Voltar pra lista</a>.</p>`;
    return;
  }

  CHAVE_STORAGE = `devlemosx_roadmap_${slug}`;

  try {
    const { data: roadmap, error: erroRoadmap } = await supabaseClient
      .from("roadmaps")
      .select("*")
      .eq("slug", slug)
      .single();
    if (erroRoadmap || !roadmap) throw erroRoadmap || new Error("Roadmap não encontrado");

    document.title = `${roadmap.titulo} | Roadmap DevLemosx`;
    document.getElementById("roadmapTag").textContent = `$ cat ./roadmaps/${roadmap.slug}`;
    document.getElementById("roadmapTitulo").textContent = roadmap.titulo;
    document.getElementById("roadmapDescricao").textContent = roadmap.descricao || "";

    const { data: etapas, error: erroEtapas } = await supabaseClient
      .from("roadmap_etapas")
      .select("*")
      .eq("roadmap_id", roadmap.id)
      .order("ordem");
    if (erroEtapas) throw erroEtapas;

    ETAPAS = etapas || [];

    const { data: cursos, error: erroCursos } = await supabaseClient
      .from("cursos")
      .select("id, nome, link");
    if (erroCursos) throw erroCursos;

    const cursosPorId = {};
    (cursos || []).forEach((c) => { cursosPorId[c.id] = c; });

    if (ETAPAS.length === 0) {
      stepsList.innerHTML = `<p class="empty-state">Esse roadmap ainda não tem etapas cadastradas.</p>`;
      return;
    }

    stepsList.innerHTML = ETAPAS.map((etapa) => criarEtapaHtml(etapa, cursosPorId)).join("");

    stepsList.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.addEventListener("change", () => alternarEtapa(checkbox.dataset.etapaId));
    });

    atualizarUI(lerProgresso());
  } catch (erro) {
    console.error("Não foi possível carregar o roadmap:", erro);
    stepsList.innerHTML = `<p class="empty-state">Não foi possível carregar esse roadmap. <a href="roadmaps.html">Voltar pra lista</a>.</p>`;
  }
}

document.getElementById("year").textContent = new Date().getFullYear();
carregarRoadmap();
