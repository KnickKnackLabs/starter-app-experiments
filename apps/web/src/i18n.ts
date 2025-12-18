import {
  defaultLanguage,
  defaultNS,
  resources,
  type SupportedLanguage,
  supportedLanguages,
} from "@starter/core/i18n";
import i18n, { type i18n as I18nInstance } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import types for augmentation side-effect
import "@starter/core/i18n";

// Cookie name for language preference
export const LANGUAGE_COOKIE = "i18next";

let initialized = false;

export function initI18n(serverLanguage?: SupportedLanguage): I18nInstance {
  if (initialized) {
    // If already initialized but server provided a different language, sync it
    if (serverLanguage && i18n.language !== serverLanguage) {
      i18n.changeLanguage(serverLanguage);
    }
    return i18n;
  }

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      // If server detected a language, use it directly (skip detection)
      lng: serverLanguage,
      fallbackLng: defaultLanguage,
      supportedLngs: [...supportedLanguages],
      defaultNS,
      interpolation: {
        escapeValue: false, // React already handles XSS
      },
      detection: {
        // Check cookie first, then localStorage, then browser
        order: ["cookie", "localStorage", "navigator"],
        caches: ["cookie", "localStorage"],
        cookieMinutes: 60 * 24 * 365, // 1 year
      },
    });

  initialized = true;
  return i18n;
}

export default i18n;
