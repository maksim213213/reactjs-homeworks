// Translation dictionaries for the app.
// English is the source of truth: its shape defines `Translation`,
// and every other locale must satisfy that exact shape.

export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
] as const;

export type Language = (typeof LANGUAGES)[number]['code'];

export const DEFAULT_LANGUAGE: Language = 'en';

const en = {
  header: {
    home: 'Home',
    menu: 'Menu',
    order: 'Order',
    login: 'Login',
    logout: 'Logout',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    selectLanguage: 'Select language',
  },
  hero: {
    titleBefore: 'Beautiful food & takeaway,',
    titleHighlight: 'delivered',
    titleAfter: 'to your door.',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.",
    placeOrder: 'Place an Order',
    ratingOutOf: 'out of 5',
    reviews: 'based on 2000+ reviews',
  },
  footer: {
    tagline: 'Takeaway & Delivery template for small - medium businesses.',
    company: 'Company',
    home: 'Home',
    order: 'Order',
    faq: 'FAQ',
    template: 'Template',
    styleGuide: 'Style Guide',
    changelog: 'Changelog',
    licence: 'Licence',
    webflowUniversity: 'Webflow University',
    flowbase: 'Flowbase',
    moreCloneables: 'More Cloneables',
    builtBy: 'Built by',
    poweredBy: 'Powered by',
  },
};

// The shape every locale must implement.
export type Translation = typeof en;

const uk: Translation = {
  header: {
    home: 'Головна',
    menu: 'Меню',
    order: 'Замовлення',
    login: 'Увійти',
    logout: 'Вийти',
    switchToLight: 'Перемкнути на світлу тему',
    switchToDark: 'Перемкнути на темну тему',
    selectLanguage: 'Вибрати мову',
  },
  hero: {
    titleBefore: 'Смачна їжа та страви на виніс,',
    titleHighlight: 'доставлені',
    titleAfter: 'прямо до ваших дверей.',
    description:
      'Lorem Ipsum — це проста модель тексту, що використовується в друкарській та поліграфічній індустрії. Lorem Ipsum є стандартним зразком тексту ще з 1500 року.',
    placeOrder: 'Зробити замовлення',
    ratingOutOf: 'з 5',
    reviews: 'на основі 2000+ відгуків',
  },
  footer: {
    tagline: 'Шаблон доставки та страв на виніс для малого та середнього бізнесу.',
    company: 'Компанія',
    home: 'Головна',
    order: 'Замовлення',
    faq: 'Питання',
    template: 'Шаблон',
    styleGuide: 'Гайд зі стилю',
    changelog: 'Список змін',
    licence: 'Ліцензія',
    webflowUniversity: 'Webflow University',
    flowbase: 'Flowbase',
    moreCloneables: 'Більше шаблонів',
    builtBy: 'Створено',
    poweredBy: 'На основі',
  },
};

const es: Translation = {
  header: {
    home: 'Inicio',
    menu: 'Menú',
    order: 'Pedido',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    switchToLight: 'Cambiar a tema claro',
    switchToDark: 'Cambiar a tema oscuro',
    selectLanguage: 'Seleccionar idioma',
  },
  hero: {
    titleBefore: 'Comida deliciosa y para llevar,',
    titleHighlight: 'entregada',
    titleAfter: 'en tu puerta.',
    description:
      'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500.',
    placeOrder: 'Hacer un pedido',
    ratingOutOf: 'de 5',
    reviews: 'basado en más de 2000 reseñas',
  },
  footer: {
    tagline: 'Plantilla de comida para llevar y entrega para pequeñas y medianas empresas.',
    company: 'Empresa',
    home: 'Inicio',
    order: 'Pedido',
    faq: 'Preguntas',
    template: 'Plantilla',
    styleGuide: 'Guía de estilo',
    changelog: 'Registro de cambios',
    licence: 'Licencia',
    webflowUniversity: 'Webflow University',
    flowbase: 'Flowbase',
    moreCloneables: 'Más plantillas',
    builtBy: 'Creado por',
    poweredBy: 'Desarrollado con',
  },
};

export const translations: Record<Language, Translation> = { en, uk, es };
