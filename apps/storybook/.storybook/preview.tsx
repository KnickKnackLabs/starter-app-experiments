import { isRtl } from "@starter/core/i18n";
import type { Preview } from "@storybook/react-vite";
import { Suspense, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "../src/styles.css";

// Decorator that syncs Storybook locale with i18n
const withI18n = (
  Story: React.ComponentType,
  context: { globals: { locale?: string } }
) => {
  const { locale = "en" } = context.globals;

  useEffect(() => {
    i18n.changeLanguage(locale);

    // Update document direction for RTL languages
    const direction = isRtl(locale) ? "rtl" : "ltr";
    document.documentElement.dir = direction;
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  );
};

const preview: Preview = {
  initialGlobals: {
    locale: "en",
    locales: {
      en: { icon: "🇺🇸", title: "English", right: "EN" },
      es: { icon: "🇪🇸", title: "Español", right: "ES" },
      he: { icon: "🇮🇱", title: "עברית", right: "HE" },
      ar: { icon: "🇸🇦", title: "العربية", right: "AR" },
      ru: { icon: "🇷🇺", title: "Русский", right: "RU" },
    },
  },

  parameters: {
    i18n,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },

  decorators: [withI18n],
};

export default preview;
