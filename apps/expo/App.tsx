import "./global.css";
import { PortalHost } from "@rn-primitives/portal";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/components/theme-provider";
import { HomeScreen } from "@/screens/home";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <HomeScreen />
        <PortalHost />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
