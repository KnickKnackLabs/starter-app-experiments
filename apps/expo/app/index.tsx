import { isRtl } from "@starter/core/i18n";
import { Redirect } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
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
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="items-center gap-6 p-4 pb-8"
      style={{ direction: rtl ? "rtl" : "ltr" }}
    >
      <View className={`absolute top-2 ${rtl ? "left-4" : "right-4"} z-10`}>
        <LanguagePicker />
      </View>

      <View className="mt-12 items-center gap-2">
        <Text variant="h3">
          {t("home.welcome", { appName: t("common.appName") })}
        </Text>
        <Text className="text-muted-foreground">{t("home.description")}</Text>
      </View>

      <View className="w-full max-w-md gap-4">
        <ExampleCard title="Numbers">
          <Text className="text-muted-foreground text-sm">
            {t("examples.numbers.basic", { val: 1_234_567 })}
          </Text>
          <Text className="text-muted-foreground text-sm">
            {t("examples.numbers.percent", { val: 0.847 })}
          </Text>
          <Text className="text-muted-foreground text-sm">
            {t("examples.numbers.compact", { val: 9_800_000 })}
          </Text>
        </ExampleCard>

        <ExampleCard title="Currency">
          <Text className="text-muted-foreground text-sm">
            {t("examples.currency.usd", { val: 99.99 })}
          </Text>
          <Text className="text-muted-foreground text-sm">
            {t("examples.currency.eur", { val: 85.5 })}
          </Text>
          <Text className="text-muted-foreground text-sm">
            {t("examples.currency.ils", { val: 375 })}
          </Text>
        </ExampleCard>

        <ExampleCard title="Dates">
          <Text className="text-muted-foreground text-sm">
            {t("examples.dates.full", { val: new Date() })}
          </Text>
          <Text className="text-muted-foreground text-sm">
            {t("examples.dates.short", { val: new Date() })}
          </Text>
          <Text className="text-muted-foreground text-sm">
            {t("examples.dates.time", { val: new Date() })}
          </Text>
        </ExampleCard>

        <ExampleCard title="Relative Time">
          <Text className="text-muted-foreground text-sm">
            {t("examples.relative.minutesAgo", { val: -5 })}
          </Text>
          <Text className="text-muted-foreground text-sm">
            {t("examples.relative.hoursAgo", { val: -2 })}
          </Text>
          <Text className="text-muted-foreground text-sm">
            {t("examples.relative.inDays", { val: 3 })}
          </Text>
        </ExampleCard>

        <ExampleCard title="Pluralization">
          <Text className="text-muted-foreground text-sm">
            {t("examples.plurals.notifications", { count: 0 })}
          </Text>
          <Text className="text-muted-foreground text-sm">
            {t("examples.plurals.notifications", { count: 1 })}
          </Text>
          <Text className="text-muted-foreground text-sm">
            {t("examples.plurals.notifications", { count: 42 })}
          </Text>
        </ExampleCard>

        <ExampleCard title="Lists">
          <Text className="text-muted-foreground text-sm">
            {t("examples.lists.and", { val: ["Alice", "Bob", "Charlie"] })}
          </Text>
          <Text className="text-muted-foreground text-sm">
            {t("examples.lists.or", { val: ["Red", "Blue", "Green"] })}
          </Text>
        </ExampleCard>
      </View>

      <Text className="text-muted-foreground text-sm">
        {t("common.lastUpdated", { val: -2 })}
      </Text>
    </ScrollView>
  );
}

function ExampleCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="gap-1 rounded-lg border border-border bg-card p-4">
      <Text className="mb-1 font-semibold text-card-foreground text-sm">
        {title}
      </Text>
      {children}
    </View>
  );
}
