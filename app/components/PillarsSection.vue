<script setup lang="ts">
const c = useCopy()
</script>

<template>
  <section class="section pillars" aria-labelledby="pillars-title">
    <div class="wrap">
      <h2 id="pillars-title" v-reveal class="h2 pillars__title">{{ c.pillars.title }}</h2>
      <ol class="pillars__list">
        <li v-for="(p, i) in c.pillars.items" :key="p.word" v-reveal="i * 60" class="pillar">
          <p class="pillar__word" aria-hidden="true">{{ p.word }}</p>
          <div class="pillar__text">
            <h3 class="h3">{{ p.title }}</h3>
            <p>{{ p.body }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.pillars {
  padding-top: 0;
}

.pillars__title {
  max-width: 14em;
}

.pillars__list {
  margin-top: clamp(2.5rem, 2rem + 2vw, 4rem);
}

.pillar {
  display: grid;
  grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
  gap: 1rem clamp(2rem, 5vw, 6rem);
  align-items: end;
  padding-block: clamp(1.6rem, 1rem + 2vw, 2.6rem);
  border-top: 1px solid var(--line);
}

.pillar:last-child {
  border-bottom: 1px solid var(--line);
}

.pillar__word {
  font-family: var(--font-display);
  font-size: clamp(3rem, 1.6rem + 6vw, 7.5rem);
  line-height: 0.9;
  letter-spacing: -0.03em;
  color: var(--night-900);
  transition: color 400ms ease;
}

.pillar:nth-child(2) .pillar__word {
  color: var(--gold-deep);
}

.pillar__text {
  display: grid;
  gap: 0.55rem;
  max-width: 34em;
  color: var(--ink-2);
}

.pillar__text h3 {
  color: var(--ink);
}

@media (max-width: 800px) {
  .pillar {
    grid-template-columns: 1fr;
  }
}
</style>
