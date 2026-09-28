<script setup lang="ts">
// Ako su u app/assets/images/ službeni bedževi (badge-app-store, badge-google-play),
// koriste se oni; inače jednostavna dugmad.
const c = useCopy()
const { appStoreUrl, googlePlayUrl } = useRuntimeConfig().public
const appStoreBadge = useShot('badge-app-store')
const playBadge = useShot('badge-google-play')
</script>

<template>
  <div class="stores">
    <a class="store" :href="appStoreUrl" rel="noopener">
      <img v-if="appStoreBadge" :src="appStoreBadge" :alt="`${c.cta.getOn} ${c.cta.appStore}`" height="54" />
      <span v-else class="btn btn--gold"><Icon name="download" /> {{ c.cta.appStore }}</span>
    </a>
    <a class="store" :href="googlePlayUrl" rel="noopener">
      <img v-if="playBadge" :src="playBadge" :alt="`${c.cta.getOn} ${c.cta.googlePlay}`" height="54" />
      <span v-else class="btn btn--gold"><Icon name="download" /> {{ c.cta.googlePlay }}</span>
    </a>
  </div>
</template>

<style scoped>
.stores {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.store {
  display: inline-flex;
  border-radius: 12px;
  transition: transform 160ms var(--ease-out);
}

.store:active {
  transform: scale(0.97);
}

.store img {
  height: 54px;
  width: auto;
}
</style>
