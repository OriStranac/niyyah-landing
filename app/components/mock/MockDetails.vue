<script setup lang="ts">
const c = useCopy()
</script>

<template>
  <div class="md">
    <div class="md__top">
      <span class="md__avatar" aria-hidden="true" />
      <p class="md__title">{{ c.mockDetails.title }}</p>
    </div>
    <dl class="md__rows">
      <div v-for="r in c.mockDetails.rows" :key="r.k">
        <dt>{{ r.k }}</dt>
        <dd>{{ r.v }}</dd>
      </div>
    </dl>
    <div class="md__sit">
      <p class="md__label">{{ c.mockDetails.situation }}</p>
      <p class="md__q">{{ c.mockDetails.question }}</p>
      <p class="md__a">{{ c.mockDetails.answer }}</p>
    </div>
  </div>
</template>

<style scoped>
.md {
  display: flex;
  flex-direction: column;
  gap: 1em;
  height: 100%;
  padding: 3.6em 1em 1em;
  background: var(--paper);
}

.md__top {
  display: flex;
  align-items: center;
  gap: 0.7em;
}

.md__avatar {
  width: 2.8em;
  height: 2.8em;
  border-radius: 50%;
  background: linear-gradient(160deg, oklch(0.6 0.05 60), oklch(0.32 0.05 272));
}

.md__title {
  font-family: var(--font-display);
  font-size: 1.5em;
}

.md__rows div {
  display: flex;
  justify-content: space-between;
  gap: 0.6em;
  padding-block: 0.6em;
  border-top: 1px solid var(--line);
  font-size: 0.92em;
}

.md__rows dt {
  color: var(--ink-3);
}

.md__rows dd {
  font-weight: 500;
  text-align: right;
}

.md__sit {
  margin-top: auto;
  padding: 0.95em;
  border-radius: 1.1em;
  background: var(--night-900);
  color: var(--moon);
}

.md__label {
  font-size: 0.76em;
  color: var(--gold);
}

.md__q {
  margin-top: 0.4em;
  font-family: var(--font-display);
  font-size: 1.12em;
  line-height: 1.2;
}

.md__a {
  margin-top: 0.55em;
  font-size: 0.9em;
  color: var(--moon-2);
}
</style>
