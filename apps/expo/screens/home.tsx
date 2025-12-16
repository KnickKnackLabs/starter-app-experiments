import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-8 bg-background p-4">
      <Text variant="h3">React Native Reusables Test</Text>
      <Text className="text-muted-foreground">
        If you see styled buttons below, the setup is working!
      </Text>
      <View className="gap-4">
        <Button>
          <Text>Default</Text>
        </Button>
        <Button variant="secondary">
          <Text>Secondary</Text>
        </Button>
        <Button variant="destructive">
          <Text>Destructive</Text>
        </Button>
        <Button variant="outline">
          <Text>Outline</Text>
        </Button>
        <Button variant="ghost">
          <Text>Ghost</Text>
        </Button>
      </View>
    </View>
  );
}
