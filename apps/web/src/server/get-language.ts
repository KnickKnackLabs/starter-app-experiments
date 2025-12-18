import {
  defaultLanguage,
  type SupportedLanguage,
  supportedLanguages,
} from "@starter/core/i18n";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { LANGUAGE_COOKIE } from "../i18n";

function parseCookie(
  cookieHeader: string | null,
  name: string
): string | undefined {
  if (!cookieHeader) {
    return;
  }
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match?.[1];
}

export const getLanguageFromCookie = createServerFn({ method: "GET" }).handler(
  // biome-ignore lint/suspicious/useAwait: TanStack Start handlers are async by convention
  async (): Promise<SupportedLanguage> => {
    try {
      const request = getRequest();
      const cookieHeader = request.headers.get("cookie");
      const cookieValue = parseCookie(cookieHeader, LANGUAGE_COOKIE);

      if (
        cookieValue &&
        supportedLanguages.includes(cookieValue as SupportedLanguage)
      ) {
        return cookieValue as SupportedLanguage;
      }
    } catch {
      // Cookie reading failed (e.g., during build)
    }

    return defaultLanguage;
  }
);
