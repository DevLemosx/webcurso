// ==========================================================================
// DevLemosx — dashboard.js
// Lê só as VIEWS agregadas (nunca as tabelas cruas de cliques/leads) —
// por isso funciona com a mesma chave publishable do resto do site,
// sem precisar de login nem de chave secreta.
// ==========================================================================

const SUPABASE_URL = "https://jfmondwquspxpdyresho.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_CRc_KmnL5c9lfk7DdiGpjg_ouQ8_7DJ";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---- Renderiza uma lista tipo "barra de terminal" -------------------------
function renderizarRanking(containerId, itens, labelKey, valorKey) {
  const container = document.getElementById(containerId);
  if (!itens || itens.length === 0) {
    container.innerHTML = `<p class="empty-state">Sem dados ainda.</p>`;
    return;
  }

  const maior = Math.max(...itens.map((i) => i[valorKey]));

  container.innerHTML = itens.slice(0, 10).map((item) => {
    const percentual = Math.round((item[valorKey] / maior) * 100);
    return `
      <div class="rank-row">
        <div class="rank-row-top">
          <span class="rank-label">${item[labelKey] || "(sem valor)"}</span>
          <span class="rank-value">${item[valorKey]}</span>
        </div>
        <div class="rank-bar-track"><div class="rank-bar-fill" style="width:${percentual}%"></div></div>
      </div>
    `;
  }).join("");
}

async function carregarDashboard() {
  const consultas = [
    { id: "rankCursos", view: "ranking_cursos_cliques", label: "curso_nome", valor: "total_cliques" },
    { id: "rankTecCliques", view: "ranking_tecnologias_cliques", label: "tecnologia", valor: "total_cliques" },
    { id: "rankRoadmaps", view: "ranking_roadmaps_visualizacoes", label: "roadmap_slug", valor: "total_visualizacoes" },
    { id: "rankTecVistas", view: "ranking_tecnologias_visualizacoes", label: "tecnologia_slug", valor: "total_visualizacoes" },
    { id: "rankDownloads", view: "ranking_downloads", label: "roadmap_slug", valor: "total_downloads" },
    { id: "rankOrigem", view: "ranking_por_origem", label: "origem", valor: "total_cliques" },
  ];

  await Promise.all(consultas.map(async (c) => {
    try {
      const { data, error } = await supabaseClient.from(c.view).select("*");
      if (error) throw error;
      renderizarRanking(c.id, data, c.label, c.valor);
    } catch (erro) {
      console.error(`Não foi possível carregar ${c.view}:`, erro);
      document.getElementById(c.id).innerHTML = `<p class="empty-state">Não foi possível carregar.</p>`;
    }
  }));
}

document.getElementById("year").textContent = new Date().getFullYear();
carregarDashboard();
