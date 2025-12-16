// NOTE: You may see a "SafeAreaView has been deprecated" warning in the console.
// This is a known issue with NativeWind's react-native-css-interop package.
// It does not affect functionality. Tracking issues:
// - https://github.com/nativewind/nativewind/issues/1568
// - https://github.com/nativewind/react-native-css/issues/237

import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/components/theme-provider";

// Launch with EXPO_PUBLIC_STORYBOOK_ENABLED=true to open Storybook on startup
export const STORYBOOK_ENABLED =
  process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Protected guard={__DEV__}>
            <Stack.Screen name="storybook" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
