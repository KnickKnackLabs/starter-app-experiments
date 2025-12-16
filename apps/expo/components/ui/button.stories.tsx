import type { Meta, StoryObj } from "@storybook/react-native";
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

export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
  },
  render: (args) => (
    <Button {...args}>
      <Text>Default</Text>
    </Button>
  ),
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "default",
  },
  render: (args) => (
    <Button {...args}>
      <Text>Secondary</Text>
    </Button>
  ),
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "default",
  },
  render: (args) => (
    <Button {...args}>
      <Text>Destructive</Text>
    </Button>
  ),
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "default",
  },
  render: (args) => (
    <Button {...args}>
      <Text>Outline</Text>
    </Button>
  ),
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "default",
  },
  render: (args) => (
    <Button {...args}>
      <Text>Ghost</Text>
    </Button>
  ),
};

export const Link: Story = {
  args: {
    variant: "link",
    size: "default",
  },
  render: (args) => (
    <Button {...args}>
      <Text>Link</Text>
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button variant="default">
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
      <Button variant="link">
        <Text>Link</Text>
      </Button>
    </View>
  ),
};

export const Disabled: Story = {
  args: {
    variant: "default",
    disabled: true,
  },
  render: (args) => (
    <Button {...args}>
      <Text>Disabled</Text>
    </Button>
  ),
};
