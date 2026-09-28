<script setup lang="ts">
// Prikazuje screenshot ako postoji u app/assets/images/<shot>.*,
// inače HTML maketu iz slota. Vidi SLIKE.md.
const props = defineProps<{ shot: string; alt: string; eager?: boolean }>()
const src = useShot(props.shot)
</script>

<template>
  <figure class="phone">
    <div class="phone__screen">
      <img
        v-if="src"
        :src="src"
        :alt="alt"
        width="1179"
        height="2556"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : 'auto'"
        decoding="async"
      />
      <div v-else class="phone__mock" role="img" :aria-label="alt">
        <slot />
      </div>
    </div>
  </figure>
</template>

<style scoped>
.phone {
  position: relative;
  width: min(100%, var(--phone-w, 330px));
  aspect-ratio: 1179 / 2556;
  padding: 9px;
  border-radius: 48px;
  background: var(--night-950);
  box-shadow:
    inset 0 0 0 1.5px oklch(0.45 0.04 272 / 0.6),
    0 50px 90px -40px oklch(0.15 0.04 272 / 0.65),
    0 24px 40px -24px oklch(0.15 0.04 272 / 0.4);
}

.phone::before {
  content: '';
  position: absolute;
  top: 19px;
  left: 50%;
  z-index: 2;
  width: 30%;
  height: 24px;
  border-radius: 999px;
  background: var(--night-950);
  transform: translateX(-50%);
}

.phone__screen {
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: 40px;
  background: var(--paper);
  container-type: inline-size;
}

.phone__screen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.phone__mock {
  height: 100%;
  /* sve u maketama je u em, pa se skalira s veličinom telefona */
  font-size: 4.9cqw;
  line-height: 1.4;
  color: var(--ink);
}
</style>
