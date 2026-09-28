<script setup lang="ts">
const c = useCopy()
</script>

<template>
  <section id="kako" class="section how" aria-labelledby="how-title">
    <div class="wrap">
      <p v-reveal class="kicker"><StarMark /> {{ c.how.kicker }}</p>
      <h2 id="how-title" v-reveal="60" class="h2 how__title">{{ c.how.title }}</h2>

      <ol class="how__steps">
        <li v-for="(s, i) in c.how.steps" :key="i" v-reveal="i * 90" class="step">
          <span class="step__n" aria-hidden="true">{{ i + 1 }}</span>
          <h3 class="h3">{{ s.title }}</h3>
          <p>{{ s.body }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.how {
  background: var(--paper-2);
}

.how__title {
  margin-top: 1rem;
  max-width: 12em;
}

.how__steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2.5rem clamp(1.25rem, 2.5vw, 2.5rem);
  margin-top: clamp(3rem, 2rem + 3vw, 5rem);
}

/* linija koja spaja brojeve */
.how__steps::before {
  content: '';
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  height: 1px;
  background: var(--line);
}

.step {
  position: relative;
  display: grid;
  align-content: start;
  gap: 0.6rem;
}

.step__n {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  margin-bottom: 0.9rem;
  border-radius: 50%;
  background: var(--night-900);
  color: var(--gold);
  font-family: var(--font-display);
  font-size: 1.35rem;
  box-shadow: 0 0 0 8px var(--paper-2);
}

.step:last-child .step__n {
  background: var(--gold);
  color: var(--night-950);
}

.step p {
  color: var(--ink-2);
}

@media (max-width: 900px) {
  .how__steps {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .how__steps::before {
    top: 1.5rem;
    bottom: 1.5rem;
    left: 1.5rem;
    right: auto;
    width: 1px;
    height: auto;
  }
  .step {
    grid-template-columns: 3rem 1fr;
    column-gap: 1.25rem;
  }
  .step__n {
    grid-row: span 2;
    margin-bottom: 0;
  }
}
</style>
