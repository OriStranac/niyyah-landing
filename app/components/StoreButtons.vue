<script setup lang="ts">
// Službeni bedževi iz app/assets/images/ (badge-app-store, badge-google-play) imaju prednost;
// dok ih nema, prikazuju se dugmad u stilu stranice.
const c = useCopy()
const { appStoreUrl, googlePlayUrl, appLaunched } = useRuntimeConfig().public

// Dok aplikacije nema u trgovinama, kartice se vide ali ne vode nigdje —
// linkovi ne postoje, a dugme koje ne radi ne smije biti link: čitač ekrana
// bi ga najavio kao nešto što se može otvoriti.
const disabled = computed(() => !appLaunched)
const appStoreBadge = useShot('badge-app-store')
const playBadge = useShot('badge-google-play')

// Na telefonu prvo ide trgovina tog telefona.
const android = ref(false)
onMounted(() => {
  android.value = /android/i.test(navigator.userAgent)
})

const stores = computed(() => {
  const list = [
    { key: 'ios', icon: 'apple', url: appStoreUrl, name: c.value.cta.appStore, badge: appStoreBadge.value },
    { key: 'android', icon: 'google-play', url: googlePlayUrl, name: c.value.cta.googlePlay, badge: playBadge.value },
  ]
  return android.value ? list.reverse() : list
})
</script>

<template>
  <div class="stores">
    <component
      :is="disabled ? 'span' : 'a'"
      v-for="(s, i) in stores"
      :key="s.key"
      class="store"
      :class="{
        'store--primary': i === 0 && !s.badge && !disabled,
        'store--disabled': disabled,
      }"
      :href="disabled ? undefined : s.url"
      :target="disabled ? undefined : '_blank'"
      :rel="disabled ? undefined : 'noopener'"
      :aria-disabled="disabled ? 'true' : undefined"
      :aria-label="disabled ? `${s.name} — ${c.cta.soon}` : `${c.cta.getOn} ${s.name}`"
    >
      <img v-if="s.badge" :src="s.badge" alt="" height="56" />
      <template v-else>
        <Icon :name="s.icon" :size="24" />
        <span class="store__text">
          <small>{{ c.cta.getOn }}</small>
          <b>{{ s.name }}</b>
        </span>
      </template>
    </component>
  </div>
</template>

<style scoped>
.stores {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.store {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 60px;
  padding: 0 1.5rem 0 1.25rem;
  border-radius: 16px;
  box-shadow: inset 0 0 0 1px var(--night-line);
  background: oklch(1 0 0 / 0.04);
  color: var(--moon);
  text-decoration: none;
  transition:
    transform 160ms var(--ease-out),
    background-color 200ms ease,
    box-shadow 200ms ease;
}

.store:active {
  transform: scale(0.97);
}

.store--primary {
  background: var(--gold);
  color: var(--night-950);
  box-shadow: none;
}

.store__text {
  display: grid;
  line-height: 1.15;
  text-align: left;
}

.store__text small {
  font-size: var(--fs-tiny);
  opacity: 0.8;
}

.store__text b {
  font-size: 1.15rem;
  font-weight: 500;
}

.store:has(img) {
  min-height: 0;
  padding: 0;
  background: none;
  box-shadow: none;
}

.store img {
  height: 56px;
  width: auto;
}

@media (hover: hover) and (pointer: fine) {
  .store:not(.store--primary):not(:has(img)):hover {
    background: oklch(1 0 0 / 0.09);
  }
  .store--primary:hover {
    background: var(--gold-soft);
  }
}

@media (max-width: 420px) {
  .store {
    flex: 1 1 100%;
    justify-content: center;
  }
}

/* Vidljivo, ali očito neaktivno: prigušeno i bez odziva na miš. Kartice su
   tu da se zna gdje će aplikacija biti, ne da se klikne. */
.store--disabled {
  opacity: 0.45;
  cursor: default;
  pointer-events: none;
  filter: grayscale(0.4);
}
</style>
