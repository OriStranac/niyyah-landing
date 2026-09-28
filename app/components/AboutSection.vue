<script setup lang="ts">
const c = useCopy()
</script>

<template>
  <section class="section about" aria-labelledby="about-title">
    <div class="wrap about__wrap">
      <h2 id="about-title" v-reveal class="kicker"><StarMark /> {{ c.about.kicker }}</h2>
      <blockquote v-reveal="60" class="about__quote">
        <p>{{ c.about.quote }}</p>
      </blockquote>
      <div v-reveal="120" class="about__foot">
        <p>{{ c.about.small }}</p>
        <p class="about__made">{{ c.about.made }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: var(--paper-2);
}

.about__wrap {
  max-width: calc(64rem + var(--gutter) * 2);
}

.about__quote {
  margin-top: 1.5rem;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 1.15rem + 1.8vw, 2.7rem);
  line-height: 1.22;
  letter-spacing: -0.01em;
  text-wrap: pretty;
}

.about__foot {
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  gap: 1rem 3rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  color: var(--ink-2);
}

.about__made {
  color: var(--gold-deep);
  font-weight: 500;
}

@media (max-width: 700px) {
  .about__foot {
    grid-template-columns: 1fr;
  }
}
</style>
