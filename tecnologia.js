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

// ---- Reaproveita o mesmo template de card usado na home ------------------
function criarCardCurso(curso) {
  const sigla = SIGLAS[curso.tecnologia] || "</>";
  const rotuloPreco = curso.gratuito ? "Grátis" : (curso.preco || "Pago");
  const classePreco = curso.gratuito ? "gratis" : "pago";
  const nota = curso.nota ? ` · ⭐ ${Number(curso.nota).toFixed(1)}` : "";
  const subtitulo = (curso.plataforma ? `${curso.tecnologia} · ${curso.plataforma}` : curso.tecnologia) + nota;
  const metaExtra = [curso.carga_horaria, curso.idioma].filter(Boolean).join(" · ");
  const bannerConteudo = curso.imagem_url
    ? `<img src="${curso.imagem_url}" alt="${curso.nome}" class="card-img" loading="lazy">`
    : `<span class="card-hex">${sigla}</span>`;

  return `
    <article class="course-card">
      <div class="card-banner">
        ${bannerConteudo}
        <span class="card-price ${classePreco}">${rotuloPreco}</span>
        <span class="card-level">${curso.nivel}</span>
      </div>
      <div class="card-body">
        <p class="card-category">${subtitulo}</p>
        <h3 class="card-title">${curso.nome}</h3>
        <p class="card-teacher">Por ${curso.professor || "Vários instrutores"}${metaExtra ? " · " + metaExtra : ""}</p>
        <p class="card-desc">${curso.descricao || ""}</p>
        <a href="${curso.link}" target="_blank" rel="noopener sponsored" class="card-cta">
          Ver Curso
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M7 17 17 7M8 7h9v9"/></svg>
        </a>
      </div>
    </article>
  `;
}

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

    // Projetos pra praticar — puxados da etapa correspondente no roadmap
    if (tech.roadmap_slug && tech.etapa_titulo) {
      const { data: roadmap } = await supabaseClient
        .from("roadmaps")
        .select("id")
        .eq("slug", tech.roadmap_slug)
        .single();

      if (roadmap) {
        const { data: etapa } = await supabaseClient
          .from("roadmap_etapas")
          .select("projetos_recomendados")
          .eq("roadmap_id", roadmap.id)
          .eq("titulo", tech.etapa_titulo)
          .single();

        if (etapa && etapa.projetos_recomendados && etapa.projetos_recomendados.length) {
          document.getElementById("techProjetosBlock").hidden = false;
          document.getElementById("techProjetos").innerHTML = etapa.projetos_recomendados
            .map((p) => `<li>${p}</li>`)
            .join("");
        }
      }
    }
  } catch (erro) {
    console.error("Não foi possível carregar a tecnologia:", erro);
    document.getElementById("techNome").textContent = "Tecnologia não encontrada";
  }
}

document.getElementById("year").textContent = new Date().getFullYear();
carregarTecnologia();
