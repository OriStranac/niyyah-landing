<script setup lang="ts">
const c = useCopy()
</script>

<template>
  <section class="section price" aria-labelledby="price-title">
    <div class="wrap">
      <div class="price__head">
        <p v-reveal class="kicker"><StarMark /> {{ c.pricing.kicker }}</p>
        <h2 id="price-title" v-reveal="60" class="h2">{{ c.pricing.title }}</h2>
        <p v-reveal="120" class="lead price__lead">{{ c.pricing.lead }}</p>
      </div>

      <div class="price__grid">
        <div v-reveal class="plan plan--free on-night">
          <h3 class="h3">{{ c.pricing.freeTitle }}</h3>
          <ul>
            <li v-for="f in c.pricing.free" :key="f"><Icon name="check" :size="18" /> {{ f }}</li>
          </ul>
        </div>
        <div v-reveal="100" class="plan plan--premium">
          <h3 class="h3">{{ c.pricing.premiumTitle }}</h3>
          <ul>
            <li v-for="f in c.pricing.premium" :key="f"><Icon name="plus" :size="18" /> {{ f }}</li>
          </ul>
          <p class="plan__extra">{{ c.pricing.extra }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.price__head {
  max-width: 44rem;
}

.price__head .h2 {
  margin-top: 1rem;
}

.price__lead {
  margin-top: 1.5rem;
  color: var(--ink-2);
}

.price__grid {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: 1rem;
  margin-top: clamp(2.5rem, 2rem + 2vw, 4rem);
  align-items: stretch;
}

.plan {
  padding: clamp(1.75rem, 1.2rem + 2vw, 3rem);
  border-radius: var(--radius-lg);
}

.plan ul {
  display: grid;
  gap: 0.85rem;
  margin-top: 1.6rem;
}

.plan li {
  display: grid;
  grid-template-columns: 1.4rem 1fr;
  gap: 0.6rem;
  align-items: start;
}

.plan li svg {
  margin-top: 0.2em;
}

.plan--free ul {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 1.5rem;
}

.plan--free svg {
  color: var(--gold);
}

.plan--premium {
  border: 1px solid var(--line);
}

.plan--premium svg {
  color: var(--gold-deep);
}

.plan__extra {
  margin-top: 1.6rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--line);
  font-size: var(--fs-small);
  color: var(--ink-3);
}

@media (max-width: 900px) {
  .price__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .plan--free ul {
    grid-template-columns: 1fr;
  }
}
</style>
