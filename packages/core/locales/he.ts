export default {
  common: {
    appName: "Starter",
    loading: "טוען...",
    error: "משהו השתבש",
    retry: "נסה שוב",
  },
  home: {
    welcome: "ברוכים הבאים ל-{{appName}}",
    description: "תבנית התחלה חוצת פלטפורמות",
  },
  actions: {
    save: "שמור",
    cancel: "ביטול",
    delete: "מחק",
    edit: "ערוך",
    submit: "שלח",
    confirm: "אשר",
    learnMore: "למידע נוסף",
  },
  components: {
    button: {
      primary: "פעולה ראשית",
      secondary: "משני",
      destructive: "מחק פריט",
      outline: "מתאר",
      ghost: "שקוף",
      link: "צפה בפרטים",
      disabled: "לא זמין",
    },
  },
} as const;
