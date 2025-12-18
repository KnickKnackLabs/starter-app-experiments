export default {
  common: {
    appName: "Starter",
    loading: "Loading...",
    error: "Something went wrong",
    retry: "Try again",
  },
  home: {
    welcome: "Welcome to {{appName}}",
    description: "A cross-platform starter template",
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
} as const;
