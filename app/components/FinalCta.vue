<script setup lang="ts">
const c = useCopy()
const { appLaunched } = useRuntimeConfig().public
</script>

<template>
  <section id="pridruzi" class="section final on-night" aria-labelledby="final-title">
    <GeoPattern :opacity="0.13" />
    <div class="final__glow" aria-hidden="true" />
    <div class="wrap final__wrap">
      <h2 id="final-title" v-reveal class="display final__title">{{ c.final.title }}</h2>
      <p v-reveal="80" class="lead final__lead">
        {{ appLaunched ? c.final.leadLaunched : c.final.leadWaitlist }}
      </p>
      <div v-reveal="140" class="final__cta">
        <PrimaryCta tone="night" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.final {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-block: clamp(6rem, 4rem + 8vw, 12rem);
}

.final .geo {
  z-index: -1;
}

.final__glow {
  position: absolute;
  left: 50%;
  bottom: -40%;
  z-index: -1;
  width: min(900px, 120vw);
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, var(--gold-glow) 0%, transparent 62%);
  transform: translateX(-50%);
}

.final__wrap {
  display: grid;
  justify-items: center;
  text-align: center;
}

.final__title {
  max-width: 10em;
}

.final__lead {
  margin-top: 1.6rem;
  color: var(--moon-2);
  max-width: 36em;
}

.final__cta {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2.5rem;
}

.final__cta :deep(.wl__msg) {
  text-align: center;
}
</style>
