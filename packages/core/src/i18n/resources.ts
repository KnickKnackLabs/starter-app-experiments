import ar from "../../locales/ar";
import en from "../../locales/en";
import es from "../../locales/es";
import he from "../../locales/he";
import ru from "../../locales/ru";

export const defaultNS = "translation";

export const resources = {
  en: { translation: en },
  es: { translation: es },
  he: { translation: he },
  ar: { translation: ar },
  ru: { translation: ru },
} as const;

export const supportedLanguages = ["en", "es", "he", "ar", "ru"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const rtlLanguages: SupportedLanguage[] = ["he", "ar"];

export const defaultLanguage: SupportedLanguage = "en";

export function isRtl(language: string): boolean {
  return rtlLanguages.includes(language as SupportedLanguage);
}
