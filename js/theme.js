import { CONFIG } from "./config.js";

/**
 * Initializes Theme Toggle (Light / Dark Mode) with localStorage persistence.
 */
export function initThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const isDark =
        currentTheme === "dark" || (!currentTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
      const nextTheme = isDark ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, nextTheme);
    });
  }
}
