// ==========================================================================
// DevLemosx — downloads.js
// A página em si é estática (bom pra SEO/indexação do Google) — esse script
// só registra o download quando alguém clica, sem interferir no link.
// ==========================================================================

const SUPABASE_URL = "https://jfmondwquspxpdyresho.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_CRc_KmnL5c9lfk7DdiGpjg_ouQ8_7DJ";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.querySelectorAll(".download-card").forEach((card) => {
  card.addEventListener("click", () => {
    supabaseClient
      .from("downloads_pdf")
      .insert([{
        roadmap_slug: card.dataset.roadmap,
        arquivo: card.dataset.arquivo,
        origem: window.location.pathname,
      }])
      .then(({ error }) => {
        if (error) console.error("Não foi possível registrar o download:", error);
      });
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
