// v-reveal: element se lagano pojavi kad uđe u ekran. Bez JS-a (SSR) sadržaj je vidljiv.
export default defineNuxtPlugin((nuxtApp) => {
  let io: IntersectionObserver | null = null

  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.9) return // već vidljivo, ne skrivaj

      io ??= new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue
            e.target.classList.add('is-in')
            io!.unobserve(e.target)
          }
        },
        { rootMargin: '0px 0px -12% 0px' },
      )
      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      el.classList.add('reveal')
      io.observe(el)
    },
    unmounted(el: HTMLElement) {
      io?.unobserve(el)
    },
  })
})
