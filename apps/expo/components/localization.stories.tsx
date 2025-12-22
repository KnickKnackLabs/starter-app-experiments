import { isRtl } from "@starter/core/i18n";
import type { Meta, StoryObj } from "@storybook/react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nManager, Pressable, ScrollView, View } from "react-native";
import { Text } from "./ui/text";

/**
 * Get the flex direction that produces the correct visual layout for the current language.
 * This accounts for I18nManager.isRTL which persists until app restart.
 *
 * - If language RTL matches I18nManager.isRTL: use "row" (native handles it)
 * - If they don't match: use "row-reverse" to counteract native behavior
 */
function useFlexDirection(): "row" | "row-reverse" {
  const { i18n } = useTranslation();
  const languageIsRtl = isRtl(i18n.language);
  const nativeIsRtl = I18nManager.isRTL;

  // If native RTL matches language RTL, "row" works correctly
  // If they mismatch, we need "row-reverse" to counteract
  return languageIsRtl === nativeIsRtl ? "row" : "row-reverse";
}

const meta: Meta = {
  title: "Localization/Formatting Examples",
  decorators: [
    (StoryComponent) => (
      <ScrollView contentContainerStyle={{ padding: 16 }} style={{ flex: 1 }}>
        <StoryComponent />
      </ScrollView>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

// ============================================================================
// Number Formatting
// ============================================================================

function NumberFormattingDemo() {
  const { t, i18n } = useTranslation();
  const rtl = isRtl(i18n.language);

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Number Formatting</Text>
      <Text style={{ color: "#666", fontSize: 14 }}>
        Numbers are formatted according to the current locale (comma vs period,
        spacing, etc.)
      </Text>
      <View style={{ gap: 8 }}>
        <View
          style={{
            flexDirection: rtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#e0e0e0",
            paddingBottom: 8,
          }}
        >
          <Text style={{ color: "#666" }}>Basic number:</Text>
          <Text>{t("examples.numbers.basic", { val: 1_234_567 })}</Text>
        </View>
        <View
          style={{
            flexDirection: rtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#e0e0e0",
            paddingBottom: 8,
          }}
        >
          <Text style={{ color: "#666" }}>Percentage:</Text>
          <Text>{t("examples.numbers.percent", { val: 0.847 })}</Text>
        </View>
        <View
          style={{
            flexDirection: rtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#e0e0e0",
            paddingBottom: 8,
          }}
        >
          <Text style={{ color: "#666" }}>Compact notation:</Text>
          <Text>{t("examples.numbers.compact", { val: 2_500_000 })}</Text>
        </View>
      </View>
    </View>
  );
}

export const NumberFormatting: Story = {
  render: () => <NumberFormattingDemo />,
};

// ============================================================================
// Currency Formatting
// ============================================================================

function CurrencyFormattingDemo() {
  const { t, i18n } = useTranslation();
  const rtl = isRtl(i18n.language);

  const currencies = [
    { key: "usd", label: "USD (US Dollar)" },
    { key: "eur", label: "EUR (Euro)" },
    { key: "ils", label: "ILS (Israeli Shekel)" },
    { key: "sar", label: "SAR (Saudi Riyal)" },
    { key: "rub", label: "RUB (Russian Ruble)" },
  ];

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        Currency Formatting
      </Text>
      <Text style={{ color: "#666", fontSize: 14 }}>
        Currency symbols and positions vary by locale (e.g., $100 vs 100 €)
      </Text>
      <View style={{ gap: 8 }}>
        {currencies.map(({ key, label }) => (
          <View
            key={key}
            style={{
              flexDirection: rtl ? "row-reverse" : "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0",
              paddingBottom: 8,
            }}
          >
            <Text style={{ color: "#666" }}>{label}:</Text>
            <Text>
              {/* biome-ignore lint/suspicious/noExplicitAny: Dynamic key for demo */}
              {t(`examples.currency.${key}` as any, { val: 1234.56 })}
            </Text>
          </View>
        ))}
        <View
          style={{
            flexDirection: rtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#e0e0e0",
            paddingBottom: 8,
          }}
        >
          <Text style={{ color: "#666" }}>In context:</Text>
          <Text>{t("examples.currency.price", { val: 99.99 })}</Text>
        </View>
      </View>
    </View>
  );
}

export const CurrencyFormatting: Story = {
  render: () => <CurrencyFormattingDemo />,
};

// ============================================================================
// Date & Time Formatting
// ============================================================================

function DateTimeFormattingDemo() {
  const { t, i18n } = useTranslation();
  const rtl = isRtl(i18n.language);
  const now = new Date();

  const formats = [
    { key: "full", label: "Full date" },
    { key: "long", label: "Long date" },
    { key: "short", label: "Short date" },
    { key: "time", label: "Time only" },
  ];

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        Date & Time Formatting
      </Text>
      <Text style={{ color: "#666", fontSize: 14 }}>
        Date formats vary: MM/DD/YYYY (US) vs DD/MM/YYYY (EU)
      </Text>
      <View style={{ gap: 8 }}>
        {formats.map(({ key, label }) => (
          <View
            key={key}
            style={{
              flexDirection: rtl ? "row-reverse" : "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0",
              paddingBottom: 8,
            }}
          >
            <Text style={{ color: "#666" }}>{label}:</Text>
            <Text style={{ flexShrink: 1, textAlign: rtl ? "left" : "right" }}>
              {/* biome-ignore lint/suspicious/noExplicitAny: Dynamic key for demo */}
              {t(`examples.dates.${key}` as any, { val: now })}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export const DateTimeFormatting: Story = {
  render: () => <DateTimeFormattingDemo />,
};

// ============================================================================
// Relative Time
// ============================================================================

function RelativeTimeDemo() {
  const { t, i18n } = useTranslation();
  const rtl = isRtl(i18n.language);

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
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Relative Time</Text>
      <Text style={{ color: "#666", fontSize: 14 }}>
        Pass a number (negative for past, positive for future) with the unit in
        the translation string.
      </Text>
      <View style={{ gap: 8 }}>
        {relativeValues.map(({ label, key, val }) => (
          <View
            key={label}
            style={{
              flexDirection: rtl ? "row-reverse" : "row",
              justifyContent: "space-between",
              borderBottomWidth: 1,
              borderBottomColor: "#e0e0e0",
              paddingBottom: 8,
            }}
          >
            <Text style={{ color: "#666" }}>{label}:</Text>
            {/* biome-ignore lint/suspicious/noExplicitAny: Dynamic key for demo */}
            <Text>{t(key as any, { val })}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export const RelativeTime: Story = {
  render: () => <RelativeTimeDemo />,
};

// ============================================================================
// List Formatting
// ============================================================================

function ListFormattingDemo() {
  const { t, i18n } = useTranslation();
  const rtl = isRtl(i18n.language);

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>List Formatting</Text>
      <Text style={{ color: "#666", fontSize: 14 }}>
        List conjunctions vary: "A, B, and C" (EN) vs "A, B y C" (ES)
      </Text>
      <View style={{ gap: 8 }}>
        <View
          style={{
            flexDirection: rtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#e0e0e0",
            paddingBottom: 8,
          }}
        >
          <Text style={{ color: "#666" }}>Conjunction:</Text>
          <Text style={{ flexShrink: 1, textAlign: rtl ? "left" : "right" }}>
            {t("examples.lists.and", { val: ["Alice", "Bob", "Charlie"] })}
          </Text>
        </View>
        <View
          style={{
            flexDirection: rtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#e0e0e0",
            paddingBottom: 8,
          }}
        >
          <Text style={{ color: "#666" }}>Disjunction:</Text>
          <Text style={{ flexShrink: 1, textAlign: rtl ? "left" : "right" }}>
            {t("examples.lists.or", { val: ["A", "B", "C"] })}
          </Text>
        </View>
      </View>
    </View>
  );
}

export const ListFormatting: Story = {
  render: () => <ListFormattingDemo />,
};

// ============================================================================
// Pluralization
// ============================================================================

function CounterRow({
  label,
  count,
  setCount,
  translationKey,
  rtl,
}: {
  label: string;
  count: number;
  setCount: (n: number) => void;
  translationKey: string;
  rtl: boolean;
}) {
  const { t } = useTranslation();

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 8,
        padding: 12,
        gap: 8,
      }}
    >
      <View
        style={{
          flexDirection: rtl ? "row-reverse" : "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "500" }}>{label}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Pressable
            onPress={() => setCount(Math.max(0, count - 1))}
            style={{
              width: 32,
              height: 32,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 4,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>-</Text>
          </Pressable>
          <Text style={{ width: 32, textAlign: "center" }}>{count}</Text>
          <Pressable
            onPress={() => setCount(count + 1)}
            style={{
              width: 32,
              height: 32,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 4,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>+</Text>
          </Pressable>
        </View>
      </View>
      <Text style={{ fontSize: 16 }}>
        {/* biome-ignore lint/suspicious/noExplicitAny: Dynamic key for demo */}
        {t(translationKey as any, { count })}
      </Text>
    </View>
  );
}

function PluralizationDemo() {
  const { i18n } = useTranslation();
  const rtl = isRtl(i18n.language);
  const [notificationCount, setNotificationCount] = useState(0);
  const [itemCount, setItemCount] = useState(1);
  const [followerCount, setFollowerCount] = useState(5);

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Pluralization</Text>
      <Text style={{ color: "#666", fontSize: 14 }}>
        Different languages have different plural rules. English has 2 forms,
        Russian has 4, Arabic has 6.
      </Text>
      <View style={{ gap: 12 }}>
        <CounterRow
          count={notificationCount}
          label="Notifications"
          rtl={rtl}
          setCount={setNotificationCount}
          translationKey="examples.plurals.notifications"
        />
        <CounterRow
          count={itemCount}
          label="Cart Items"
          rtl={rtl}
          setCount={setItemCount}
          translationKey="examples.plurals.items"
        />
        <CounterRow
          count={followerCount}
          label="Followers"
          rtl={rtl}
          setCount={setFollowerCount}
          translationKey="examples.plurals.followers"
        />
      </View>
      <View
        style={{
          backgroundColor: "#f5f5f5",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#666", fontSize: 13 }}>
          Tip: Try Arabic to see all 6 plural forms (0, 1, 2, 3-10, 11-99, 100+)
        </Text>
      </View>
    </View>
  );
}

export const Pluralization: Story = {
  render: () => <PluralizationDemo />,
};

// ============================================================================
// Ordinals
// ============================================================================

function OrdinalsDemo() {
  const { t } = useTranslation();

  const positions = [1, 2, 3, 4, 11, 12, 13, 21, 22, 23];

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Ordinal Numbers</Text>
      <Text style={{ color: "#666", fontSize: 14 }}>
        Ordinals (1st, 2nd, 3rd) have special rules per language.
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {positions.map((pos) => (
          <View
            key={pos}
            style={{
              backgroundColor: "#f0f0f0",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
            }}
          >
            <Text style={{ fontSize: 14 }}>
              {t("examples.ordinals.place", { count: pos, ordinal: true })}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export const Ordinals: Story = {
  render: () => <OrdinalsDemo />,
};

// ============================================================================
// RTL Layout Demo
// ============================================================================

function RTLLayoutDemo() {
  const { t, i18n } = useTranslation();
  const rtl = isRtl(i18n.language);
  const flexDirection = useFlexDirection();

  return (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>RTL Layout</Text>
      <Text style={{ color: "#666", fontSize: 14 }}>
        Switch to Hebrew or Arabic to see the layout flip.
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#e0e0e0",
          borderRadius: 8,
          padding: 16,
          gap: 16,
        }}
      >
        {/* Navigation example */}
        <View
          style={{
            flexDirection,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "600" }}>{t("common.appName")}</Text>
          <View style={{ flexDirection, gap: 16 }}>
            <Text style={{ color: "#0066cc" }}>{t("actions.edit")}</Text>
            <Text style={{ color: "#0066cc" }}>{t("actions.learnMore")}</Text>
          </View>
        </View>

        {/* Card with actions */}
        <View
          style={{
            borderWidth: 1,
            borderColor: "#e0e0e0",
            borderRadius: 8,
            padding: 12,
            gap: 8,
          }}
        >
          <Text style={{ fontWeight: "500" }}>{t("home.description")}</Text>
          <Text style={{ color: "#666", fontSize: 13 }}>
            {t("common.lastUpdated", { val: -2 })}
          </Text>
          <View
            style={{
              flexDirection,
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 8,
            }}
          >
            <Pressable
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 6,
              }}
            >
              <Text>{t("actions.cancel")}</Text>
            </Pressable>
            <Pressable
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: "#0066cc",
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "#fff" }}>{t("actions.save")}</Text>
            </Pressable>
          </View>
        </View>

        {/* Progress indicator */}
        <View style={{ gap: 8 }}>
          <View
            style={{
              flexDirection,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 14 }}>{t("common.loading")}</Text>
            <Text style={{ fontSize: 14 }}>
              {t("examples.numbers.percent", { val: 0.75 })}
            </Text>
          </View>
          <View
            style={{
              height: 8,
              backgroundColor: "#e0e0e0",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: "75%",
                height: "100%",
                backgroundColor: "#0066cc",
                alignSelf: rtl ? "flex-end" : "flex-start",
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#f5f5f5",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#666", fontSize: 13 }}>
          Current direction:{" "}
          {rtl ? "RTL (Right-to-Left)" : "LTR (Left-to-Right)"}
        </Text>
      </View>
    </View>
  );
}

export const RTLLayout: Story = {
  render: () => <RTLLayoutDemo />,
};

// ============================================================================
// All Examples Combined
// ============================================================================

function AllExamplesDemo() {
  return (
    <View style={{ gap: 32 }}>
      <NumberFormattingDemo />
      <View style={{ height: 1, backgroundColor: "#e0e0e0" }} />
      <CurrencyFormattingDemo />
      <View style={{ height: 1, backgroundColor: "#e0e0e0" }} />
      <DateTimeFormattingDemo />
      <View style={{ height: 1, backgroundColor: "#e0e0e0" }} />
      <RelativeTimeDemo />
      <View style={{ height: 1, backgroundColor: "#e0e0e0" }} />
      <ListFormattingDemo />
      <View style={{ height: 1, backgroundColor: "#e0e0e0" }} />
      <PluralizationDemo />
      <View style={{ height: 1, backgroundColor: "#e0e0e0" }} />
      <OrdinalsDemo />
      <View style={{ height: 1, backgroundColor: "#e0e0e0" }} />
      <RTLLayoutDemo />
    </View>
  );
}

export const AllExamples: Story = {
  render: () => <AllExamplesDemo />,
};
