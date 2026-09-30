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
        <div class="hero__scrim" />
        <div class="hero__note">
          <p>{{ c.cta.note }}</p>
          <svg class="hero__arrow" viewBox="0 0 120 80" aria-hidden="true">
            <path
              d="M104 8C80 10 44 20 24 44"
              fill="none"
              stroke="var(--gold-soft)"
              stroke-width="2.2"
              stroke-linecap="round"
            />
            <path
              d="M18 34l-2 14 14-4"
              fill="none"
              stroke="var(--gold-soft)"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
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
        <svg class="hero__flourish" viewBox="0 0 320 14" aria-hidden="true">
          <path
            d="M4 9.5c38-5.5 76-7 114-4.5s76 6.5 114 3.5 62-6 84-8"
            fill="none"
            stroke="url(#flourish)"
            stroke-width="2.4"
            stroke-linecap="round"
          />
          <defs>
            <linearGradient id="flourish" x1="0" x2="1">
              <stop offset="0" stop-color="oklch(0.76 0.105 82 / 0)" />
              <stop offset="0.25" stop-color="oklch(0.86 0.065 85 / 0.95)" />
              <stop offset="0.7" stop-color="oklch(0.76 0.105 82 / 0.7)" />
              <stop offset="1" stop-color="oklch(0.76 0.105 82 / 0)" />
            </linearGradient>
          </defs>
        </svg>
        <p class="lead hero__lead">{{ c.hero.lead }}</p>

        <div class="hero__cta">
          <PrimaryCta tone="night">
            <template #between>
              <ul class="hero__marks">
                <li v-for="m in c.cta.marks" :key="m.label">
                  <Icon :name="m.icon" :size="20" />
                  <span>{{ m.label }}</span>
                </li>
              </ul>
            </template>
          </PrimaryCta>
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
   telefon ostaju poravnati.
   Visina je ta koja određuje veličinu, ne širina: hero je zbog sadržaja
   viši od omjera 2:1, pa bi slika mjerena po širini bila prekratka i
   postolje bi ispalo ispod vidljivog dijela. Ovako slika uvijek pokrije
   visinu, a višak širine ide van ekrana. */
.hero__bg {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  height: 100%;
  width: auto;
  min-width: 100%;
  aspect-ratio: 1774 / 887;
  background-size: cover;
  background-position: center;
}

/* Ploha postolja ide od 82% (stražnji rub) do 93% (prednji) visine slike.
   Telefon stoji na njoj, bliže prednjem rubu — dno na 90%, kako je na
   mockupu, a ne na stražnjem rubu gdje sam ga prvo stavio. */
/* Tekst stoji na slici, a slika je oko luka i lampiona svijetla. Veo je
   jači s lijeve strane, gdje su naslov i forma, i gotovo ga nema desno gdje
   je telefon. */
.hero__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      100deg,
      oklch(0.165 0.034 272 / 0.82) 0%,
      oklch(0.165 0.034 272 / 0.62) 38%,
      oklch(0.165 0.034 272 / 0.18) 62%,
      transparent 78%
    ),
    linear-gradient(oklch(0.165 0.034 272 / 0.28), transparent 30%);
}

/* Bilješka desno od telefona, rukopisom. Ukras je i stoji izvan reda
   čitanja — aria-hidden nije potreban jer tekst nosi značenje, ali ne
   prekida ništa. */
.hero__note {
  position: absolute;
  left: 82%;
  top: 20%;
  width: 17%;
  color: var(--gold-soft);
}

.hero__note p {
  margin: 0;
  font-family: var(--font-hand);
  font-size: clamp(1.05rem, 1.24vw, 1.6rem);
  line-height: 1.25;
  white-space: pre-line;
  transform: rotate(-5deg);
}

/* Strelica ide od bilješke natrag ka telefonu, kao na mockupu. */
.hero__arrow {
  display: block;
  width: 58%;
  height: auto;
  margin: 0.15rem 0 0 -0.35rem;
}

@media (max-width: 900px) {
  .hero__note {
    display: none;
  }
}

.hero__phone {
  position: absolute;
  left: 70.5%;
  bottom: 10%;
  /* Render je u omjeru 2:3, pa širina određuje visinu: 25,5% širine daje
     vrh na oko 13% — tamo gdje je i na mockupu. */
  width: 25.5%;
  transform: translateX(-50%);
}

.hero__phone :deep(.shot__img) {
  width: 100%;
}

.hero__flourish {
  display: block;
  width: min(100%, 340px);
  height: auto;
  margin: 0.2rem 0 0;
}

.hero__marks {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}

.hero__marks li + li {
  padding-left: 1.1rem;
  margin-left: 1.1rem;
  border-left: 1px solid var(--night-line);
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
  padding: 0.55rem 1.3rem;
  font-size: clamp(0.72rem, 0.79vw, 0.9rem);
  border: 1px solid var(--gold-glow);
  border-radius: 999px;
  color: var(--gold);
  font-weight: 500;
  letter-spacing: 0.22em;
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
  grid-template-columns: minmax(0, 46fr) minmax(0, 54fr);
  align-items: center;
  gap: clamp(2.5rem, 5vw, 6rem);
}

.hero__title {
  font-size: clamp(2.5rem, 5.4vw, 6rem);
  line-height: 1.02;
}

.hero__title span {
  color: var(--gold);
}

.hero__lead {
  margin-top: clamp(1.4rem, 1rem + 1.2vw, 2.2rem);
  font-size: clamp(1.02rem, 1.07vw, 1.28rem);
  color: var(--moon-2);
  max-width: 30em;
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
