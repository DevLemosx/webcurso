// ==========================================================================
// DevLemosx — nav.js
// Controla o menu dropdown do cabeçalho (☰). Isolado numa IIFE pra não
// vazar nada pro escopo global e não conflitar com os outros scripts.
// ==========================================================================
(function () {
  const botao = document.getElementById("navMenuBtn");
  const menu = document.getElementById("navDropdown");
  if (!botao || !menu) return;

  function fechar() {
    menu.hidden = true;
    botao.setAttribute("aria-expanded", "false");
  }

  function abrir() {
    menu.hidden = false;
    botao.setAttribute("aria-expanded", "true");
  }

  botao.addEventListener("click", (evento) => {
    evento.stopPropagation();
    if (menu.hidden) abrir(); else fechar();
  });

  document.addEventListener("click", (evento) => {
    if (!menu.hidden && !menu.contains(evento.target)) fechar();
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") fechar();
  });
})();
