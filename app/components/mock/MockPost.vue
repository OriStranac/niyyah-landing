<script setup lang="ts">
const c = useCopy()
</script>

<template>
  <div class="po">
    <p class="po__space">{{ c.mockPost.space }}</p>
    <article class="po__card">
      <header class="po__head">
        <span class="po__avatar" aria-hidden="true"><StarMark :size="14" /></span>
        <div>
          <p class="po__author">{{ c.mockPost.author }}</p>
          <p class="po__cat">{{ c.mockPost.category }}</p>
        </div>
      </header>
      <p class="po__text">{{ c.mockPost.text }}</p>
      <ul class="po__reactions">
        <li v-for="r in c.community.reactions" :key="r">{{ r }}</li>
      </ul>
      <p class="po__rev"><Icon name="check" :size="13" /> {{ c.mockPost.reviewed }}</p>
    </article>
    <div class="po__ghost" aria-hidden="true" />
  </div>
</template>

<style scoped>
.po {
  display: flex;
  flex-direction: column;
  gap: 0.8em;
  height: 100%;
  padding: 3.6em 0.9em 1em;
  background: var(--paper-2);
}

.po__space {
  font-family: var(--font-display);
  font-size: 1.55em;
  line-height: 1.1;
}

.po__card {
  padding: 0.95em;
  border-radius: 1.2em;
  background: var(--paper);
  box-shadow: 0 1px 0 var(--line);
}

.po__head {
  display: flex;
  align-items: center;
  gap: 0.6em;
}

.po__avatar {
  display: grid;
  place-items: center;
  width: 2.3em;
  height: 2.3em;
  border-radius: 50%;
  background: var(--night-900);
  color: var(--gold);
}

.po__author {
  font-weight: 500;
  font-size: 0.92em;
}

.po__cat {
  font-size: 0.78em;
  color: var(--ink-3);
}

.po__text {
  margin-top: 0.7em;
  font-size: 0.98em;
  line-height: 1.42;
}

.po__reactions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35em;
  margin-top: 0.8em;
}

.po__reactions li {
  padding: 0.25em 0.6em;
  border-radius: 999px;
  border: 1px solid var(--line);
  font-size: 0.76em;
}

.po__reactions li:first-child {
  border-color: transparent;
  background: var(--night-900);
  color: var(--moon);
}

.po__rev {
  display: flex;
  align-items: center;
  gap: 0.3em;
  margin-top: 0.8em;
  font-size: 0.76em;
  color: var(--gold-deep);
}

.po__ghost {
  flex: 1;
  border-radius: 1.2em 1.2em 0 0;
  background: var(--paper);
  opacity: 0.6;
}
</style>
