<script setup lang="ts">
// Osmokraka zvijezda iz logotipa, kao mali znak ispred oznaka sekcija.
defineProps<{ size?: number }>()
</script>

<template>
  <svg :width="size ?? 12" :height="size ?? 12" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12 0l2.6 6.3L21 3l-3.3 6.4L24 12l-6.3 2.6L21 21l-6.4-3.3L12 24l-2.6-6.3L3 21l3.3-6.4L0 12l6.3-2.6L3 3l6.4 3.3Z"
    />
  </svg>
</template>
