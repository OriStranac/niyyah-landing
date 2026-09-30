<script setup lang="ts">
import heroBg from '~/assets/images/hero-bg.webp'
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
    <!-- Telefon je dijete same pozadine, ne sekcije: postolje je na 71%
         širine i 82% visine TE slike, pa postoci drže samo ako se oboje
         mjeri od iste kutije. Inače bi telefon klizio s postolja čim se
         promijeni omjer prozora. -->
    <div class="hero__stage" aria-hidden="true">
      <div class="hero__bg" :style="{ backgroundImage: `url(${heroBg})` }">
        <PhoneShot
          class="hero__phone"
          :src="heroShot"
          :alt="''"
          :width="330"
          eager
        />
      </div>
    </div>

    <div class="wrap hero__grid">
      <div class="hero__text">
        <p class="hero__eyebrow">{{ c.cta.eyebrow }}</p>
        <h1 id="hero-title" class="display hero__title">
          {{ title.a }} <span>{{ title.b }}</span>
        </h1>
        <p class="lead hero__lead">{{ c.hero.lead }}</p>

        <div class="hero__cta">
          <PrimaryCta tone="night" />
        </div>

        <ul class="hero__marks">
          <li v-for="m in c.cta.marks" :key="m.label">
            <Icon :name="m.icon" :size="20" />
            <span>{{ m.label }}</span>
          </li>
        </ul>

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

    </div>
  </section>
</template>

<style scoped>
.hero__stage {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

/* Kutija u omjeru same slike. Sve unutra mjeri se od nje, pa postolje i
   telefon ostaju poravnati na svakoj širini. */
.hero__bg {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: max(100%, 1240px);
  aspect-ratio: 1774 / 887;
  background-size: cover;
  background-position: center;
}

/* Ploha postolja ide od 82% (stražnji rub) do 93% (prednji) visine slike.
   Telefon stoji na njoj, bliže prednjem rubu — dno na 90%, kako je na
   mockupu, a ne na stražnjem rubu gdje sam ga prvo stavio. */
.hero__phone {
  position: absolute;
  left: 70.5%;
  bottom: 10%;
  width: 28%;
  transform: translateX(-50%);
}

.hero__phone :deep(.shot__img) {
  width: 100%;
}

.hero__marks {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 1.4rem;
  margin: 1.4rem 0 0;
  padding: 0;
  list-style: none;
}

.hero__marks li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: var(--fs-small);
  line-height: 1.3;
  color: var(--moon-2);
}

.hero__marks li :deep(svg) {
  flex: none;
  padding: 0.5rem;
  box-sizing: content-box;
  border: 1px solid var(--night-line);
  border-radius: 50%;
  color: var(--gold);
}

.hero__eyebrow {
  display: inline-block;
  margin: 0 0 1.1rem;
  padding: 0.5rem 1.1rem;
  border: 1px solid var(--gold-glow);
  border-radius: 999px;
  color: var(--gold);
  font-size: var(--fs-small);
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-top: calc(var(--hdr-h) + clamp(2.5rem, 1rem + 5vw, 6rem));
  padding-bottom: clamp(4rem, 2rem + 6vw, 8rem);
  background:
    radial-gradient(120% 80% at 80% 0%, oklch(0.255 0.05 272 / 0.35) 0%, transparent 60%),
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
