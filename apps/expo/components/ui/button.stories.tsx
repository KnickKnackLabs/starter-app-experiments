import type { Meta, StoryObj } from "@storybook/react-native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button } from "./button";
import { Text } from "./text";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  decorators: [
    (StoryComponent) => (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <StoryComponent />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Helper component to use translations in stories
function TranslatedButton({
  translationKey,
  ...props
}: React.ComponentProps<typeof Button> & { translationKey: string }) {
  const { t } = useTranslation();
  return (
    <Button {...props}>
      <Text>{t(translationKey)}</Text>
    </Button>
  );
}

export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
  },
  render: (args) => (
    <TranslatedButton {...args} translationKey="components.button.primary" />
  ),
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "default",
  },
  render: (args) => (
    <TranslatedButton {...args} translationKey="components.button.secondary" />
  ),
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "default",
  },
  render: (args) => (
    <TranslatedButton
      {...args}
      translationKey="components.button.destructive"
    />
  ),
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "default",
  },
  render: (args) => (
    <TranslatedButton {...args} translationKey="components.button.outline" />
  ),
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "default",
  },
  render: (args) => (
    <TranslatedButton {...args} translationKey="components.button.ghost" />
  ),
};

export const Link: Story = {
  args: {
    variant: "link",
    size: "default",
  },
  render: (args) => (
    <TranslatedButton {...args} translationKey="components.button.link" />
  ),
};

export const Disabled: Story = {
  args: {
    variant: "default",
    disabled: true,
  },
  render: (args) => (
    <TranslatedButton {...args} translationKey="components.button.disabled" />
  ),
};

// Showcase all variants with translations
function AllVariantsStory() {
  const { t } = useTranslation();
  return (
    <View style={{ gap: 12 }}>
      <Button variant="default">
        <Text>{t("components.button.primary")}</Text>
      </Button>
      <Button variant="secondary">
        <Text>{t("components.button.secondary")}</Text>
      </Button>
      <Button variant="destructive">
        <Text>{t("components.button.destructive")}</Text>
      </Button>
      <Button variant="outline">
        <Text>{t("components.button.outline")}</Text>
      </Button>
      <Button variant="ghost">
        <Text>{t("components.button.ghost")}</Text>
      </Button>
      <Button variant="link">
        <Text>{t("components.button.link")}</Text>
      </Button>
    </View>
  );
}

export const AllVariants: Story = {
  render: () => <AllVariantsStory />,
};

// Example with common action buttons
function ActionButtonsStory() {
  const { t } = useTranslation();
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Button variant="outline">
        <Text>{t("actions.cancel")}</Text>
      </Button>
      <Button variant="default">
        <Text>{t("actions.save")}</Text>
      </Button>
    </View>
  );
}

export const ActionButtons: Story = {
  render: () => <ActionButtonsStory />,
};

// Delete confirmation example
function DeleteConfirmStory() {
  const { t } = useTranslation();
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Button variant="outline">
        <Text>{t("actions.cancel")}</Text>
      </Button>
      <Button variant="destructive">
        <Text>{t("actions.delete")}</Text>
      </Button>
    </View>
  );
}

export const DeleteConfirm: Story = {
  render: () => <DeleteConfirmStory />,
};
