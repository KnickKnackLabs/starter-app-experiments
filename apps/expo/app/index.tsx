import { isRtl } from "@starter/core/i18n";
import { Redirect } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { LanguagePicker } from "@/components/language-picker";
import { Text } from "@/components/ui/text";
import { STORYBOOK_ENABLED } from "./_layout";

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const rtl = isRtl(i18n.language);

  // When Storybook mode is enabled, redirect to Storybook UI
  if (__DEV__ && STORYBOOK_ENABLED) {
    return <Redirect href="/storybook" />;
  }

  return (
    <View className="flex-1 flex-col items-center justify-center gap-4 bg-background p-4">
      <View className={`absolute top-12 ${rtl ? "left-4" : "right-4"}`}>
        <LanguagePicker />
      </View>
      <Text variant="h3">
        {t("home.welcome", { appName: t("common.appName") })}
      </Text>
      <Text className="text-muted-foreground">{t("home.description")}</Text>
    </View>
  );
}
