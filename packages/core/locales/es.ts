export default {
  common: {
    appName: "Starter",
    loading: "Cargando...",
    error: "Algo salió mal",
    retry: "Intentar de nuevo",
  },
  home: {
    welcome: "Bienvenido a {{appName}}",
    description: "Una plantilla inicial multiplataforma",
  },
  actions: {
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    submit: "Enviar",
    confirm: "Confirmar",
    learnMore: "Más información",
  },
  components: {
    button: {
      primary: "Acción Principal",
      secondary: "Secundario",
      destructive: "Eliminar Elemento",
      outline: "Contorno",
      ghost: "Fantasma",
      link: "Ver Detalles",
      disabled: "No Disponible",
    },
  },
} as const;
