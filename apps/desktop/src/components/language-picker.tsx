import { type SupportedLanguage, supportedLanguages } from "@starter/core/i18n";
import { Button } from "@ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages: Record<SupportedLanguage, { flag: string; name: string }> = {
  en: { flag: "🇺🇸", name: "English" },
  es: { flag: "🇪🇸", name: "Español" },
  he: { flag: "🇮🇱", name: "עברית" },
  ar: { flag: "🇸🇦", name: "العربية" },
  ru: { flag: "🇷🇺", name: "Русский" },
};

export function LanguagePicker() {
  const { i18n } = useTranslation();
  const currentLang =
    languages[i18n.language as SupportedLanguage] ?? languages.en;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2" size="sm" variant="ghost">
          <Languages className="h-4 w-4" />
          <span>{currentLang.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          onValueChange={(value) => i18n.changeLanguage(value)}
          value={i18n.language}
        >
          {supportedLanguages.map((lang) => (
            <DropdownMenuRadioItem className="gap-2" key={lang} value={lang}>
              <span>{languages[lang].flag}</span>
              <span>{languages[lang].name}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
