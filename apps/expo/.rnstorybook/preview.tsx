import { type SupportedLanguage, supportedLanguages } from "@starter/core/i18n";
import type { Preview } from "@storybook/react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "../components/ui/text";
import { saveLanguage } from "../i18n";

const languages: Record<SupportedLanguage, { flag: string; name: string }> = {
  en: { flag: "🇺🇸", name: "EN" },
  es: { flag: "🇪🇸", name: "ES" },
  he: { flag: "🇮🇱", name: "HE" },
  ar: { flag: "🇸🇦", name: "AR" },
  ru: { flag: "🇷🇺", name: "RU" },
};

// Language picker component for Storybook
function LanguagePicker() {
  const { i18n } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelect = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
    saveLanguage(lang);
    setIsExpanded(false);
  };

  const currentLang = (i18n.language as SupportedLanguage) || "en";

  if (!isExpanded) {
    return (
      <Pressable
        onPress={() => setIsExpanded(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          paddingHorizontal: 8,
          paddingVertical: 4,
          backgroundColor: "#f0f0f0",
          borderRadius: 4,
        }}
      >
        <Text style={{ fontSize: 14 }}>{languages[currentLang].flag}</Text>
        <Text style={{ fontSize: 12 }}>{languages[currentLang].name}</Text>
      </Pressable>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ gap: 4 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {supportedLanguages.map((lang) => (
        <Pressable
          key={lang}
          onPress={() => handleSelect(lang)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: lang === currentLang ? "#007AFF" : "#f0f0f0",
            borderRadius: 4,
          }}
        >
          <Text style={{ fontSize: 14 }}>{languages[lang].flag}</Text>
          <Text
            style={{
              fontSize: 12,
              color: lang === currentLang ? "#fff" : "#000",
            }}
          >
            {languages[lang].name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

// Decorator that adds language picker
const withI18n = (Story: React.ComponentType) => (
  <View style={{ flex: 1 }}>
    <View
      style={{
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        backgroundColor: "#fafafa",
      }}
    >
      <LanguagePicker />
    </View>
    <View style={{ flex: 1 }}>
      <Story />
    </View>
  </View>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [withI18n],
};

export default preview;
