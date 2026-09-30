import { existsSync } from 'node:fs'

const siteUrl = 'https://www.niyyahmarriage.com'

// Linkovi na Niyyah u trgovinama, npr.
//   https://apps.apple.com/app/niyyah/id1234567890
//   https://play.google.com/store/apps/details?id=com.niyyah.app
const appStoreUrl = ''
const googlePlayUrl = ''

// true: CTA je „Preuzmi Niyyah" + dugmad trgovina. false: lista čekanja.
const appLaunched = false

// Build pada ako se tvrdi da je aplikacija izašla, a linkovi su prazni — to bi
// bila dugmad koja ne vode nigdje. Dok je appLaunched false nema ni dugmadi,
// pa ni šta da pukne: CTA je lista čekanja. Kad se prebaci na true, brana traži
// linkove.
const isBuild = process.argv.some((a) => a === 'build' || a === 'generate')
if (isBuild && appLaunched && (!appStoreUrl || !googlePlayUrl)) {
  throw new Error('Upiši appStoreUrl i googlePlayUrl na vrhu nuxt.config.ts prije builda.')
}

// Ako postoji public/og-image.jpg koristi se on, inače logo (vidi SLIKE.md).
const ogImage = existsSync('public/og-image.jpg') ? '/og-image.jpg' : '/favicon-512.jpg'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  devtools: { enabled: false },

  modules: ['@nuxtjs/i18n', '@nuxtjs/sitemap', '@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  site: {
    url: siteUrl,
    name: 'Niyyah',
  },

  runtimeConfig: {
    public: {
      siteUrl,
      ogImage,
      appLaunched,
      appStoreUrl,
      googlePlayUrl,
      // Lista čekanja: POST { email, locale } → 202. Backend upisuje adresu i
      // prikazuje je u admin portalu; duplikat je uspjeh, ne greška.
      waitlistEndpoint: 'https://api.niyyahmarriage.com/api/waitlist',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'bs' },
      meta: [
        { name: 'theme-color', content: '#12162b' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'apple-touch-icon', href: '/favicon-512.jpg' },
      ],
    },
  },

  i18n: {
    baseUrl: siteUrl,
    strategy: 'prefix_except_default',
    defaultLocale: 'bs',
    locales: [
      { code: 'bs', language: 'bs-BA', name: 'Bosanski' },
      { code: 'en', language: 'en', name: 'English' },
      { code: 'de', language: 'de', name: 'Deutsch' },
      { code: 'tr', language: 'tr', name: 'Türkçe' },
      { code: 'fr', language: 'fr', name: 'Français' },
      { code: 'id', language: 'id', name: 'Bahasa Indonesia' },
      { code: 'ms', language: 'ms', name: 'Bahasa Melayu' },
      // Pišu se zdesna nalijevo; dir ide u <html> preko useHead u app.vue.
      { code: 'ar', language: 'ar', name: 'العربية', dir: 'rtl' },
      { code: 'ur', language: 'ur', name: 'اردو', dir: 'rtl' },
    ],
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts',
  },

  fonts: {
    defaults: {
      subsets: ['latin', 'latin-ext'],
    },
    families: [
      { name: 'Gloock', provider: 'google', weights: [400] },
      { name: 'Jost', provider: 'google', weights: [400, 500] },
      { name: 'Amiri', provider: 'google', weights: [400], subsets: ['arabic'] },
      // Za bilješku uz telefon — jedino mjesto gdje se koristi rukopis.
      { name: 'Caveat', provider: 'google', weights: [500] },
    ],
  },

  sitemap: {
    autoI18n: true,
  },

  nitro: {
    prerender: {
      routes: ['/', '/en'],
      crawlLinks: true,
    },
  },
})
