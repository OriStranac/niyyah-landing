<script setup lang="ts">
import mark from '~/assets/images/mark.webp'

/**
 * Pitanje o mjerenju reklama.
 *
 * Kartica uz donji rub, ne prekrivač preko cijele stranice: čovjek koji je
 * došao s reklame treba moći pročitati zašto je došao, pa onda odlučiti.
 *
 * „Prihvatam" i „Ne hvala" su jednako široki, jedan ispod drugog, oba na
 * jedan klik. Razlikuju se samo ispunom, jer jedno jest naš prijedlog —
 * ali odbijanje nije sakriveno iza „postavki", nije manje, nije niže i ne
 * traži više klikova. Tu je granica između ponude i navođenja.
 *
 * „Šta ovo znači" se otvara na licu mjesta umjesto da vodi na stranicu koje
 * nema. Pravilo traži da čovjek zna šta pristaje prije nego pristane; veza
 * koja ga odvodi drugdje to ne ispunjava bolje od rečenice koja mu se otvori
 * pred očima.
 *
 * Iks znači „ne sada": pixel ostaje ugašen, ali se izbor ne pamti, pa se
 * pita opet sljedeći put. Zatvaranje prozora nije pristanak.
 */
const c = useCopy()
const { state, grant, deny, dismiss } = useConsent()
const open = ref(false)
</script>

<template>
  <Transition name="consent">
    <div
      v-if="state === 'asking'"
      class="consent"
      role="dialog"
      aria-modal="false"
      :aria-label="c.consent.label"
    >
      <div class="consent__head">
        <span class="consent__mark" aria-hidden="true">
          <img :src="mark" alt="" width="192" height="192" />
        </span>
        <button type="button" class="consent__x" :aria-label="c.consent.close" @click="dismiss">
          <Icon name="close" :size="18" />
        </button>
      </div>

      <h2 class="consent__title">{{ c.consent.title }}</h2>
      <p class="consent__text">{{ c.consent.body }}</p>

      <button type="button" class="consent__more" :aria-expanded="open" @click="open = !open">
        {{ c.consent.more }}
        <Icon name="arrow" :size="15" />
      </button>
      <p v-if="open" class="consent__details">{{ c.consent.details }}</p>

      <div class="consent__actions">
        <button type="button" class="consent__btn consent__btn--yes" @click="grant">
          {{ c.consent.accept }}
        </button>
        <button type="button" class="consent__btn" @click="deny">
          {{ c.consent.decline }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.consent {
  position: fixed;
  left: 50%;
  bottom: clamp(0.75rem, 2vw, 1.5rem);
  z-index: 70;
  width: min(calc(100% - 1.5rem), 23rem);
  padding: 1.1rem 1.15rem 1.15rem;
  transform: translateX(-50%);
  border: 1px solid var(--night-line);
  border-radius: 22px;
  background: oklch(0.205 0.042 272 / 0.98);
  box-shadow: 0 20px 50px oklch(0.12 0.03 272 / 0.55);
  color: var(--moon-2);
}

.consent__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.85rem;
}

/* Znak iz logotipa u prstenu — isto zlato kao i svuda drugdje na stranici. */
.consent__mark {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 1px solid var(--gold-glow);
  border-radius: 50%;
  overflow: hidden;
  background: var(--night-900);
}

.consent__mark img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.consent__x {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  margin: -0.25rem -0.25rem 0 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--moon-2);
  cursor: pointer;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}

.consent__x:hover,
.consent__x:focus-visible {
  background: oklch(1 0 0 / 0.07);
  color: var(--moon);
}

.consent__title {
  margin: 0 0 0.4rem;
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.2;
  color: var(--moon);
  text-wrap: balance;
}

.consent__text {
  margin: 0;
  font-size: var(--fs-small);
  line-height: 1.5;
}

.consent__more {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.7rem;
  padding: 0;
  border: 0;
  background: none;
  color: var(--gold);
  font: inherit;
  font-size: var(--fs-small);
  font-weight: 500;
  cursor: pointer;
}

.consent__more:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.consent__details {
  margin: 0.55rem 0 0;
  padding-top: 0.55rem;
  border-top: 1px solid var(--night-line);
  font-size: var(--fs-tiny);
  line-height: 1.5;
}

.consent__actions {
  display: grid;
  gap: 0.5rem;
  margin-top: 1.05rem;
}

/* Oba dugmeta pune širine i iste visine: odbijanje nije teže od pristanka. */
.consent__btn {
  min-height: 44px;
  padding: 0 1rem;
  border: 1px solid var(--night-line);
  border-radius: 999px;
  background: oklch(1 0 0 / 0.05);
  color: var(--moon);
  font: inherit;
  font-size: var(--fs-small);
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    filter 180ms ease;
}

.consent__btn:hover,
.consent__btn:focus-visible {
  border-color: var(--gold-glow);
  background: oklch(1 0 0 / 0.09);
}

.consent__btn--yes {
  border-color: transparent;
  background: linear-gradient(180deg, var(--gold) 0%, var(--gold-deep) 100%);
  color: var(--night-950);
  font-weight: 600;
}

.consent__btn--yes:hover,
.consent__btn--yes:focus-visible {
  border-color: transparent;
  background: linear-gradient(180deg, var(--gold) 0%, var(--gold-deep) 100%);
  filter: brightness(1.06);
}

.consent-enter-active,
.consent-leave-active {
  transition:
    opacity 280ms var(--ease-out),
    transform 280ms var(--ease-out);
}

.consent-enter-from,
.consent-leave-to {
  opacity: 0;
  transform: translate(-50%, 1.25rem);
}

/* Na širokom ekranu kartica stoji u uglu, ne po sredini: tamo je manje na
   putu sadržaju koji je čovjek došao pročitati. */
@media (min-width: 900px) {
  .consent {
    left: auto;
    right: clamp(1rem, 2.5vw, 2rem);
    transform: none;
  }

  .consent-enter-from,
  .consent-leave-to {
    transform: translateY(1.25rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .consent-enter-active,
  .consent-leave-active {
    transition: none;
  }
}
</style>
