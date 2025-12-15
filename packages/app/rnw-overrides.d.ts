// override react-native types with react-native-web types
import "react-native";

declare module "react-native" {
  // biome-ignore lint/style/useConsistentTypeDefinitions: Declaration merging requires interfaces
  interface PressableStateCallbackType {
    hovered?: boolean;
    focused?: boolean;
  }
  // biome-ignore lint/style/useConsistentTypeDefinitions: Declaration merging requires interfaces
  interface ViewStyle {
    transitionProperty?: string;
    transitionDuration?: string;
  }
  // biome-ignore lint/style/useConsistentTypeDefinitions: Declaration merging requires interfaces
  interface TextProps {
    accessibilityComponentType?: never;
    accessibilityTraits?: never;
    href?: string;
    hrefAttrs?: {
      rel: "noreferrer";
      target?: "_blank";
    };
  }
  // biome-ignore lint/style/useConsistentTypeDefinitions: Declaration merging requires interfaces
  interface ViewProps {
    accessibilityRole?: string;
    href?: string;
    hrefAttrs?: {
      rel: "noreferrer";
      target?: "_blank";
    };
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  }
}
