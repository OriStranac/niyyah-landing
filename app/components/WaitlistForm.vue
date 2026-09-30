<script setup lang="ts">
const props = defineProps<{ tone?: 'night' | 'day' }>()
const c = useCopy()
const { locale } = useI18n()
const { waitlistEndpoint } = useRuntimeConfig().public
const id = useId()

const email = ref('')
const trap = ref('') // honeypot za botove
const state = ref<'idle' | 'sending' | 'done' | 'error'>('idle')
const message = ref('')

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

async function submit() {
  if (state.value === 'sending') return
  if (trap.value) {
    state.value = 'done'
    return
  }
  if (!EMAIL.test(email.value.trim())) {
    state.value = 'error'
    message.value = c.value.cta.invalid
    return
  }
  if (!waitlistEndpoint) {
    state.value = 'error'
    message.value = c.value.cta.notConnected
    return
  }
  state.value = 'sending'
  try {
    await $fetch(waitlistEndpoint, {
      method: 'POST',
      body: { email: email.value.trim(), locale: locale.value },
    })
    state.value = 'done'
  } catch {
    state.value = 'error'
    message.value = c.value.cta.error
  }
}
</script>

<template>
  <div class="wl" :class="`wl--${props.tone ?? 'night'}`">
    <p v-if="state === 'done'" class="wl__done" role="status">
      <Icon name="check" :size="20" />
      {{ c.cta.success }}
    </p>
    <form v-else class="wl__form" novalidate @submit.prevent="submit">
      <label :for="`${id}-email`" class="sr-only">{{ c.cta.emailLabel }}</label>
      <Icon class="wl__icon" name="mail" :size="20" />
      <input
        :id="`${id}-email`"
        v-model="email"
        class="wl__input"
        type="email"
        inputmode="email"
        autocomplete="email"
        spellcheck="false"
        :placeholder="c.cta.emailPlaceholder"
        :aria-invalid="state === 'error' ? 'true' : undefined"
        :aria-describedby="`${id}-msg`"
        required
        @input="state === 'error' && (state = 'idle')"
      />
      <input v-model="trap" class="wl__trap" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" />
      <button class="btn btn--gold wl__btn" type="submit" :disabled="state === 'sending'">
        <span>{{ state === 'sending' ? c.cta.sending : c.cta.waitlist }}</span>
        <Icon name="arrow" :size="18" />
      </button>
    </form>
    <p :id="`${id}-msg`" class="wl__msg" :class="{ 'is-error': state === 'error' }" aria-live="polite">
      {{ state === 'error' ? message : state === 'done' ? '' : c.cta.privacy }}
    </p>
  </div>
</template>

<style scoped>
.wl {
  width: 100%;
  max-width: 540px;
}

.wl__form {
  position: relative;
  display: flex;
  /* Bez ovoga se djeca rastežu po visini, pa ikona koverte stoji razvučena
     uz vrh umjesto poravnata s tekstom. */
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem;
  border-radius: 999px;
  background: oklch(1 0 0 / 0.06);
  box-shadow: inset 0 0 0 1px var(--night-line);
  transition: box-shadow 200ms ease;
}

/* Sjaj koji obilazi obrub, kao na karticama u Otkrij ekranu aplikacije.
   Konusni gradijent se vrti, a maska ostavlja samo prsten širine 1 px —
   tako svjetlo putuje rubom umjesto da preko njega stoji druga linija. */
.wl__form::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  padding: 1px;
  background: conic-gradient(
    from var(--sheen),
    transparent 0deg,
    transparent 200deg,
    oklch(0.76 0.105 82 / 0.5) 260deg,
    oklch(0.9 0.07 85) 295deg,
    oklch(0.76 0.105 82 / 0.5) 330deg,
    transparent 360deg
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  animation: wl-sheen 4.5s linear infinite;
  pointer-events: none;
}

/* Sadržaj iznad prstena. */
.wl__icon,
.wl__input,
.wl__btn {
  position: relative;
  z-index: 1;
}

@keyframes wl-sheen {
  to {
    --sheen: 360deg;
  }
}

/* Ukras; ko ga je isključio, ne treba ga dobiti. */
@media (prefers-reduced-motion: reduce) {
  .wl__form::before {
    animation: none;
  }
}

.wl__form:focus-within {
  box-shadow: inset 0 0 0 1px var(--gold);
}

.wl--day .wl__form {
  background: var(--paper);
  box-shadow: inset 0 0 0 1px var(--line);
}

.wl__icon {
  flex: none;
  margin-left: 1.15rem;
  color: var(--moon-3);
}

.wl__input {
  flex: 1;
  min-width: 0;
  padding: 0 1.1rem;
  border: 0;
  background: transparent;
  font-size: 1rem;
  outline: none;
}

.wl__input::placeholder {
  color: var(--moon-3);
}

.wl--day .wl__input::placeholder {
  color: var(--ink-3);
}

.wl__trap {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.wl__btn[disabled] {
  opacity: 0.75;
  cursor: progress;
}

.wl__msg {
  min-height: 1.5em;
  margin-top: 0.75rem;
  padding-inline: 1.1rem;
  font-size: var(--fs-small);
  color: var(--moon-3);
}

.wl--day .wl__msg {
  color: var(--ink-3);
}

.wl__msg.is-error {
  color: oklch(0.8 0.1 40);
}

.wl--day .wl__msg.is-error {
  color: oklch(0.5 0.15 30);
}

.wl__done {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 60px;
  padding: 0 1.2rem;
  border-radius: 999px;
  background: var(--gold-glow);
  color: var(--gold-soft);
  font-weight: 500;
  animation: wl-in 500ms var(--ease-out);
}

.wl--day .wl__done {
  background: var(--paper-2);
  color: var(--ink);
}

@keyframes wl-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
}

@media (max-width: 520px) {
  .wl__form {
    flex-direction: column;
    padding: 0;
    border-radius: 0;
    background: none;
    box-shadow: none;
  }
  .wl__form:focus-within {
    box-shadow: none;
  }
  .wl__icon {
  flex: none;
  margin-left: 1.15rem;
  color: var(--moon-3);
}

.wl__input {
    min-height: 54px;
    border-radius: 999px;
    background: oklch(1 0 0 / 0.06);
    box-shadow: inset 0 0 0 1px var(--night-line);
  }
  .wl--day .wl__icon {
  flex: none;
  margin-left: 1.15rem;
  color: var(--moon-3);
}

.wl__input {
    background: var(--paper);
    box-shadow: inset 0 0 0 1px var(--line);
  }
  .wl__input:focus {
    box-shadow: inset 0 0 0 1px var(--gold);
  }
  .wl__btn {
    width: 100%;
  }
  .wl__msg {
    padding-inline: 0.25rem;
  }
}
</style>
