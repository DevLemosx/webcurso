// ==========================================================================
// DevLemosx — novidades.js
// Changelog automático: junta criado_em de cursos, roadmaps, tecnologias e
// projetos, agrupa por dia e mostra do mais recente pro mais antigo.
// ==========================================================================

const SUPABASE_URL = "https://jfmondwquspxpdyresho.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_CRc_KmnL5c9lfk7DdiGpjg_ouQ8_7DJ";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ICONE_POR_TIPO = {
  curso: "📚",
  roadmap: "🗺️",
  tecnologia: "🧩",
  projeto: "🛠️",
};

function formatarData(dataIso) {
  return new Date(dataIso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });
}

let TODOS_EVENTOS = [];
let RESUMO_HTML = "";

async function carregarNovidades() {
  const lista = document.getElementById("changelogList");

  try {
    const [cursos, roadmaps, tecnologias, projetos] = await Promise.all([
      supabaseClient.from("cursos").select("nome, criado_em"),
      supabaseClient.from("roadmaps").select("titulo, criado_em"),
      supabaseClient.from("tecnologias").select("nome, criado_em"),
      supabaseClient.from("projetos").select("nome, criado_em"),
    ]);

    TODOS_EVENTOS = [
      ...(cursos.data || []).map((c) => ({ tipo: "curso", texto: `Curso adicionado: ${c.nome}`, data: c.criado_em })),
      ...(roadmaps.data || []).map((r) => ({ tipo: "roadmap", texto: `Novo roadmap: ${r.titulo}`, data: r.criado_em })),
      ...(tecnologias.data || []).map((t) => ({ tipo: "tecnologia", texto: `Nova página de tecnologia: ${t.nome}`, data: t.criado_em })),
      ...(projetos.data || []).map((p) => ({ tipo: "projeto", texto: `Novo projeto pra praticar: ${p.nome}`, data: p.criado_em })),
    ].filter((e) => e.data);

    if (TODOS_EVENTOS.length === 0) {
      lista.innerHTML = `<p class="empty-state">Nenhuma novidade registrada ainda.</p>`;
      return;
    }

    TODOS_EVENTOS.sort((a, b) => new Date(b.data) - new Date(a.data));

    // ---- Resumo dos últimos 7 dias (fixo, não muda com o filtro) -----
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
    const eventosDaSemana = TODOS_EVENTOS.filter((e) => new Date(e.data) >= seteDiasAtras);
    RESUMO_HTML = montarResumoSemanal(eventosDaSemana);

    renderizarLista("todos");

    document.getElementById("changelogFilters").addEventListener("click", (evento) => {
      const botao = evento.target.closest(".filter-btn");
      if (!botao) return;
      document.querySelectorAll("#changelogFilters .filter-btn").forEach((b) => b.classList.remove("active"));
      botao.classList.add("active");
      renderizarLista(botao.dataset.filtroTipo);
    });
  } catch (erro) {
    console.error("Não foi possível carregar as novidades:", erro);
    lista.innerHTML = `<p class="empty-state">Não foi possível carregar as novidades agora.</p>`;
  }
}

// ---- Monta a lista agrupada por dia, respeitando o filtro ativo ----------
function renderizarLista(filtro) {
  const lista = document.getElementById("changelogList");
  const eventosFiltrados = filtro === "todos"
    ? TODOS_EVENTOS
    : TODOS_EVENTOS.filter((e) => e.tipo === filtro);

  if (eventosFiltrados.length === 0) {
    lista.innerHTML = RESUMO_HTML + `<p class="empty-state">Nenhuma novidade desse tipo ainda.</p>`;
    return;
  }

  const grupos = [];
  eventosFiltrados.forEach((evento) => {
    const dia = formatarData(evento.data);
    let grupo = grupos.find((g) => g.dia === dia);
    if (!grupo) {
      grupo = { dia, itens: [] };
      grupos.push(grupo);
    }
    grupo.itens.push(evento);
  });

  const listaHtml = grupos.map((grupo) => `
    <div class="changelog-day">
      <p class="changelog-date">${grupo.dia}</p>
      <ul class="changelog-items">
        ${grupo.itens.map((item) => `<li>${ICONE_POR_TIPO[item.tipo] || "✅"} ${item.texto}</li>`).join("")}
      </ul>
    </div>
  `).join("");

  lista.innerHTML = RESUMO_HTML + listaHtml;
}

// ---- Monta o card de resumo da semana ("🚀 Esta semana no DevLemosx") ----
function montarResumoSemanal(eventosDaSemana) {
  if (eventosDaSemana.length === 0) return "";

  const contagem = {};
  eventosDaSemana.forEach((e) => {
    contagem[e.tipo] = (contagem[e.tipo] || 0) + 1;
  });

  const LABEL_PLURAL = {
    curso: (n) => `${n} novo${n > 1 ? "s" : ""} curso${n > 1 ? "s" : ""} adicionado${n > 1 ? "s" : ""}`,
    roadmap: (n) => `${n} novo${n > 1 ? "s" : ""} roadmap${n > 1 ? "s" : ""}`,
    tecnologia: (n) => `${n} nova${n > 1 ? "s" : ""} página${n > 1 ? "s" : ""} de tecnologia`,
    projeto: (n) => `${n} novo${n > 1 ? "s" : ""} projeto${n > 1 ? "s" : ""} pra praticar`,
  };

  const itens = Object.entries(contagem)
    .map(([tipo, n]) => `<li>${ICONE_POR_TIPO[tipo] || "✅"} ${LABEL_PLURAL[tipo] ? LABEL_PLURAL[tipo](n) : `${n} novidades`}</li>`)
    .join("");

  return `
    <div class="changelog-summary">
      <p class="changelog-summary-title">🚀 Esta semana no DevLemosx</p>
      <ul class="changelog-items">${itens}</ul>
    </div>
  `;
}

document.getElementById("year").textContent = new Date().getFullYear();
carregarNovidades();
