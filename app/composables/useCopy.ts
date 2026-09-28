import { bs, type Copy } from '~/content/bs'
import { en } from '~/content/en'

const copies: Record<string, Copy> = { bs, en }

export function useCopy() {
  const { locale } = useI18n()
  return computed(() => copies[locale.value] ?? bs)
}
