export default {
  common: {
    appName: "Starter",
    loading: "جاري التحميل...",
    error: "حدث خطأ ما",
    retry: "حاول مرة أخرى",
  },
  home: {
    welcome: "مرحباً بك في {{appName}}",
    description: "قالب بداية متعدد المنصات",
  },
  actions: {
    save: "حفظ",
    cancel: "إلغاء",
    delete: "حذف",
    edit: "تعديل",
    submit: "إرسال",
    confirm: "تأكيد",
    learnMore: "اعرف المزيد",
  },
  components: {
    button: {
      primary: "الإجراء الرئيسي",
      secondary: "ثانوي",
      destructive: "حذف العنصر",
      outline: "مخطط",
      ghost: "شفاف",
      link: "عرض التفاصيل",
      disabled: "غير متاح",
    },
  },
} as const;
