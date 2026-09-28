<script setup lang="ts">
defineProps<{ tone?: 'night' | 'day' }>()
const { appLaunched } = useRuntimeConfig().public
</script>

<template>
  <StoreButtons v-if="appLaunched" />
  <WaitlistForm v-else :tone="tone" />
</template>
