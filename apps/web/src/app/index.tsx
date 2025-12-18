import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { t } = useTranslation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-8">
      <h1 className="font-bold text-2xl">
        {t("home.welcome", { appName: t("common.appName") })}
      </h1>
      <p className="text-muted-foreground">{t("home.description")}</p>
    </main>
  );
}
