<script setup lang="ts">
// Apstraktni islamski geometrijski motiv (khatam: dva preklopljena kvadrata),
// dekor na tamnim sekcijama. Rub se gubi kroz masku.
const props = defineProps<{ opacity?: number; size?: number }>()
const id = `geo-${useId()}`
const s = props.size ?? 88
</script>

<template>
  <svg class="geo" aria-hidden="true" focusable="false" :style="{ opacity: opacity ?? 0.14 }">
    <defs>
      <pattern :id="id" :width="s" :height="s" patternUnits="userSpaceOnUse" viewBox="0 0 88 88">
        <g fill="none" stroke="currentColor" stroke-width="0.9">
          <rect x="26" y="26" width="36" height="36" />
          <rect x="26" y="26" width="36" height="36" transform="rotate(45 44 44)" />
          <circle cx="44" cy="44" r="7" />
          <path d="M0 0l18.5 18.5M88 0 69.5 18.5M0 88l18.5-18.5M88 88 69.5 69.5" />
          <path d="M44 0v11.5M44 88V76.5M0 44h11.5M88 44H76.5" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${id})`" />
  </svg>
</template>

<style scoped>
.geo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: var(--gold);
  pointer-events: none;
  -webkit-mask-image: radial-gradient(ellipse 70% 65% at 70% 45%, #000 20%, transparent 75%);
  mask-image: radial-gradient(ellipse 70% 65% at 70% 45%, #000 20%, transparent 75%);
}
</style>
