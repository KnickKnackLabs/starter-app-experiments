"use client";

import { Text, View } from "react-native";
import { TextLink } from "solito/link";

export function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-8 p-4">
      <Text className="font-extrabold text-2xl">Welcome to Solito.</Text>
      <View className="max-w-[600px] gap-4">
        <Text className="text-center">
          Here is a basic starter to show you how you can navigate from one
          screen to another. This screen uses the same code on Next.js and React
          Native.
        </Text>
        <Text className="text-center">
          Solito is made by{" "}
          <TextLink
            className="text-blue-500"
            href="https://twitter.com/fernandotherojo"
            rel="noreferrer"
            target="_blank"
          >
            Fernando Rojo
          </TextLink>
          .
        </Text>
      </View>
      <View className="flex-row gap-8">
        <TextLink
          className="font-bold text-base text-blue-500"
          href="/users/fernando"
        >
          Link
        </TextLink>
      </View>
    </View>
  );
}
