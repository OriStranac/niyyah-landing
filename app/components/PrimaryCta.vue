<script setup lang="ts">
defineProps<{ tone?: 'night' | 'day' }>()
const { appLaunched } = useRuntimeConfig().public
</script>

<template>
  <div class="cta">
    <!-- Dok aplikacije nema, adresa je jedino što posjetilac može ostaviti. -->
    <WaitlistForm v-if="!appLaunched" :tone="tone" />

    <!-- Kartice trgovina: prigušene i bez linka dok aplikacija ne izađe. -->
    <StoreButtons />
  </div>
</template>

<style scoped>
/* Jedan stupac s jednim razmakom: element koji ovdje dođe dobija razmak sam
   od sebe, umjesto da se dodaje pravilo po elementu. */
.cta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(1.1rem, 0.8rem + 0.7vw, 1.6rem);
}

.cta > * {
  width: 100%;
}
</style>
