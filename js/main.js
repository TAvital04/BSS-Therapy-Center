/**
 * BSS Therapy Center - Application Main Entry Point
 */
import { initThemeToggle } from "./theme.js";
import { initFormHandler } from "./form-handler.js";

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initFormHandler();
});
