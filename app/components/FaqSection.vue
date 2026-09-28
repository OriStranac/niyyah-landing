<script setup lang="ts">
const c = useCopy()
const open = ref<number | null>(0)
const id = useId()

function toggle(i: number) {
  open.value = open.value === i ? null : i
}
</script>

<template>
  <section id="pitanja" class="section faq" aria-labelledby="faq-title">
    <div class="wrap faq__grid">
      <h2 id="faq-title" v-reveal class="h2 faq__title">{{ c.faq.title }}</h2>

      <div class="faq__list">
        <div v-for="(item, i) in c.faq.items" :key="i" class="qa" :class="{ 'is-open': open === i }">
          <h3>
            <button
              :id="`${id}-q${i}`"
              type="button"
              class="qa__q"
              :aria-expanded="open === i"
              :aria-controls="`${id}-a${i}`"
              @click="toggle(i)"
            >
              <span>{{ item.q }}</span>
              <span class="qa__sign" aria-hidden="true" />
            </button>
          </h3>
          <div :id="`${id}-a${i}`" class="qa__a" role="region" :aria-labelledby="`${id}-q${i}`">
            <div class="qa__inner">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq__grid {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 7fr);
  gap: 2rem clamp(3rem, 6vw, 7rem);
  align-items: start;
}

.faq__title {
  position: sticky;
  top: 110px;
  max-width: 9em;
}

.qa {
  border-top: 1px solid var(--line);
}

.qa:last-child {
  border-bottom: 1px solid var(--line);
}

.qa h3 {
  font: inherit;
}

.qa__q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  width: 100%;
  padding: 1.35rem 0;
  border: 0;
  background: none;
  text-align: left;
  font-size: 1.15rem;
  font-weight: 500;
  line-height: 1.4;
  cursor: pointer;
}

.qa__sign {
  position: relative;
  flex: none;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid var(--line);
  transition:
    background-color 200ms ease,
    border-color 200ms ease;
}

.qa__sign::before,
.qa__sign::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 11px;
  height: 1.5px;
  background: currentColor;
  transform: translate(-50%, -50%);
  transition: transform 300ms var(--ease-out);
}

.qa__sign::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.is-open .qa__sign {
  background: var(--night-900);
  border-color: var(--night-900);
  color: var(--gold);
}

.is-open .qa__sign::after {
  transform: translate(-50%, -50%) rotate(0deg);
}

/* Odgovor ostaje u HTML-u (dobro za SEO), samo se sklapa. */
.qa__a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 360ms var(--ease-out);
}

.is-open .qa__a {
  grid-template-rows: 1fr;
}

.qa__inner {
  min-height: 0;
  overflow: hidden;
}

.qa__inner p {
  max-width: 62ch;
  padding-bottom: 1.5rem;
  color: var(--ink-2);
  opacity: 0;
  transition: opacity 250ms ease;
}

.is-open .qa__inner p {
  opacity: 1;
  transition-delay: 80ms;
}

@media (hover: hover) and (pointer: fine) {
  .qa__q:hover .qa__sign {
    border-color: var(--ink-3);
  }
}

@media (max-width: 900px) {
  .faq__grid {
    grid-template-columns: 1fr;
  }
  .faq__title {
    position: static;
  }
}
</style>
