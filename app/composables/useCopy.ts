import { bs, type Copy } from '~/content/bs'
import { en } from '~/content/en'

/**
 * Tekst stranice po jeziku.
 *
 * Prijevodi stižu jezik po jezik, pa se ono čega još nema uzima iz
 * bosanskog umjesto da nedostaje. Spajanje je duboko: jezik koji ima samo
 * navigaciju i hero prikazat će ih na svom jeziku, a ostatak na bosanskom —
 * ružnije nego potpun prijevod, ali stranica radi i ne pada na `undefined`
 * usred renderovanja.
 */
const partial: Record<string, unknown> = { bs, en }

function merge<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base
  if (Array.isArray(base) || typeof base !== 'object') return over as T

  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) }
  for (const [k, v] of Object.entries(over as Record<string, unknown>)) {
    out[k] = merge((base as Record<string, unknown>)[k], v)
  }
  return out as T
}

const cache = new Map<string, Copy>()

export function useCopy() {
  const { locale } = useI18n()
  return computed<Copy>(() => {
    const code = locale.value
    if (!cache.has(code)) {
      cache.set(code, code === 'bs' ? bs : merge(bs, partial[code]))
    }
    return cache.get(code)!
  })
}
