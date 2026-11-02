/* ==========================================================
   theme.js — alternância dark/light
   Carregar no <head>, sem defer, para evitar flash do tema errado.
   ========================================================== */

(() => {
  const STORAGE_KEY = "great-hall-theme";
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: light)");

  let button = null;

  function readStored() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === "light" || value === "dark" ? value : null;
    } catch {
      return null;
    }
  }

  function writeStored(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage indisponível: o tema vale apenas nesta sessão */
    }
  }

  function systemTheme() {
    return media.matches ? "light" : "dark";
  }

  function apply(theme) {
    root.dataset.theme = theme;
    updateButton();
  }

  function updateButton() {
    if (!button) return;
    const isLight = root.dataset.theme === "light";
    // O rótulo mostra o tema para o qual o clique vai levar
    button.textContent = isLight ? "dark" : "light";
    button.setAttribute(
      "aria-label",
      isLight ? "Mudar para tema escuro" : "Mudar para tema claro",
    );
  }

  function toggle() {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    apply(next);
    writeStored(next);
  }

  function mountButton() {
    const head = document.querySelector(".site-head");
    if (!head) return;

    button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    button.addEventListener("click", toggle);
    head.appendChild(button);

    updateButton();
    // habilita transições só depois da primeira pintura
    requestAnimationFrame(() => root.classList.add("theme-ready"));
  }

  // aplica imediatamente, antes de o body existir
  apply(readStored() || systemTheme());

  // acompanha o sistema enquanto o usuário não escolheu manualmente
  media.addEventListener("change", () => {
    if (!readStored()) apply(systemTheme());
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountButton);
  } else {
    mountButton();
  }
})();
