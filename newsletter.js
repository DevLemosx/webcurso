// ==========================================================================
// DevLemosx — newsletter.js
// Captura de e-mail. Reaproveita o "supabaseClient" já criado pelo script
// principal de cada página (script.js / roadmaps.js / roadmap.js / tecnologia.js)
// — por isso esse arquivo sempre deve ser incluído DEPOIS deles no HTML.
// ==========================================================================

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const emailInput = document.getElementById("newsletterEmail");
    const feedback = document.getElementById("newsletterFeedback");
    const botao = newsletterForm.querySelector("button");
    const email = emailInput.value.trim();

    botao.disabled = true;
    botao.textContent = "Enviando...";

    try {
      const { error } = await supabaseClient
        .from("leads")
        .insert([{ email, origem: window.location.pathname }]);

      if (error) throw error;

      feedback.textContent = "✅ Cadastrado! Você vai receber os próximos lançamentos por e-mail.";
      feedback.className = "newsletter-feedback sucesso";
      feedback.hidden = false;
      newsletterForm.reset();
    } catch (erro) {
      const jaExiste = erro && erro.code === "23505";
      feedback.textContent = jaExiste
        ? "Esse e-mail já tá cadastrado 🙂"
        : "Não consegui cadastrar agora. Tenta de novo em instantes.";
      feedback.className = "newsletter-feedback erro";
      feedback.hidden = false;
      console.error("Erro ao cadastrar e-mail:", erro);
    } finally {
      botao.disabled = false;
      botao.textContent = "Quero receber";
    }
  });
}
