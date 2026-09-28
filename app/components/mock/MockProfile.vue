<script setup lang="ts">
const c = useCopy()
</script>

<template>
  <div class="mp">
    <div class="mp__photo">
      <svg class="mp__arch" viewBox="0 0 200 240" aria-hidden="true">
        <path d="M30 240V110C30 60 60 26 100 12c40 14 70 48 70 98v130" fill="none" stroke="currentColor" stroke-width="1.2" />
        <path d="M48 240V116c0-40 22-68 52-80 30 12 52 40 52 80v124" fill="none" stroke="currentColor" stroke-width="0.8" opacity=".6" />
      </svg>
      <div class="mp__who">
        <p class="mp__name">{{ c.mockProfile.name }}</p>
        <p class="mp__place">{{ c.mockProfile.place }}</p>
      </div>
      <span class="mp__verified"><Icon name="badge" :size="13" /> {{ c.mockProfile.verified }}</span>
      <span class="mp__match"><b>86%</b> {{ c.mockProfile.match }}</span>
    </div>

    <dl class="mp__rows">
      <div v-for="r in c.mockProfile.rows" :key="r.k">
        <dt>{{ r.k }}</dt>
        <dd>{{ r.v }}</dd>
      </div>
    </dl>

    <div class="mp__prompt">
      <p class="mp__q">{{ c.mockProfile.prompt }}</p>
      <p>{{ c.mockProfile.promptAnswer }}</p>
    </div>

    <div class="mp__actions">
      <span class="mp__btn">{{ c.mockProfile.pass }}</span>
      <span class="mp__btn mp__btn--yes">{{ c.mockProfile.like }}</span>
    </div>
  </div>
</template>

<style scoped>
.mp {
  display: flex;
  flex-direction: column;
  gap: 0.85em;
  height: 100%;
  padding: 3.4em 0.9em 1em;
  background: var(--paper);
}

.mp__photo {
  position: relative;
  flex: 0 0 49%;
  overflow: hidden;
  border-radius: 1.3em;
  color: var(--gold-soft);
  background:
    radial-gradient(90% 70% at 50% 18%, oklch(0.78 0.07 60) 0%, transparent 70%),
    linear-gradient(170deg, oklch(0.62 0.07 45), oklch(0.36 0.06 20) 70%, oklch(0.27 0.05 290));
}

.mp__arch {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 78%;
  transform: translateX(-50%);
  opacity: 0.55;
}

.mp__who {
  position: absolute;
  left: 0.95em;
  right: 0.95em;
  bottom: 0.85em;
  color: var(--moon);
}

.mp__name {
  font-family: var(--font-display);
  font-size: 1.7em;
  line-height: 1.05;
}

.mp__place {
  font-size: 0.85em;
  opacity: 0.85;
}

.mp__verified,
.mp__match {
  position: absolute;
  top: 0.8em;
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  padding: 0.3em 0.65em;
  border-radius: 999px;
  font-size: 0.78em;
  font-weight: 500;
}

.mp__verified {
  left: 0.8em;
  background: oklch(0.2 0.04 272 / 0.55);
  color: var(--moon);
}

.mp__match {
  right: 0.8em;
  background: var(--moon);
  color: var(--ink);
}

.mp__match b {
  color: var(--gold-deep);
  font-weight: 500;
}

.mp__rows {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.45em;
}

.mp__rows div {
  padding: 0.5em 0.7em;
  border-radius: 0.8em;
  background: var(--paper-2);
}

.mp__rows dt {
  font-size: 0.74em;
  color: var(--ink-3);
}

.mp__rows dd {
  font-weight: 500;
  font-size: 0.92em;
  line-height: 1.25;
}

.mp__prompt {
  padding: 0.7em 0.8em;
  border: 1px solid var(--line);
  border-radius: 0.9em;
  font-size: 0.9em;
}

.mp__q {
  font-family: var(--font-display);
  font-size: 1.1em;
  color: var(--gold-deep);
}

.mp__actions {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 0.5em;
  margin-top: auto;
}

.mp__btn {
  display: grid;
  place-items: center;
  height: 2.9em;
  border-radius: 999px;
  border: 1px solid var(--line);
  font-weight: 500;
  font-size: 0.92em;
}

.mp__btn--yes {
  border: 0;
  background: var(--night-900);
  color: var(--moon);
}
</style>
