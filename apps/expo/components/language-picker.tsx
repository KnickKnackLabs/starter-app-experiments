import {
  isRtl,
  type SupportedLanguage,
  supportedLanguages,
} from "@starter/core/i18n";
import { reloadAppAsync } from "expo";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, I18nManager, Modal, Pressable, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { saveLanguage } from "../i18n";

const languages: Record<SupportedLanguage, { flag: string; name: string }> = {
  en: { flag: "🇺🇸", name: "English" },
  es: { flag: "🇪🇸", name: "Español" },
  he: { flag: "🇮🇱", name: "עברית" },
  ar: { flag: "🇸🇦", name: "العربية" },
  ru: { flag: "🇷🇺", name: "Русский" },
};

export function LanguagePicker() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLang =
    languages[i18n.language as SupportedLanguage] ?? languages.en;

  const handleSelect = async (lang: SupportedLanguage) => {
    const currentIsRtl = isRtl(i18n.language);
    const newIsRtl = isRtl(lang);
    const rtlChanged = currentIsRtl !== newIsRtl;

    // Save language and update i18next
    await saveLanguage(lang);
    i18n.changeLanguage(lang);
    setIsOpen(false);

    // If RTL direction changed, we need to update I18nManager and reload
    if (rtlChanged) {
      I18nManager.allowRTL(newIsRtl);
      I18nManager.forceRTL(newIsRtl);

      // Give user feedback before reload
      Alert.alert(
        newIsRtl ? "שינוי כיוון" : "Direction Change",
        newIsRtl
          ? "האפליקציה תופעל מחדש כדי להחיל את הכיוון החדש"
          : "The app will restart to apply the new layout direction",
        [
          {
            text: "OK",
            onPress: () => reloadAppAsync(),
          },
        ]
      );
    }
  };

  return (
    <>
      <Button onPress={() => setIsOpen(true)} size="sm" variant="ghost">
        <Text>{currentLang.flag}</Text>
      </Button>

      <Modal
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
        transparent
        visible={isOpen}
      >
        <Pressable
          className="flex-1 items-center justify-center bg-black/50"
          onPress={() => setIsOpen(false)}
        >
          <View className="mx-4 w-64 rounded-lg bg-background p-2 shadow-lg">
            {supportedLanguages.map((lang) => (
              <Pressable
                className="flex-row items-center gap-3 rounded-md px-3 py-2 active:bg-accent"
                key={lang}
                onPress={() => handleSelect(lang)}
              >
                <Text className="text-lg">{languages[lang].flag}</Text>
                <Text
                  className={
                    lang === i18n.language
                      ? "font-semibold text-foreground"
                      : "text-foreground"
                  }
                >
                  {languages[lang].name}
                </Text>
                {lang === i18n.language && (
                  <Text className="ml-auto text-primary">✓</Text>
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
