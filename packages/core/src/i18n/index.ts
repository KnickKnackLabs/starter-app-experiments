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
