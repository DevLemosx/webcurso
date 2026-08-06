// ==========================================================================
// DevLemosx — roadmaps.js
// Lista os roadmaps disponíveis, com contagem de etapas e progresso salvo.
// ==========================================================================

const SUPABASE_URL = "https://jfmondwquspxpdyresho.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_CRc_KmnL5c9lfk7DdiGpjg_ouQ8_7DJ";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Lê o progresso salvo localmente pra esse slug (mesma lógica do roadmap.js)
function lerProgresso(slug) {
  try {
    return JSON.parse(localStorage.getItem(`devlemosx_roadmap_${slug}`)) || [];
  } catch {
    return [];
  }
}

async function carregarRoadmaps() {
  const grid = document.getElementById("roadmapsGrid");

  try {
    const { data: roadmaps, error: erroRoadmaps } = await supabaseClient
      .from("roadmaps")
      .select("*")
      .order("titulo");
    if (erroRoadmaps) throw erroRoadmaps;

    const { data: etapas, error: erroEtapas } = await supabaseClient
      .from("roadmap_etapas")
      .select("id, roadmap_id");
    if (erroEtapas) throw erroEtapas;

    if (!roadmaps || roadmaps.length === 0) {
      grid.innerHTML = `<p class="empty-state">Nenhum roadmap cadastrado ainda.</p>`;
      return;
    }

    grid.innerHTML = roadmaps.map((roadmap) => {
      const etapasDoRoadmap = etapas.filter((e) => e.roadmap_id === roadmap.id);
      const concluidas = lerProgresso(roadmap.slug).length;
      const total = etapasDoRoadmap.length;

      return `
        <a href="roadmap.html?slug=${encodeURIComponent(roadmap.slug)}" class="roadmap-card">
          <div class="roadmap-card-icon">${roadmap.titulo.slice(0, 2).toUpperCase()}</div>
          <h2 class="roadmap-card-title">${roadmap.titulo}</h2>
          <p class="roadmap-card-desc">${roadmap.descricao || ""}</p>
          <p class="roadmap-card-meta">${total} etapa${total === 1 ? "" : "s"}${concluidas > 0 ? ` · ${concluidas} concluída${concluidas === 1 ? "" : "s"}` : ""}</p>
          <span class="roadmap-card-link">Ver roadmap →</span>
        </a>
      `;
    }).join("");
  } catch (erro) {
    console.error("Não foi possível carregar os roadmaps:", erro);
    grid.innerHTML = `<p class="empty-state">Não foi possível carregar os roadmaps agora. Tente novamente em instantes.</p>`;
  }
}

document.getElementById("year").textContent = new Date().getFullYear();
carregarRoadmaps();
