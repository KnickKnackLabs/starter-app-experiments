import { Button } from "@ui/components/ui/button";
import { useTranslation } from "react-i18next";

export function App() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-8 text-foreground">
      <h1 className="font-bold text-3xl">{t("common.appName")}</h1>
      <p className="text-muted-foreground">
        Electron desktop app with React, Tailwind, and Shadcn UI
      </p>
      <Button onClick={() => console.log("Hello from Electron!")}>
        Click me
      </Button>
    </div>
  );
}
