<script setup lang="ts">
import heroShot from '~/assets/images/hero-discover.webp'

const c = useCopy()
const { appLaunched } = useRuntimeConfig().public

// "Brak, tražen s namjerom." → drugi dio naslova u zlatu
const title = computed(() => {
  const t = c.value.hero.title
  const i = t.indexOf(', ')
  return i === -1 ? { a: t, b: '' } : { a: t.slice(0, i + 1), b: t.slice(i + 2) }
})
</script>

<template>
  <section class="hero on-night" aria-labelledby="hero-title">
    <GeoPattern :opacity="0.12" />
    <div class="hero__glow" aria-hidden="true" />

    <div class="wrap hero__grid">
      <div class="hero__text">
        <h1 id="hero-title" class="display hero__title">
          {{ title.a }} <span>{{ title.b }}</span>
        </h1>
        <p class="lead hero__lead">{{ c.hero.lead }}</p>

        <div class="hero__cta">
          <PrimaryCta tone="night" />
        </div>

        <div class="hero__meta">
          <p>
            {{ c.hero.micro }}
            <template v-if="!appLaunched"><br />{{ c.cta.soon }}.</template>
          </p>
          <a href="#mahrem" class="link-arrow">
            {{ c.hero.secondary }}
            <Icon name="arrow" :size="16" />
          </a>
        </div>
      </div>

      <PhoneShot
        class="hero__visual"
        :src="heroShot"
        :alt="c.hero.imageAlt"
        :width="500"
        eager
        glow
      />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-top: calc(var(--hdr-h) + clamp(2.5rem, 1rem + 5vw, 6rem));
  padding-bottom: clamp(4rem, 2rem + 6vw, 8rem);
  background:
    radial-gradient(120% 80% at 80% 0%, var(--night-800) 0%, transparent 60%),
    var(--night-900);
}

.hero .geo {
  z-index: -1;
}

.hero__glow {
  position: absolute;
  top: 38%;
  right: 12%;
  z-index: -1;
  width: min(720px, 90vw);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, var(--gold-glow) 0%, transparent 65%);
  transform: translate(30%, -50%);
  animation: glow 7s ease-in-out infinite;
}

@keyframes glow {
  50% {
    opacity: 0.65;
  }
}

.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  align-items: center;
  gap: clamp(2.5rem, 5vw, 6rem);
}

.hero__title span {
  color: var(--gold);
}

.hero__lead {
  margin-top: clamp(1.4rem, 1rem + 1.2vw, 2.2rem);
  color: var(--moon-2);
  max-width: 34em;
}

.hero__cta {
  margin-top: clamp(2rem, 1.5rem + 1.5vw, 2.75rem);
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem 2rem;
  max-width: 540px;
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--night-line);
  font-size: var(--fs-small);
  color: var(--moon-3);
}

.hero__meta .link-arrow {
  color: var(--gold);
}

/* Učitavanje: tekst se slaže odozgo, telefon se diže malo kasnije. */
.hero__text > * {
  animation: rise 900ms var(--ease-out) both;
}
.hero__text > :nth-child(2) {
  animation-delay: 90ms;
}
.hero__text > :nth-child(3) {
  animation-delay: 180ms;
}
.hero__text > :nth-child(4) {
  animation-delay: 260ms;
}
.hero__visual {
  animation: rise-phone 1200ms var(--ease-out) 200ms both;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}

@keyframes rise-phone {
  from {
    opacity: 0;
    transform: translateY(48px) rotate(1.5deg);
  }
}

@media (max-width: 900px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }

}
</style>
