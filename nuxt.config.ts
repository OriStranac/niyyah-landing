import { existsSync } from 'node:fs'

const siteUrl = 'https://www.niyyahmarriage.com'

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
      // true kad je aplikacija u trgovinama: CTA postaje "Preuzmi Niyyah" + bedževi
      appLaunched: false,
      appStoreUrl: '',
      googlePlayUrl: '',
      // POST { email, locale } za listu čekanja; postavi NUXT_PUBLIC_WAITLIST_ENDPOINT
      waitlistEndpoint: '',
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
