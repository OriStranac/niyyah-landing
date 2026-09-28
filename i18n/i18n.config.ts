// Tekstovi stranice žive u app/content/*.ts (tipizirani, bez vue-i18n sintakse).
// i18n modul ovdje služi za rute, hreflang i prebacivanje jezika.
export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'bs',
  messages: { bs: {}, en: {} },
}))
