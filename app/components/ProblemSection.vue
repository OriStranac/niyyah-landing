<script setup lang="ts">
const c = useCopy()
</script>

<template>
  <section id="sadrzaj" class="section problem" aria-labelledby="problem-title">
    <div class="wrap">
      <div class="problem__top">
        <h2 id="problem-title" v-reveal class="h2">{{ c.problem.title }}</h2>
        <div v-reveal="120" class="problem__body">
          <p v-for="(p, i) in c.problem.body" :key="i" class="lead">{{ p }}</p>
        </div>
      </div>

      <div class="problem__pains">
        <p v-reveal class="problem__label">{{ c.problem.painsLabel }}</p>
        <ol>
          <li v-for="(p, i) in c.problem.pains" :key="i" v-reveal="i * 80">
            <span class="problem__n" aria-hidden="true">0{{ i + 1 }}</span>
            {{ p }}
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
.problem__top {
  display: grid;
  grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
  gap: clamp(2rem, 5vw, 6rem);
  align-items: start;
}

.problem__body {
  display: grid;
  gap: 1.2rem;
  padding-top: 0.6rem;
  color: var(--ink-2);
}

.problem__pains {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 8fr);
  gap: 1rem clamp(2rem, 5vw, 6rem);
  margin-top: clamp(4rem, 3rem + 4vw, 7rem);
}

.problem__label {
  font-family: var(--font-display);
  font-size: var(--fs-h3);
  color: var(--gold-deep);
}

.problem__pains li {
  display: grid;
  grid-template-columns: 3rem 1fr;
  align-items: baseline;
  padding-block: 1.15rem;
  border-top: 1px solid var(--line);
  font-size: var(--fs-lead);
  line-height: 1.45;
}

.problem__pains li:last-child {
  border-bottom: 1px solid var(--line);
}

.problem__n {
  font-size: var(--fs-tiny);
  font-weight: 500;
  color: var(--ink-3);
  font-variant-numeric: tabular-nums;
}

.problem__quote {
  position: relative;
  max-width: 22em;
  margin: clamp(5rem, 3rem + 6vw, 9rem) 0 0 auto;
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 1.2rem + 2vw, 3rem);
  line-height: 1.16;
  letter-spacing: -0.01em;
  text-wrap: balance;
}

.problem__quote::before {
  content: '“';
  position: absolute;
  top: -0.35em;
  left: -0.55em;
  font-size: 2.4em;
  line-height: 1;
  color: var(--gold);
}

@media (max-width: 800px) {
  .problem__top,
  .problem__pains {
    grid-template-columns: 1fr;
  }
  .problem__quote {
    margin-left: 0.6em;
  }
}
</style>
