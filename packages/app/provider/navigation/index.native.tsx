import { NavigationContainer } from "@react-navigation/native";
import { createURL } from "expo-linking";
import { useMemo } from "react";

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: [createURL("/")],
          config: {
            initialRouteName: "home",
            screens: {
              home: "",
              "user-detail": "users/:id",
            },
          },
        }),
        []
      )}
    >
      {children}
    </NavigationContainer>
  );
}
