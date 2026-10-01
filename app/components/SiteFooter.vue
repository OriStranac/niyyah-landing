<script setup lang="ts">
const c = useCopy()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="ftr">
    <div class="wrap ftr__row">
      <div class="ftr__brand">
        <img
          src="/logo.webp"
          alt="Niyyah"
          width="1323"
          height="1189"
          loading="lazy"
        />
        <div>
          <p>{{ c.footer.tagline }}</p>
        </div>
      </div>

      <nav class="ftr__langs" :aria-label="c.footer.language">
        <NuxtLink
          v-for="l in locales"
          :key="l.code"
          :to="switchLocalePath(l.code)"
          :hreflang="l.language ?? l.code"
          :lang="l.language ?? l.code"
          :aria-current="l.code === locale ? 'true' : undefined"
        >
          {{ l.name }}
        </NuxtLink>
      </nav>
    </div>
    <div class="wrap ftr__bottom">
      <p>{{ c.footer.made }}</p>
      <p>© {{ year }} {{ c.footer.rights }}</p>
    </div>
  </footer>
</template>

<style scoped>
.ftr {
  padding-block: 3.5rem 2rem;
  background: var(--night-950);
  color: var(--moon-2);
  font-size: var(--fs-small);
}

.ftr__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.ftr__brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ftr__brand img {
  width: auto;
  height: 124px;
}

.ftr__langs {
  display: flex;
  gap: 0.5rem;
}

.ftr__langs a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 1rem;
  border-radius: 999px;
  border: 1px solid var(--night-line);
  text-decoration: none;
  transition:
    color 200ms ease,
    border-color 200ms ease;
}

.ftr__langs a:hover {
  color: var(--moon);
}

.ftr__langs a[aria-current] {
  border-color: var(--gold);
  color: var(--gold);
}

.ftr__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 2rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--night-line);
  color: var(--moon-3);
}
</style>
