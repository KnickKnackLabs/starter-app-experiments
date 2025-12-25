import {
  defaultLanguage,
  defaultNS,
  resources,
  supportedLanguages,
} from "@starter/core/i18n";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import types for augmentation side-effect
import "@starter/core/i18n";

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  supportedLngs: [...supportedLanguages],
  defaultNS,
  interpolation: {
    escapeValue: false, // React already handles XSS
  },
});
