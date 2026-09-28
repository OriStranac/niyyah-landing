<script setup lang="ts">
const c = useCopy()
</script>

<template>
  <div class="mq">
    <p class="mq__title">{{ c.mockQuestions.title }}</p>
    <ol class="mq__list">
      <li v-for="(x, i) in c.mockQuestions.qa" :key="i">
        <p class="mq__q"><span>{{ i + 1 }}</span>{{ x.q }}</p>
        <p class="mq__a">{{ x.a }}</p>
      </li>
    </ol>
    <div class="mq__actions">
      <span class="mq__btn">{{ c.mockQuestions.no }}</span>
      <span class="mq__btn mq__btn--yes">{{ c.mockQuestions.yes }}</span>
    </div>
  </div>
</template>

<style scoped>
.mq {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 3.6em 1em 1.1em;
  background: var(--paper);
}

.mq__title {
  font-family: var(--font-display);
  font-size: 1.45em;
  line-height: 1.12;
  text-wrap: balance;
}

.mq__list {
  display: flex;
  flex-direction: column;
  gap: 0.7em;
  margin-top: 1.1em;
}

.mq__list li {
  padding: 0.75em 0.85em;
  border-radius: 1em;
  background: var(--paper-2);
}

.mq__q {
  display: flex;
  gap: 0.5em;
  font-weight: 500;
  font-size: 0.9em;
}

.mq__q span {
  flex: none;
  display: grid;
  place-items: center;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: var(--night-900);
  color: var(--gold);
  font-size: 0.82em;
}

.mq__a {
  margin-top: 0.35em;
  font-size: 0.9em;
  color: var(--ink-2);
}

.mq__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5em;
  margin-top: auto;
}

.mq__btn {
  display: grid;
  place-items: center;
  height: 2.9em;
  border-radius: 999px;
  border: 1px solid var(--line);
  font-size: 0.9em;
  font-weight: 500;
}

.mq__btn--yes {
  border: 0;
  background: var(--night-900);
  color: var(--moon);
}
</style>
