import { Button } from "@ui/components/ui/button";
import { useTranslation } from "react-i18next";
import { LanguagePicker } from "./components/language-picker";

export function App() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-8 text-foreground">
      <div className="absolute top-4 right-4">
        <LanguagePicker />
      </div>
      <h1 className="font-bold text-3xl">{t("common.appName")}</h1>
      <p className="text-muted-foreground">{t("home.description")}</p>
      <Button onClick={() => console.log("Hello from Electron!")}>
        {t("actions.learnMore")}
      </Button>
    </div>
  );
}
