export default {
  common: {
    appName: "Starter",
    loading: "Загрузка...",
    error: "Что-то пошло не так",
    retry: "Попробовать снова",
  },
  home: {
    welcome: "Добро пожаловать в {{appName}}",
    description: "Кроссплатформенный стартовый шаблон",
  },
  actions: {
    save: "Сохранить",
    cancel: "Отмена",
    delete: "Удалить",
    edit: "Редактировать",
    submit: "Отправить",
    confirm: "Подтвердить",
    learnMore: "Подробнее",
  },
  components: {
    button: {
      primary: "Основное действие",
      secondary: "Вторичная",
      destructive: "Удалить элемент",
      outline: "Контурная",
      ghost: "Прозрачная",
      link: "Подробности",
      disabled: "Недоступно",
    },
  },
} as const;
