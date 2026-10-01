/**
 * Pristanak na mjerenje reklama.
 *
 * Pixel je alat za reklamiranje, ne dio stranice, pa u EU traži pristanak
 * prije nego se uopšte učita. Van EU ne traži, i tamo bi traka samo odbijala
 * ljude bez razloga — zato se pita samo onaj koga pravilo i štiti.
 *
 * Državu javlja sâm Cloudflare preko kojeg stranica ionako ide: `/cdn-cgi/
 * trace` vraća `loc=XX` s naše domene, bez trećeg servisa kojem bi IP adresa
 * posjetioca otišla samo da bismo ga razvrstali.
 *
 * Kad se ne zna odakle je čovjek — Cloudflare ne odgovori, mreža padne — pita
 * se. Nepoznato se tretira kao EU, jer je pogrešno pitati nekoga ko nije
 * morao biti pitan manja šteta od obrnutog.
 */

/** EU i EEA, uz Britaniju i Švicarsku koje imaju svoja ista pravila. */
const ASKS_FIRST = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
  'SI', 'ES', 'SE',
  'IS', 'LI', 'NO',
  'GB', 'CH',
])

const KEY = 'niyyah_consent'

export type ConsentState = 'checking' | 'asking' | 'granted' | 'denied'

export function useConsent() {
  const state = useState<ConsentState>('consent', () => 'checking')

  function remember(value: 'granted' | 'denied') {
    try {
      localStorage.setItem(KEY, value)
    } catch {
      // Privatni prozor ili blokirana pohrana: izbor vrijedi za ovu posjetu.
    }
    state.value = value
  }

  async function decide() {
    if (!import.meta.client || state.value !== 'checking') return

    let stored: string | null = null
    try {
      stored = localStorage.getItem(KEY)
    } catch {
      stored = null
    }
    if (stored === 'granted' || stored === 'denied') {
      state.value = stored
      return
    }

    try {
      const trace = await $fetch<string>('/cdn-cgi/trace', { responseType: 'text' })
      const loc = /(?:^|\n)loc=([A-Z]{2})/.exec(trace)?.[1]
      // Van EU pristanak nije uslov, pa se ne pita i ne pamti ništa: čovjek
      // koji doputuje u Njemačku bit će pitan tamo.
      state.value = loc && !ASKS_FIRST.has(loc) ? 'granted' : 'asking'
    } catch {
      state.value = 'asking'
    }
  }

  return {
    state,
    decide,
    grant: () => remember('granted'),
    deny: () => remember('denied'),
    /** Predomišljanje: veza u podnožju vraća traku. */
    reopen: () => {
      try {
        localStorage.removeItem(KEY)
      } catch {
        // Ništa: traka se ionako otvara ispod.
      }
      state.value = 'asking'
    },
  }
}
