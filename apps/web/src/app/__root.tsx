/// <reference types="vite/client" />

import { isRtl, type SupportedLanguage } from "@starter/core/i18n";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import { LanguagePicker } from "../components/language-picker";
import { initI18n } from "../i18n";
import { getLanguageFromCookie } from "../server/get-language";
import appCss from "../styles/globals.css?url";

export const Route = createRootRoute({
  beforeLoad: async () => {
    const language = await getLanguageFromCookie();
    // Initialize i18next with server-detected language BEFORE rendering
    initI18n(language);
    return { language };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Starter App" },
      {
        name: "description",
        content: "Monorepo starter with TanStack Start, Expo, and Tailwind",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  const { language: serverLanguage } = Route.useRouteContext();
  const i18nInstance = initI18n(serverLanguage);

  return (
    <I18nextProvider i18n={i18nInstance}>
      <RootContent serverLanguage={serverLanguage} />
    </I18nextProvider>
  );
}

function RootContent({
  serverLanguage,
}: {
  serverLanguage: SupportedLanguage;
}) {
  const { i18n } = useTranslation();

  // Update document direction and lang when language changes
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = isRtl(i18n.language) ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <RootDocument language={serverLanguage}>
      <header className="fixed end-0 top-0 p-4">
        <LanguagePicker />
      </header>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({
  children,
  language,
}: Readonly<{ children: ReactNode; language: SupportedLanguage }>) {
  return (
    <html
      dir={isRtl(language) ? "rtl" : "ltr"}
      lang={language}
      suppressHydrationWarning
    >
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
