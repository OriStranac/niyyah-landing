<script setup lang="ts">
const c = useCopy()
</script>

<template>
  <section class="section prof" aria-labelledby="prof-title">
    <div class="wrap">
      <div class="prof__head">
        <p v-reveal class="kicker"><StarMark /> {{ c.profile.kicker }}</p>
        <h2 id="prof-title" v-reveal="60" class="h2 prof__title">{{ c.profile.title }}</h2>
        <p v-reveal="120" class="lead prof__lead">{{ c.profile.lead }}</p>
      </div>

      <div class="prof__grid">
        <div>
          <dl class="fields">
            <div v-for="(f, i) in c.profile.fields" :key="f.k" v-reveal="i * 40" class="field">
              <dt>{{ f.k }}</dt>
              <dd>
                <span v-for="v in f.v" :key="v">{{ v }}</span>
              </dd>
            </div>
          </dl>
          <p v-reveal class="prof__more">{{ c.profile.more }}</p>
        </div>

        <div v-reveal="100" class="prof__visual">
          <PhoneFrame shot="profil-detalji" :alt="c.profile.imageAlt">
            <MockDetails />
          </PhoneFrame>
        </div>
      </div>

      <div class="prof__extras">
        <div v-reveal class="extra extra--situations">
          <h3 class="h3">{{ c.profile.situationsTitle }}</h3>
          <p>{{ c.profile.situationsBody }}</p>
          <ul>
            <li v-for="s in c.profile.situations" :key="s" class="chip">{{ s }}</li>
          </ul>
        </div>

        <div v-reveal="80" class="extra extra--prompts">
          <h3 class="h3">{{ c.profile.promptsTitle }}</h3>
          <ul>
            <li v-for="p in c.profile.prompts" :key="p">{{ p }}</li>
          </ul>
        </div>

        <div v-reveal="160" class="extra extra--match">
          <svg class="ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" stroke-width="6" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="var(--gold)"
              stroke-width="6"
              stroke-linecap="round"
              stroke-dasharray="281 327"
              transform="rotate(-90 60 60)"
            />
            <text x="60" y="68" text-anchor="middle">86%</text>
          </svg>
          <div>
            <h3 class="h3">{{ c.profile.matchTitle }}</h3>
            <p>{{ c.profile.matchBody }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.prof {
  background: var(--paper-2);
}

.prof__title {
  margin-top: 1rem;
  max-width: 13em;
}

.prof__lead {
  margin-top: 1.5rem;
  color: var(--ink-2);
}

.prof__grid {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
  gap: clamp(3rem, 6vw, 7rem);
  align-items: start;
  margin-top: clamp(3rem, 2rem + 3vw, 5rem);
}

.field {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  gap: 0.35rem 1.5rem;
  padding-block: 1rem;
  border-top: 1px solid var(--line);
}

.field dt {
  font-weight: 500;
}

.field dd {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem 0;
  color: var(--ink-2);
}

.field dd span:not(:last-child)::after {
  content: '·';
  margin-inline: 0.55em;
  color: var(--gold-deep);
}

.prof__more {
  padding-top: 1rem;
  border-top: 1px solid var(--line);
  color: var(--ink-3);
  font-size: var(--fs-small);
}

.prof__visual {
  position: sticky;
  top: 110px;
  display: flex;
  justify-content: center;
  --phone-w: 300px;
}

.prof__extras {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 4fr) minmax(0, 4fr);
  gap: 1rem;
  margin-top: clamp(3.5rem, 2.5rem + 3vw, 6rem);
}

.extra {
  display: grid;
  align-content: start;
  gap: 0.8rem;
  padding: clamp(1.5rem, 1rem + 1.5vw, 2.25rem);
  border-radius: var(--radius-lg);
  background: var(--paper);
}

.extra p {
  color: var(--ink-2);
}

.extra--situations ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.4rem;
}

.extra--situations .chip {
  background: var(--paper-2);
  border-color: transparent;
}

.extra--prompts {
  background: var(--night-900);
  color: var(--moon);
}

.extra--prompts ul {
  display: grid;
  gap: 0.9rem;
}

.extra--prompts li {
  font-family: var(--font-display);
  font-size: 1.35rem;
  line-height: 1.2;
  color: var(--gold-soft);
}

.extra--match {
  grid-template-columns: 96px 1fr;
  align-items: center;
  gap: 1.25rem;
}

.ring text {
  font-family: var(--font-display);
  font-size: 26px;
  fill: var(--ink);
}

@media (max-width: 1000px) {
  .prof__extras {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 800px) {
  .prof__grid {
    grid-template-columns: 1fr;
  }
  .prof__visual {
    position: static;
    --phone-w: 280px;
  }
  .field {
    grid-template-columns: 1fr;
  }
}
</style>
