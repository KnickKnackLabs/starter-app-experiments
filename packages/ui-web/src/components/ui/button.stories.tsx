import type { Meta, StoryObj } from "@storybook/react-vite";
import { useTranslation } from "react-i18next";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
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
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
    disabled: {
      control: "boolean",
    },
    asChild: {
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
  return <Button {...props}>{t(translationKey)}</Button>;
}

export const Default: Story = {
  render: (args) => (
    <TranslatedButton {...args} translationKey="components.button.primary" />
  ),
  args: {
    variant: "default",
    size: "default",
  },
};

export const Destructive: Story = {
  render: (args) => (
    <TranslatedButton
      {...args}
      translationKey="components.button.destructive"
    />
  ),
  args: {
    variant: "destructive",
  },
};

export const Outline: Story = {
  render: (args) => (
    <TranslatedButton {...args} translationKey="components.button.outline" />
  ),
  args: {
    variant: "outline",
  },
};

export const Secondary: Story = {
  render: (args) => (
    <TranslatedButton {...args} translationKey="components.button.secondary" />
  ),
  args: {
    variant: "secondary",
  },
};

export const Ghost: Story = {
  render: (args) => (
    <TranslatedButton {...args} translationKey="components.button.ghost" />
  ),
  args: {
    variant: "ghost",
  },
};

export const Link: Story = {
  render: (args) => (
    <TranslatedButton {...args} translationKey="components.button.link" />
  ),
  args: {
    variant: "link",
  },
};

export const Disabled: Story = {
  render: (args) => (
    <TranslatedButton {...args} translationKey="components.button.disabled" />
  ),
  args: {
    disabled: true,
  },
};

// Size variants using action translations
export const Small: Story = {
  render: (args) => (
    <TranslatedButton {...args} translationKey="actions.save" />
  ),
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  render: (args) => (
    <TranslatedButton {...args} translationKey="actions.submit" />
  ),
  args: {
    size: "lg",
  },
};

// Showcase all variants with translations
function AllVariantsStory() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">{t("components.button.primary")}</Button>
      <Button variant="secondary">{t("components.button.secondary")}</Button>
      <Button variant="destructive">
        {t("components.button.destructive")}
      </Button>
      <Button variant="outline">{t("components.button.outline")}</Button>
      <Button variant="ghost">{t("components.button.ghost")}</Button>
      <Button variant="link">{t("components.button.link")}</Button>
    </div>
  );
}

export const AllVariants: Story = {
  render: () => <AllVariantsStory />,
};

// Showcase all sizes with action translations
function AllSizesStory() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">{t("actions.cancel")}</Button>
      <Button size="default">{t("actions.save")}</Button>
      <Button size="lg">{t("actions.submit")}</Button>
    </div>
  );
}

export const AllSizes: Story = {
  render: () => <AllSizesStory />,
};

// Example with common action buttons
function ActionButtonsStory() {
  const { t } = useTranslation();
  return (
    <div className="flex gap-2">
      <Button variant="outline">{t("actions.cancel")}</Button>
      <Button variant="default">{t("actions.save")}</Button>
    </div>
  );
}

export const ActionButtons: Story = {
  render: () => <ActionButtonsStory />,
  parameters: {
    docs: {
      description: {
        story: "Common action button pattern with Cancel and Save.",
      },
    },
  },
};

// Delete confirmation example
function DeleteConfirmStory() {
  const { t } = useTranslation();
  return (
    <div className="flex gap-2">
      <Button variant="outline">{t("actions.cancel")}</Button>
      <Button variant="destructive">{t("actions.delete")}</Button>
    </div>
  );
}

export const DeleteConfirm: Story = {
  render: () => <DeleteConfirmStory />,
  parameters: {
    docs: {
      description: {
        story: "Delete confirmation pattern with Cancel and Delete buttons.",
      },
    },
  },
};
