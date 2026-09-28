<script setup lang="ts">
const c = useCopy()
</script>

<template>
  <div class="pt">
    <header class="pt__head">
      <p class="pt__title">{{ c.mockPortal.title }}</p>
      <span class="pt__ro"><Icon name="eye" :size="13" /> {{ c.mockPortal.readOnly }}</span>
    </header>
    <p class="pt__meta">{{ c.mockPortal.watching }}</p>
    <p class="pt__with">{{ c.mockPortal.with }}</p>

    <ol class="pt__msgs">
      <li v-for="(m, i) in c.mockPortal.messages" :key="i" :class="`pt__msg pt__msg--${m.from}`">
        {{ m.text }}
      </li>
    </ol>

    <div class="pt__locked">
      <Icon name="lock" :size="15" />
      {{ c.mockPortal.locked }}
    </div>
  </div>
</template>

<style scoped>
.pt {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 3.6em 1em 1.1em;
  background: var(--night-800);
  color: var(--moon);
}

.pt__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5em;
}

.pt__title {
  font-family: var(--font-display);
  font-size: 1.5em;
  line-height: 1.1;
}

.pt__ro {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  padding: 0.3em 0.6em;
  border-radius: 999px;
  background: var(--gold);
  color: var(--night-950);
  font-size: 0.76em;
  font-weight: 500;
  white-space: nowrap;
}

.pt__meta {
  margin-top: 0.3em;
  font-size: 0.85em;
  color: var(--moon-2);
}

.pt__with {
  margin-top: 1.1em;
  padding-bottom: 0.6em;
  border-bottom: 1px solid var(--night-line);
  font-size: 0.85em;
  font-weight: 500;
}

.pt__msgs {
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  margin-top: 1em;
}

.pt__msg {
  max-width: 84%;
  padding: 0.6em 0.8em;
  border-radius: 1.1em;
  font-size: 0.92em;
  line-height: 1.35;
}

.pt__msg--him {
  align-self: flex-start;
  border-bottom-left-radius: 0.35em;
  background: var(--night-700);
}

.pt__msg--her {
  align-self: flex-end;
  border-bottom-right-radius: 0.35em;
  background: var(--moon);
  color: var(--ink);
}

.pt__locked {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45em;
  margin-top: auto;
  height: 3em;
  border-radius: 999px;
  border: 1px dashed var(--night-line);
  color: var(--moon-3);
  font-size: 0.85em;
}
</style>
