<script setup lang="ts">
const c = useCopy()

// "Aplikacije za upoznavanje nisu pravljene za brak." → sredina u zlatu,
// krajevi tamni, kao na mockupu. Dijeli se po prvoj i zadnjoj riječi.
const title = computed(() => {
  const words = c.value.problem.title.split(' ')
  return {
    head: words.slice(0, 2).join(' '),
    mid: words.slice(2, -1).join(' '),
    tail: words.at(-1) ?? '',
  }
})

<template>
  <section id="sadrzaj" class="section problem" aria-labelledby="problem-title">
    <div class="wrap">
      <p v-reveal class="problem__eyebrow">{{ c.problem.eyebrow }}</p>

      <div class="problem__top">
        <div>
          <h2 id="problem-title" v-reveal class="h2 problem__title">
            {{ title.head }} <span>{{ title.mid }}</span> {{ title.tail }}
          </h2>
          <svg v-reveal="60" class="problem__flourish" viewBox="0 0 320 12" aria-hidden="true">
            <path
              d="M4 8c40-5 80-6.5 120-4.5s78 5.5 118 2.5 58-4.5 78-5.5"
              fill="none"
              stroke="var(--gold)"
              stroke-width="2.2"
              stroke-linecap="round"
              opacity="0.75"
            />
          </svg>
        </div>
        <div v-reveal="120" class="problem__body">
          <p v-for="(p, i) in c.problem.body" :key="i" class="lead">{{ p }}</p>
        </div>
      </div>

      <div v-reveal class="problem__pains">
        <div class="problem__aside">
          <span class="problem__moon" aria-hidden="true">
            <Icon name="moon" :size="24" />
          </span>
          <p class="problem__label">{{ c.problem.painsLabel }}</p>
        </div>

        <ol>
          <li v-for="(p, i) in c.problem.pains" :key="i">
            <span class="problem__n" aria-hidden="true">0{{ i + 1 }}</span>
            <span class="problem__icon" aria-hidden="true">
              <Icon :name="c.problem.painIcons[i]" :size="19" />
            </span>
            <span>{{ p }}</span>
          </li>
        </ol>
      </div>

      <blockquote v-reveal class="problem__quote">
        <p>{{ c.problem.quote }}</p>
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
.problem__eyebrow {
  display: inline-block;
  margin: 0 0 clamp(1.4rem, 1rem + 1.4vw, 2.4rem);
  padding: 0.55rem 1.3rem;
  border: 1px solid var(--gold-glow);
  border-radius: 999px;
  color: var(--gold-deep);
  font-size: clamp(0.72rem, 0.79vw, 0.9rem);
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.problem__top {
  display: grid;
  grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
  gap: clamp(2rem, 5vw, 6rem);
  align-items: start;
}

/* Sredina naslova u zlatu, krajevi tamni. */
.problem__title span {
  color: var(--gold-deep);
}

.problem__flourish {
  display: block;
  width: min(100%, 320px);
  height: auto;
  margin-top: 0.4rem;
}

.problem__body {
  display: grid;
  gap: 1.2rem;
  padding-top: 0.6rem;
  color: var(--ink-2);
}

/* ── Kartica s pitanjima ─────────────────────────────────────────────── */
.problem__pains {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 9fr);
  gap: clamp(1.5rem, 1rem + 3vw, 3.5rem);
  align-items: center;
  margin-top: clamp(3rem, 2rem + 3vw, 5rem);
  padding: clamp(1.5rem, 1rem + 2vw, 2.75rem);
  border: 1px solid var(--line);
  border-radius: 24px;
  background: oklch(1 0 0 / 0.55);
}

.problem__aside {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.problem__moon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border: 1px solid var(--gold-glow);
  border-radius: 50%;
  color: var(--gold);
}

.problem__label {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--fs-h3);
  line-height: 1.15;
  color: var(--gold-deep);
}

.problem__pains ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

.problem__pains li {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 1rem;
  padding-block: 1.05rem;
  border-bottom: 1px solid var(--line);
  font-size: var(--fs-body);
  line-height: 1.45;
}

.problem__pains li:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.problem__pains li:first-child {
  padding-top: 0;
}

.problem__n {
  display: grid;
  place-items: center;
  min-width: 46px;
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: var(--fs-tiny);
  font-weight: 500;
  color: var(--ink-3);
  font-variant-numeric: tabular-nums;
}

.problem__icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--line);
  border-radius: 50%;
  color: var(--gold-deep);
}

/* ── Citat ───────────────────────────────────────────────────────────── */
.problem__quote {
  position: relative;
  max-width: 20em;
  margin: clamp(3.5rem, 2.5rem + 4vw, 6rem) auto 0;
  padding-left: 0.6em;
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 1.2rem + 2vw, 3rem);
  line-height: 1.16;
  letter-spacing: -0.01em;
  text-wrap: balance;
}

.problem__quote::before {
  content: '“';
  position: absolute;
  top: -0.42em;
  left: -0.42em;
  font-size: 2.6em;
  line-height: 1;
  color: var(--gold);
}

@media (max-width: 900px) {
  .problem__top,
  .problem__pains {
    grid-template-columns: 1fr;
  }

  .problem__aside {
    flex-direction: row;
    align-items: center;
  }

  .problem__pains li {
    grid-template-columns: auto 1fr;
    align-items: start;
  }

  /* Broj i ikona ne stanu oba uz tekst na uskom ekranu. */
  .problem__icon {
    display: none;
  }

  .problem__quote {
    margin-left: 0.5em;
  }
}
</style>
