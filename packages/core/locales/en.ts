export default {
  common: {
    appName: "Starter",
    loading: "Loading...",
    error: "Something went wrong",
    retry: "Try again",
    lastUpdated: "Last updated {{val, relativetime(hour)}}",
  },
  home: {
    welcome: "Welcome to {{appName}}",
    description: "A cross-platform starter template",
  },
  nav: {
    home: "Home",
  },
  actions: {
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    submit: "Submit",
    confirm: "Confirm",
    learnMore: "Learn more",
  },
  components: {
    button: {
      primary: "Primary Action",
      secondary: "Secondary",
      destructive: "Delete Item",
      outline: "Outline",
      ghost: "Ghost",
      link: "View Details",
      disabled: "Unavailable",
    },
  },
  // Localization examples for Storybook
  examples: {
    numbers: {
      basic: "{{val, number}} users",
      percent: "{{val, number(style: 'percent')}} complete",
      compact: "{{val, number(notation: 'compact')}} followers",
    },
    currency: {
      usd: "{{val, currency(USD)}}",
      eur: "{{val, currency(EUR)}}",
      ils: "{{val, currency(ILS)}}",
      sar: "{{val, currency(SAR)}}",
      rub: "{{val, currency(RUB)}}",
      price: "Total: {{val, currency(USD)}}",
    },
    dates: {
      full: "{{val, datetime(dateStyle: 'full')}}",
      long: "{{val, datetime(dateStyle: 'long')}}",
      short: "{{val, datetime(dateStyle: 'short')}}",
      time: "{{val, datetime(timeStyle: 'short')}}",
    },
    relative: {
      minutesAgo: "Updated: {{val, relativetime(minute)}}",
      hoursAgo: "Updated: {{val, relativetime(hour)}}",
      daysAgo: "Updated: {{val, relativetime(day)}}",
      weeksAgo: "Updated: {{val, relativetime(week)}}",
      inDays: "Expires: {{val, relativetime(day)}}",
      inMonths: "Expires: {{val, relativetime(month)}}",
    },
    lists: {
      and: "Shared with {{val, list}}",
      or: "Choose {{val, list(type: 'disjunction')}}",
    },
    plurals: {
      notifications_zero: "No notifications",
      notifications_one: "{{count}} notification",
      notifications_other: "{{count}} notifications",
      items_zero: "Your cart is empty",
      items_one: "{{count}} item in cart",
      items_other: "{{count}} items in cart",
      followers_zero: "No followers yet",
      followers_one: "{{count}} follower",
      followers_other: "{{count}} followers",
    },
    ordinals: {
      place_ordinal_one: "{{count}}st place",
      place_ordinal_two: "{{count}}nd place",
      place_ordinal_few: "{{count}}rd place",
      place_ordinal_other: "{{count}}th place",
    },
  },
} as const;
