<script setup lang="ts">
const props = defineProps<{ label: string; done: string; text: string }>()
const copied = ref(false)

async function share() {
  const url = window.location.href.split('#')[0]
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Niyyah', text: props.text, url })
    } catch {}
    return
  }
  try {
    await navigator.clipboard.writeText(`${props.text} ${url}`)
    copied.value = true
    setTimeout(() => (copied.value = false), 2400)
  } catch {}
}
</script>

<template>
  <button type="button" class="share" @click="share">
    <Icon :name="copied ? 'check' : 'share'" :size="18" />
    <span aria-live="polite">{{ copied ? done : label }}</span>
  </button>
</template>

<style scoped>
.share {
  display: inline-flex;
  align-items: center;
  gap: 0.55em;
  min-height: 48px;
  padding: 0 1.3rem;
  border: 1px solid currentColor;
  border-radius: 999px;
  background: transparent;
  font-weight: 500;
  cursor: pointer;
  transition:
    transform 160ms var(--ease-out),
    background-color 200ms ease;
}

.share:active {
  transform: scale(0.97);
}

@media (hover: hover) and (pointer: fine) {
  .share:hover {
    background: oklch(0.2 0.04 272 / 0.06);
  }
}
</style>
