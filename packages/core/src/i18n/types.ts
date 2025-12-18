import "i18next";
import type en from "../../locales/en";
import type { defaultNS, resources } from "./resources";

// Type augmentation for i18next
declare module "i18next" {
  // biome-ignore lint/style/useConsistentTypeDefinitions: Declaration merging requires interface
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["en"];
  }
}

// Helper type for translation keys
export type TranslationKeys = typeof en;
