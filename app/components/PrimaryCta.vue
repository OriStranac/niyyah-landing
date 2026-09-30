<script setup lang="ts">
defineProps<{ tone?: 'night' | 'day' }>()
const { appLaunched } = useRuntimeConfig().public
</script>

<template>
  <!-- Dok aplikacije nema, adresa je jedino što posjetilac može ostaviti, pa
       forma ide prva. Kartice trgovina stoje ispod, prigušene: kažu gdje će
       aplikacija biti, a ne vode nigdje jer linkovi još ne postoje. -->
  <WaitlistForm v-if="!appLaunched" :tone="tone" />
  <StoreButtons />
</template>
