import { isRtl } from "@starter/core/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { t, i18n } = useTranslation();
  const rtl = isRtl(i18n.language);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center gap-8 p-8"
      dir={rtl ? "rtl" : "ltr"}
    >
      <div className="text-center">
        <h1 className="font-bold text-2xl">
          {t("home.welcome", { appName: t("common.appName") })}
        </h1>
        <p className="text-muted-foreground">{t("home.description")}</p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
        <ExampleCard title="Numbers">
          <p>{t("examples.numbers.basic", { val: 1_234_567 })}</p>
          <p>{t("examples.numbers.percent", { val: 0.847 })}</p>
          <p>{t("examples.numbers.compact", { val: 9_800_000 })}</p>
        </ExampleCard>

        <ExampleCard title="Currency">
          <p>{t("examples.currency.usd", { val: 99.99 })}</p>
          <p>{t("examples.currency.eur", { val: 85.5 })}</p>
          <p>{t("examples.currency.ils", { val: 375 })}</p>
        </ExampleCard>

        <ExampleCard title="Dates">
          <p>{t("examples.dates.full", { val: new Date() })}</p>
          <p>{t("examples.dates.short", { val: new Date() })}</p>
          <p>{t("examples.dates.time", { val: new Date() })}</p>
        </ExampleCard>

        <ExampleCard title="Relative Time">
          <p>{t("examples.relative.minutesAgo", { val: -5 })}</p>
          <p>{t("examples.relative.hoursAgo", { val: -2 })}</p>
          <p>{t("examples.relative.inDays", { val: 3 })}</p>
        </ExampleCard>

        <ExampleCard title="Pluralization">
          <p>{t("examples.plurals.notifications", { count: 0 })}</p>
          <p>{t("examples.plurals.notifications", { count: 1 })}</p>
          <p>{t("examples.plurals.notifications", { count: 42 })}</p>
        </ExampleCard>

        <ExampleCard title="Lists">
          <p>{t("examples.lists.and", { val: ["Alice", "Bob", "Charlie"] })}</p>
          <p>{t("examples.lists.or", { val: ["Red", "Blue", "Green"] })}</p>
        </ExampleCard>
      </div>

      <p className="text-muted-foreground text-sm">
        {t("common.lastUpdated", { val: -2 })}
      </p>
    </main>
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
    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <h3 className="mb-2 font-semibold text-sm">{title}</h3>
      <div className="space-y-1 text-muted-foreground text-sm">{children}</div>
    </div>
  );
}
