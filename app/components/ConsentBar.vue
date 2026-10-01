<script setup lang="ts">
/**
 * Pitanje o mjerenju reklama.
 *
 * Tanka traka uz donji rub, ne prekrivač preko stranice: čovjek koji je došao
 * s reklame treba moći pročitati zašto je došao, pa onda odlučiti. Oba dugmeta
 * izgledaju jednako — kad je jedno sivo a drugo zlatno, to više nije pitanje
 * nego navođenje, a pristanak koji je naveden ne vrijedi.
 */
const c = useCopy()
const { state, grant, deny } = useConsent()
</script>

<template>
  <Transition name="consent">
    <div v-if="state === 'asking'" class="consent" role="region" :aria-label="c.consent.label">
      <p class="consent__text">{{ c.consent.body }}</p>
      <div class="consent__actions">
        <button type="button" class="consent__btn" @click="deny">{{ c.consent.decline }}</button>
        <button type="button" class="consent__btn" @click="grant">{{ c.consent.accept }}</button>
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
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1.75rem);
  width: min(calc(100% - 1.5rem), 46rem);
  padding: 0.85rem 1.1rem;
  transform: translateX(-50%);
  border: 1px solid var(--night-line);
  border-radius: 16px;
  background: oklch(0.205 0.042 272 / 0.97);
  box-shadow: 0 16px 40px oklch(0.15 0.03 272 / 0.45);
  color: var(--moon-2);
}

.consent__text {
  flex: 1;
  margin: 0;
  font-size: var(--fs-small);
  line-height: 1.45;
}

.consent__actions {
  flex: none;
  display: flex;
  gap: 0.5rem;
}

/* Oba dugmeta jednako: razlika u izgledu bi bila navođenje. */
.consent__btn {
  min-height: 40px;
  padding: 0 1rem;
  border: 1px solid var(--gold-glow);
  border-radius: 999px;
  background: transparent;
  color: var(--moon);
  font: inherit;
  font-size: var(--fs-small);
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 180ms ease,
    border-color 180ms ease;
}

.consent__btn:hover,
.consent__btn:focus-visible {
  border-color: var(--gold);
  background: oklch(1 0 0 / 0.07);
}

.consent-enter-active,
.consent-leave-active {
  transition:
    opacity 260ms var(--ease-out),
    transform 260ms var(--ease-out);
}

.consent-enter-from,
.consent-leave-to {
  opacity: 0;
  transform: translate(-50%, 1rem);
}

/* Na uskom ekranu tekst ide iznad dugmadi, inače se oboje stisne u nečitko. */
@media (max-width: 640px) {
  .consent {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .consent__actions {
    justify-content: stretch;
  }

  .consent__btn {
    flex: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .consent-enter-active,
  .consent-leave-active {
    transition: none;
  }
}
</style>
