// biome-ignore lint/performance/noBarrelFile: This is the intentional entry point for @starter/core/i18n
export {
  defaultLanguage,
  defaultNS,
  isRtl,
  resources,
  rtlLanguages,
  type SupportedLanguage,
  supportedLanguages,
} from "./resources";
export type { TranslationKeys } from "./types";

// Re-export types module for side-effect type augmentation
import "./types";
