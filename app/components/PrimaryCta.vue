<script setup lang="ts">
defineProps<{ tone?: 'night' | 'day' }>()
const c = useCopy()
const { appLaunched } = useRuntimeConfig().public
</script>

<template>
  <!-- Dok aplikacije nema, adresa je jedino što posjetilac može ostaviti, pa
       forma ide prva. Ponuda stoji uz nju, jer je razlog da je ostavi. -->
  <template v-if="!appLaunched">
    <p class="founder">
      <span class="founder__mark">50</span>
      {{ c.cta.founder }}
    </p>
    <WaitlistForm :tone="tone" />
  </template>

  <!-- Hero ovdje ubacuje svoje oznake: na mockupu stoje između reda o
       privatnosti i bedževa trgovina. -->
  <slot name="between" />

  <!-- Kartice trgovina: prigušene i bez linka dok aplikacija ne izađe. -->
  <StoreButtons />
</template>

<style scoped>
.founder {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin: 0 0 0.9rem;
  padding: 0.7rem 0.95rem;
  border: 1px solid var(--gold-glow);
  border-radius: 14px;
  background: oklch(0.76 0.105 82 / 0.07);
  font-size: var(--fs-small);
  line-height: 1.45;
  color: var(--moon-2);
}

.founder__mark {
  flex: none;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--gold);
  color: var(--gold);
  font-family: var(--font-display);
  font-size: 1rem;
  line-height: 1;
}
</style>
