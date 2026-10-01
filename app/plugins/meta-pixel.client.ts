/**
 * Meta pixel (Facebook/Instagram).
 *
 * Tri stvari koje osnovni isječak s Mete ne radi, a ovoj stranici trebaju:
 *
 * Stranica je jednostranična aplikacija. Isječak okine `PageView` jednom, pri
 * učitavanju; promjena jezika ili skok na drugu adresu Meti izgleda kao da se
 * ništa nije desilo. Zato se `PageView` šalje i na svaku promjenu rute.
 *
 * Pixel radi samo u pregledaču. Fajl se zove `.client.ts` da ga `nuxt
 * generate` ne pokuša izvršiti pri građenju, gdje nema ni `window` ni posjete
 * koju bi prijavio.
 *
 * Broj pixela stoji u konfiguraciji, ne ovdje. Nije tajna — svako ko otvori
 * izvor stranice ga vidi — ali je podatak koji se mijenja, a ovo je kod.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const { metaPixelId } = useRuntimeConfig().public
  if (!metaPixelId) return

  // Isti isječak kao Metin, samo pisan tako da se može pročitati.
  const w = window as typeof window & { fbq?: FbqFn; _fbq?: FbqFn }
  if (!w.fbq) {
    const fbq: FbqFn = (...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod.apply(fbq, args)
      else fbq.queue.push(args)
    }
    fbq.queue = []
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.push = fbq
    w.fbq = fbq
    w._fbq ??= fbq

    const s = document.createElement('script')
    s.async = true
    s.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(s)
  }

  w.fbq!('init', metaPixelId)
  w.fbq!('track', 'PageView')

  // Promjena jezika ili skok na drugu adresu je nova posjeta za Metu.
  nuxtApp.$router.afterEach(() => w.fbq?.('track', 'PageView'))
})

type FbqFn = {
  (...args: unknown[]): void
  callMethod?: { apply: (ctx: unknown, args: unknown[]) => void }
  queue: unknown[][]
  loaded?: boolean
  version?: string
  push?: unknown
}
