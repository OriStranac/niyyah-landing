<script setup lang="ts">
const c = useCopy()

// Svaki jezik svojim imenom i pismom.
const langs = [
  { name: 'Bosanski', lang: 'bs' },
  { name: 'English', lang: 'en' },
  { name: 'Deutsch', lang: 'de' },
  { name: 'Türkçe', lang: 'tr' },
  { name: 'العربية', lang: 'ar', rtl: true },
  { name: 'Bahasa Indonesia', lang: 'id' },
  { name: 'اردو', lang: 'ur', rtl: true },
  { name: 'Bahasa Melayu', lang: 'ms' },
  { name: 'Français', lang: 'fr' },
]
</script>

<template>
  <section class="section langs" aria-labelledby="langs-title">
    <div class="wrap langs__grid">
      <div>
        <h2 id="langs-title" v-reveal class="h2">{{ c.languages.title }}</h2>
        <p v-reveal="80" class="lead langs__lead">{{ c.languages.lead }}</p>
      </div>
      <ul v-reveal="120" class="langs__list">
        <li v-for="l in langs" :key="l.lang">
          <bdi :lang="l.lang" :dir="l.rtl ? 'rtl' : undefined" :class="{ ar: l.rtl }">{{ l.name }}</bdi>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.langs {
  background: var(--paper-3);
}

.langs__grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  gap: clamp(2.5rem, 6vw, 7rem);
  align-items: center;
}

.langs__lead {
  margin-top: 1.5rem;
  color: var(--ink-2);
}

.langs__list {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.15em 0;
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 1.3rem + 2.2vw, 3.4rem);
  line-height: 1.2;
}

/* razdjelnik je izvan <bdi>, pa ostaje na mjestu i uz arapski i urdu */
.langs__list li:not(:last-child)::after {
  content: '·';
  margin-inline: 0.4em;
  color: var(--gold-deep);
}

.langs__list li:nth-child(1) {
  color: var(--gold-deep);
}

.langs__list .ar {
  font-family: var(--font-arabic);
  font-size: 1.05em;
}

@media (max-width: 900px) {
  .langs__grid {
    grid-template-columns: 1fr;
  }
}
</style>
