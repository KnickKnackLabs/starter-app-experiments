import { isRtl } from "@starter/core/i18n";
import type { Preview } from "@storybook/react-vite";
import { Suspense, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "../src/styles-storybook.css";

// Decorator that syncs Storybook locale and theme
const withI18nAndTheme = (
  Story: React.ComponentType,
  context: { globals: { locale?: string; theme?: string } }
) => {
  const { locale = "en", theme = "light" } = context.globals;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const direction = isRtl(locale) ? "rtl" : "ltr";

  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <div dir={direction} lang={locale} style={{ height: "100%" }}>
          <Story />
        </div>
      </I18nextProvider>
    </Suspense>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: "en",
    theme: "light",
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

  decorators: [withI18nAndTheme],
};

export default preview;
