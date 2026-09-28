<script setup lang="ts">
const c = useCopy()
</script>

<template>
  <section id="sigurnost" class="section safety" aria-labelledby="safety-title">
    <div class="wrap safety__grid">
      <div class="safety__head">
        <p v-reveal class="kicker"><StarMark /> {{ c.safety.kicker }}</p>
        <h2 id="safety-title" v-reveal="60" class="h2 safety__title">{{ c.safety.title }}</h2>
        <p v-reveal="120" class="lead safety__lead">{{ c.safety.lead }}</p>

        <figure v-reveal="160" class="ayah on-night">
          <p class="ar ayah__ar" lang="ar" dir="rtl">بَلَىٰ قَادِرِينَ عَلَىٰٓ أَن نُّسَوِّيَ بَنَانَهُۥ</p>
          <figcaption>
            <span class="ayah__ref">{{ c.safety.ayahRef }}</span>
            {{ c.safety.ayahNote }}
          </figcaption>
        </figure>
      </div>

      <ul class="safety__list">
        <li v-for="(it, i) in c.safety.items" :key="it.title" v-reveal="i * 50" class="sitem">
          <span class="sitem__icon"><Icon :name="it.icon" :size="22" /></span>
          <div>
            <h3>{{ it.title }}</h3>
            <p>{{ it.body }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.safety__grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  gap: clamp(3rem, 7vw, 8rem);
  align-items: start;
}

.safety__head {
  position: sticky;
  top: 110px;
}

.safety__title {
  margin-top: 1rem;
}

.safety__lead {
  margin-top: 1.5rem;
  color: var(--ink-2);
}

.ayah {
  margin-top: 2.5rem;
  padding: 1.75rem;
  border-radius: var(--radius-lg);
}

.ayah__ar {
  font-size: clamp(1.7rem, 1.3rem + 1.2vw, 2.3rem);
  line-height: 1.9;
  color: var(--gold-soft);
}

.ayah figcaption {
  margin-top: 0.9rem;
  font-size: var(--fs-small);
  color: var(--moon-2);
}

.ayah__ref {
  display: block;
  margin-bottom: 0.3rem;
  color: var(--gold);
  font-weight: 500;
}

.sitem {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1.1rem;
  padding-block: 1.4rem;
  border-top: 1px solid var(--line);
}

.sitem:last-child {
  border-bottom: 1px solid var(--line);
}

.sitem__icon {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--paper-2);
  color: var(--gold-deep);
}

.sitem h3 {
  font-size: 1.15rem;
  font-weight: 500;
}

.sitem p {
  margin-top: 0.25rem;
  color: var(--ink-2);
}

@media (max-width: 900px) {
  .safety__grid {
    grid-template-columns: 1fr;
  }
  .safety__head {
    position: static;
  }
}
</style>
