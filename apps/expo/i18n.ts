// Intl polyfills for Hermes (React Native's JS engine)
// These must be imported before i18next to enable relativetime, list, and plural formatters
// Order matters! See: https://formatjs.io/docs/polyfills
// Using polyfill-force for better performance on React Native (skips capability detection)
import "@formatjs/intl-getcanonicallocales/polyfill-force.js";
import "@formatjs/intl-locale/polyfill-force.js";
import "@formatjs/intl-pluralrules/polyfill-force.js";
import "@formatjs/intl-pluralrules/locale-data/en.js";
import "@formatjs/intl-pluralrules/locale-data/es.js";
import "@formatjs/intl-pluralrules/locale-data/he.js";
import "@formatjs/intl-pluralrules/locale-data/ar.js";
import "@formatjs/intl-pluralrules/locale-data/ru.js";
import "@formatjs/intl-numberformat/polyfill-force.js";
import "@formatjs/intl-numberformat/locale-data/en.js";
import "@formatjs/intl-numberformat/locale-data/es.js";
import "@formatjs/intl-numberformat/locale-data/he.js";
import "@formatjs/intl-numberformat/locale-data/ar.js";
import "@formatjs/intl-numberformat/locale-data/ru.js";
import "@formatjs/intl-relativetimeformat/polyfill-force.js";
import "@formatjs/intl-relativetimeformat/locale-data/en.js";
import "@formatjs/intl-relativetimeformat/locale-data/es.js";
import "@formatjs/intl-relativetimeformat/locale-data/he.js";
import "@formatjs/intl-relativetimeformat/locale-data/ar.js";
import "@formatjs/intl-relativetimeformat/locale-data/ru.js";
import "@formatjs/intl-listformat/polyfill-force.js";
import "@formatjs/intl-listformat/locale-data/en.js";
import "@formatjs/intl-listformat/locale-data/es.js";
import "@formatjs/intl-listformat/locale-data/he.js";
import "@formatjs/intl-listformat/locale-data/ar.js";
import "@formatjs/intl-listformat/locale-data/ru.js";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  defaultLanguage,
  defaultNS,
  isRtl,
  resources,
  type SupportedLanguage,
  supportedLanguages,
} from "@starter/core/i18n";
import { getLocales } from "expo-localization";
// biome-ignore lint/style/noExportedImports: Need to initialize i18n before exporting
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";

// Import types for augmentation side-effect
import "@starter/core/i18n";

const LANGUAGE_STORAGE_KEY = "user-language";

let initialized = false;
let languageLoadedResolve: (() => void) | null = null;

// Promise that resolves when saved language is loaded
export const languageReady: Promise<void> = new Promise((resolve) => {
  languageLoadedResolve = resolve;
});

/**
 * Get the device's preferred language, falling back to default if not supported
 */
function getDeviceLanguage(): SupportedLanguage {
  const locales = getLocales();
  const deviceLang = locales[0]?.languageCode;

  if (
    deviceLang &&
    supportedLanguages.includes(deviceLang as SupportedLanguage)
  ) {
    return deviceLang as SupportedLanguage;
  }

  return defaultLanguage;
}

/**
 * Save language preference to storage
 */
export async function saveLanguage(language: SupportedLanguage): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}

/**
 * Load saved language from storage
 */
async function loadSavedLanguage(): Promise<SupportedLanguage | null> {
  const saved = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved && supportedLanguages.includes(saved as SupportedLanguage)) {
    return saved as SupportedLanguage;
  }
  return null;
}

export function initI18n() {
  if (initialized) {
    return i18n;
  }

  const deviceLanguage = getDeviceLanguage();

  i18n.use(initReactI18next).init({
    resources,
    lng: deviceLanguage,
    fallbackLng: defaultLanguage,
    supportedLngs: [...supportedLanguages],
    defaultNS,
    compatibilityJSON: "v3", // Required for React Native
    interpolation: {
      escapeValue: false, // React Native doesn't need XSS escaping
    },
  });

  // After init, load saved language preference and sync RTL state
  loadSavedLanguage()
    .then((savedLang) => {
      const lang = savedLang ?? deviceLanguage;
      if (savedLang && savedLang !== i18n.language) {
        i18n.changeLanguage(savedLang);
      }

      // Ensure I18nManager RTL state matches the language
      // This is needed on first load after the user previously selected an RTL language
      const shouldBeRtl = isRtl(lang);
      if (I18nManager.isRTL !== shouldBeRtl) {
        I18nManager.allowRTL(shouldBeRtl);
        I18nManager.forceRTL(shouldBeRtl);
        // Note: The app will need to reload for this to take effect
        // This happens automatically on next app start
      }
    })
    .finally(() => {
      // Signal that language loading is complete
      languageLoadedResolve?.();
    });

  initialized = true;
  return i18n;
}

// Initialize immediately on import
initI18n();

export { i18n };
