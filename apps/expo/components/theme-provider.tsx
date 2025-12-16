import { useColorScheme } from "nativewind";
import { View } from "react-native";
import { DARK_THEME, LIGHT_THEME } from "@/lib/theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? DARK_THEME : LIGHT_THEME;
  return (
    <View className="flex-1" style={theme}>
      {children}
    </View>
  );
}
