import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const meta: Meta = {
  title: "Localization/Formatting Examples",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Number Formatting
// ============================================================================

function NumberFormattingDemo() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Number Formatting</h3>
      <p className="text-muted-foreground text-sm">
        Numbers are formatted according to the current locale (comma vs period,
        spacing, etc.)
      </p>
      <div className="grid gap-2">
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Basic number:</span>
          <span>{t("examples.numbers.basic", { val: 1_234_567 })}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Percentage:</span>
          <span>{t("examples.numbers.percent", { val: 0.847 })}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Compact notation:</span>
          <span>{t("examples.numbers.compact", { val: 2_500_000 })}</span>
        </div>
      </div>
    </div>
  );
}

export const NumberFormatting: Story = {
  render: () => <NumberFormattingDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Numbers are formatted using the Intl.NumberFormat API, respecting locale conventions for separators and notation.",
      },
    },
  },
};

// ============================================================================
// Currency Formatting
// ============================================================================

function CurrencyFormattingDemo() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Currency Formatting</h3>
      <p className="text-muted-foreground text-sm">
        Currency symbols and positions vary by locale (e.g., $100 vs 100 €)
      </p>
      <div className="grid gap-2">
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">USD (US Dollar):</span>
          <span>{t("examples.currency.usd", { val: 1234.56 })}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">EUR (Euro):</span>
          <span>{t("examples.currency.eur", { val: 1234.56 })}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">ILS (Israeli Shekel):</span>
          <span>{t("examples.currency.ils", { val: 1234.56 })}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">SAR (Saudi Riyal):</span>
          <span>{t("examples.currency.sar", { val: 1234.56 })}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">RUB (Russian Ruble):</span>
          <span>{t("examples.currency.rub", { val: 1234.56 })}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">In context:</span>
          <span>{t("examples.currency.price", { val: 99.99 })}</span>
        </div>
      </div>
    </div>
  );
}

export const CurrencyFormatting: Story = {
  render: () => <CurrencyFormattingDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Currency formatting handles symbol placement, decimal separators, and spacing according to locale conventions.",
      },
    },
  },
};

// ============================================================================
// Date & Time Formatting
// ============================================================================

function DateTimeFormattingDemo() {
  const { t } = useTranslation();
  const now = new Date();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Date & Time Formatting</h3>
      <p className="text-muted-foreground text-sm">
        Date formats vary significantly: MM/DD/YYYY (US) vs DD/MM/YYYY (EU) vs
        YYYY年MM月DD日 (JP)
      </p>
      <div className="grid gap-2">
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Full date:</span>
          <span>{t("examples.dates.full", { val: now })}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Long date:</span>
          <span>{t("examples.dates.long", { val: now })}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Short date:</span>
          <span>{t("examples.dates.short", { val: now })}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Time only:</span>
          <span>{t("examples.dates.time", { val: now })}</span>
        </div>
      </div>
    </div>
  );
}

export const DateTimeFormatting: Story = {
  render: () => <DateTimeFormattingDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Date and time formatting respects locale conventions for order, separators, and calendar systems.",
      },
    },
  },
};

// ============================================================================
// Relative Time
// ============================================================================

function RelativeTimeDemo() {
  const { t } = useTranslation();

  // relativetime takes a number and the unit is specified in the translation string
  // Negative = past, Positive = future
  const relativeValues = [
    { label: "5 minutes ago", key: "examples.relative.minutesAgo", val: -5 },
    { label: "2 hours ago", key: "examples.relative.hoursAgo", val: -2 },
    { label: "1 day ago", key: "examples.relative.daysAgo", val: -1 },
    { label: "3 weeks ago", key: "examples.relative.weeksAgo", val: -3 },
    { label: "in 2 days", key: "examples.relative.inDays", val: 2 },
    { label: "in 1 month", key: "examples.relative.inMonths", val: 1 },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Relative Time</h3>
      <p className="text-muted-foreground text-sm">
        Relative time uses Intl.RelativeTimeFormat. Pass a number (negative for
        past, positive for future) and specify the unit in the translation.
      </p>
      <div className="grid gap-2">
        {relativeValues.map(({ label, key, val }) => (
          <div className="flex justify-between border-b pb-2" key={label}>
            <span className="text-muted-foreground">{label}:</span>
            <span>{t(key, { val })}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const RelativeTime: Story = {
  render: () => <RelativeTimeDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Relative time formatting produces natural language like "3 days ago" or "in 2 hours" appropriate to each locale.',
      },
    },
  },
};

// ============================================================================
// List Formatting
// ============================================================================

function ListFormattingDemo() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">List Formatting</h3>
      <p className="text-muted-foreground text-sm">
        List conjunctions vary by language: "A, B, and C" (English) vs "A, B y
        C" (Spanish)
      </p>
      <div className="grid gap-2">
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Conjunction (and):</span>
          <span>
            {t("examples.lists.and", { val: ["Alice", "Bob", "Charlie"] })}
          </span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-muted-foreground">Disjunction (or):</span>
          <span>
            {t("examples.lists.or", {
              val: ["Option A", "Option B", "Option C"],
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export const ListFormatting: Story = {
  render: () => <ListFormattingDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "List formatting handles conjunctions (and) and disjunctions (or) with proper locale-specific punctuation and words.",
      },
    },
  },
};

// ============================================================================
// Pluralization
// ============================================================================

function PluralizationDemo() {
  const { t } = useTranslation();
  const [notificationCount, setNotificationCount] = useState(0);
  const [itemCount, setItemCount] = useState(1);
  const [followerCount, setFollowerCount] = useState(5);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg">Pluralization</h3>
        <p className="text-muted-foreground text-sm">
          Different languages have different plural rules. English has 2 forms,
          Russian has 4, Arabic has 6. i18next handles this automatically using
          CLDR rules.
        </p>
      </div>

      <div className="space-y-4">
        {/* Notifications */}
        <div className="rounded-lg border p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium">Notifications</span>
            <div className="flex items-center gap-2">
              <button
                className="rounded border px-2 py-1 hover:bg-muted"
                onClick={() =>
                  setNotificationCount(Math.max(0, notificationCount - 1))
                }
                type="button"
              >
                -
              </button>
              <span className="w-8 text-center">{notificationCount}</span>
              <button
                className="rounded border px-2 py-1 hover:bg-muted"
                onClick={() => setNotificationCount(notificationCount + 1)}
                type="button"
              >
                +
              </button>
            </div>
          </div>
          <p className="text-lg">
            {t("examples.plurals.notifications", { count: notificationCount })}
          </p>
        </div>

        {/* Cart Items */}
        <div className="rounded-lg border p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium">Cart Items</span>
            <div className="flex items-center gap-2">
              <button
                className="rounded border px-2 py-1 hover:bg-muted"
                onClick={() => setItemCount(Math.max(0, itemCount - 1))}
                type="button"
              >
                -
              </button>
              <span className="w-8 text-center">{itemCount}</span>
              <button
                className="rounded border px-2 py-1 hover:bg-muted"
                onClick={() => setItemCount(itemCount + 1)}
                type="button"
              >
                +
              </button>
            </div>
          </div>
          <p className="text-lg">
            {t("examples.plurals.items", { count: itemCount })}
          </p>
        </div>

        {/* Followers */}
        <div className="rounded-lg border p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium">Followers</span>
            <div className="flex items-center gap-2">
              <button
                className="rounded border px-2 py-1 hover:bg-muted"
                onClick={() => setFollowerCount(Math.max(0, followerCount - 1))}
                type="button"
              >
                -
              </button>
              <span className="w-8 text-center">{followerCount}</span>
              <button
                className="rounded border px-2 py-1 hover:bg-muted"
                onClick={() => setFollowerCount(followerCount + 1)}
                type="button"
              >
                +
              </button>
            </div>
          </div>
          <p className="text-lg">
            {t("examples.plurals.followers", { count: followerCount })}
          </p>
        </div>
      </div>

      <div className="rounded bg-muted/50 p-3 text-muted-foreground text-sm">
        <strong>Tip:</strong> Try switching to Arabic to see all 6 plural forms
        (0, 1, 2, 3-10, 11-99, 100+) or Russian for 4 forms.
      </div>
    </div>
  );
}

export const Pluralization: Story = {
  render: () => <PluralizationDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Pluralization automatically selects the correct form based on count and language. Arabic has 6 forms, Russian has 4, English has 2.",
      },
    },
  },
};

// ============================================================================
// Ordinals
// ============================================================================

function OrdinalsDemo() {
  const { t } = useTranslation();

  const positions = [1, 2, 3, 4, 11, 12, 13, 21, 22, 23, 100, 101];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Ordinal Numbers</h3>
      <p className="text-muted-foreground text-sm">
        Ordinals (1st, 2nd, 3rd) have special rules. English has 4 forms: -st,
        -nd, -rd, -th.
      </p>
      <div className="flex flex-wrap gap-2">
        {positions.map((pos) => (
          <span className="rounded-full bg-muted px-3 py-1 text-sm" key={pos}>
            {t("examples.ordinals.place", { count: pos, ordinal: true })}
          </span>
        ))}
      </div>
    </div>
  );
}

export const Ordinals: Story = {
  render: () => <OrdinalsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Ordinal formatting handles language-specific suffixes like 1st, 2nd, 3rd in English or 1º, 2º, 3º in Spanish.",
      },
    },
  },
};

// ============================================================================
// RTL Layout Demo
// ============================================================================

function RTLLayoutDemo() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "he" || i18n.language === "ar";

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">RTL Layout</h3>
      <p className="text-muted-foreground text-sm">
        Switch to Hebrew or Arabic to see the layout flip. Text alignment,
        flexbox direction, and reading order all reverse automatically.
      </p>

      <div className="space-y-4 rounded-lg border p-4">
        {/* Navigation example */}
        <div className="flex items-center justify-between">
          <span className="font-medium">{t("common.appName")}</span>
          <nav className="flex gap-4 text-sm">
            <a className="hover:underline" href="#home">
              {t("nav.home")}
            </a>
            <a className="hover:underline" href="#about">
              {t("actions.learnMore")}
            </a>
          </nav>
        </div>

        {/* Card with actions */}
        <div className="rounded border p-4">
          <h4 className="mb-2 font-medium">{t("home.description")}</h4>
          <p className="mb-4 text-muted-foreground text-sm">
            {t("common.lastUpdated", { val: -2 })}
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="rounded border px-3 py-1 text-sm hover:bg-muted"
              type="button"
            >
              {t("actions.cancel")}
            </button>
            <button
              className="rounded bg-primary px-3 py-1 text-primary-foreground text-sm"
              type="button"
            >
              {t("actions.save")}
            </button>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{t("common.loading")}</span>
            <span>{t("examples.numbers.percent", { val: 0.75 })}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: "75%" }}
            />
          </div>
        </div>
      </div>

      <div className="rounded bg-muted/50 p-3 text-muted-foreground text-sm">
        <strong>Current direction:</strong>{" "}
        {isRtl ? "RTL (Right-to-Left)" : "LTR (Left-to-Right)"}
      </div>
    </div>
  );
}

export const RTLLayout: Story = {
  render: () => <RTLLayoutDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "RTL (Right-to-Left) support automatically flips layouts for languages like Hebrew and Arabic. Use the language picker to see the difference.",
      },
    },
  },
};

// ============================================================================
// All Examples Combined
// ============================================================================

function AllExamplesDemo() {
  return (
    <div className="max-w-2xl space-y-8">
      <NumberFormattingDemo />
      <hr />
      <CurrencyFormattingDemo />
      <hr />
      <DateTimeFormattingDemo />
      <hr />
      <RelativeTimeDemo />
      <hr />
      <ListFormattingDemo />
      <hr />
      <PluralizationDemo />
      <hr />
      <OrdinalsDemo />
      <hr />
      <RTLLayoutDemo />
    </div>
  );
}

export const AllExamples: Story = {
  render: () => <AllExamplesDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "A comprehensive showcase of all localization formatting patterns. Switch languages using the globe icon in the toolbar.",
      },
    },
  },
};
