<script setup lang="ts">
const c = useCopy()
</script>

<template>
  <section class="section comm" aria-labelledby="comm-title">
    <div class="wrap comm__grid">
      <div>
        <p v-reveal class="kicker"><StarMark /> {{ c.community.kicker }}</p>
        <h2 id="comm-title" v-reveal="60" class="h2 comm__title">{{ c.community.title }}</h2>
        <p v-reveal="120" class="lead comm__lead">{{ c.community.lead }}</p>

        <dl class="comm__items">
          <div v-for="(it, i) in c.community.items" :key="it.title" v-reveal="i * 60">
            <dt class="h3">{{ it.title }}</dt>
            <dd>{{ it.body }}</dd>
          </div>
        </dl>

        <div v-reveal class="comm__reactions">
          <p>{{ c.community.reactionsLabel }}</p>
          <ul>
            <li v-for="r in c.community.reactions" :key="r" class="chip">{{ r }}</li>
          </ul>
        </div>
      </div>

      <div v-reveal="100" class="comm__visual">
        <PhoneFrame shot="zajednica" :alt="c.community.imageAlt">
          <MockPost />
        </PhoneFrame>
      </div>
    </div>
  </section>
</template>

<style scoped>
.comm {
  background: var(--paper-2);
}

.comm__grid {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
  gap: clamp(3rem, 7vw, 8rem);
  align-items: center;
}

.comm__title {
  margin-top: 1rem;
  max-width: 12em;
}

.comm__lead {
  margin-top: 1.5rem;
  color: var(--ink-2);
}

.comm__items {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem clamp(1.5rem, 3vw, 3rem);
  margin-top: clamp(2.5rem, 2rem + 2vw, 3.5rem);
}

.comm__items dt {
  font-size: 1.3rem;
}

.comm__items dd {
  margin-top: 0.4rem;
  color: var(--ink-2);
}

.comm__reactions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  font-size: var(--fs-small);
  color: var(--ink-3);
}

.comm__reactions ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.comm__reactions .chip {
  color: var(--ink);
}

.comm__visual {
  display: flex;
  justify-content: center;
  --phone-w: 310px;
}

@media (max-width: 900px) {
  .comm__grid {
    grid-template-columns: 1fr;
  }
  .comm__visual {
    --phone-w: 280px;
  }
}

@media (max-width: 560px) {
  .comm__items {
    grid-template-columns: 1fr;
  }
}
</style>
