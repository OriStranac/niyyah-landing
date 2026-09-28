// Slike iz app/assets/images/ se prepoznaju po imenu (vidi SLIKE.md).
// "mahrem-portal.en.webp" ima prednost na engleskoj verziji, inače "mahrem-portal.webp".
const files = import.meta.glob<string>('~/assets/images/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const byName: Record<string, string> = {}
for (const [path, url] of Object.entries(files)) {
  const base = path.split('/').pop()!.replace(/\.(png|jpe?g|webp|avif)$/i, '')
  byName[base] = url
}

export function useShot(name: string) {
  const { locale } = useI18n()
  return computed<string | null>(() => byName[`${name}.${locale.value}`] ?? byName[name] ?? null)
}
