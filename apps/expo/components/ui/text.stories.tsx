import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";
import { Text } from "./text";

const meta: Meta<typeof Text> = {
  title: "UI/Text",
  component: Text,
  decorators: [
    (StoryComponent) => (
      <View style={{ flex: 1, padding: 16 }}>
        <StoryComponent />
      </View>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "h1",
        "h2",
        "h3",
        "h4",
        "p",
        "blockquote",
        "code",
        "lead",
        "large",
        "small",
        "muted",
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Default text",
  },
};

export const H1: Story = {
  args: {
    variant: "h1",
    children: "Heading 1",
  },
};

export const H2: Story = {
  args: {
    variant: "h2",
    children: "Heading 2",
  },
};

export const H3: Story = {
  args: {
    variant: "h3",
    children: "Heading 3",
  },
};

export const H4: Story = {
  args: {
    variant: "h4",
    children: "Heading 4",
  },
};

export const Paragraph: Story = {
  args: {
    variant: "p",
    children:
      "This is a paragraph of text. It demonstrates how body text looks with the paragraph variant applied.",
  },
};

export const Code: Story = {
  args: {
    variant: "code",
    children: "const x = 42;",
  },
};

export const Muted: Story = {
  args: {
    variant: "muted",
    children: "This is muted text",
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="lead">Lead text</Text>
      <Text variant="large">Large text</Text>
      <Text variant="default">Default text</Text>
      <Text variant="small">Small text</Text>
      <Text variant="muted">Muted text</Text>
      <Text variant="code">Code text</Text>
    </View>
  ),
};
