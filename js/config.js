/**
 * Global Configuration for BSS Therapy Center Applications
 */
export const CONFIG = {
  WEB3FORMS_ACCESS_KEY: "f2404bb2-5fb2-4a19-ab72-e6f977eecc50",
  WEB3FORMS_ENDPOINT: "https://api.web3forms.com/submit",
  STORAGE_KEYS: {
    THEME: "bss_theme"
  },
  VALIDATION: {
    MAX_FILE_SIZE_BYTES: 5 * 1024 * 1024, // 5MB
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
};
