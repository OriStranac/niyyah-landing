<script setup lang="ts">
defineProps<{ name: string; size?: number }>()
</script>

<template>
  <svg
    :width="size ?? 20"
    :height="size ?? 20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <template v-if="name === 'arrow'"><path d="M5 12h14M13 6l6 6-6 6" /></template>
    <template v-else-if="name === 'arrow-down'"><path d="M12 5v14M6 13l6 6 6-6" /></template>
    <template v-else-if="name === 'check'"><path d="M5 12.5l4.2 4.2L19 7" /></template>
    <template v-else-if="name === 'plus'"><path d="M12 5v14M5 12h14" /></template>
    <template v-else-if="name === 'lock'"><rect x="5" y="10.5" width="14" height="10" rx="2.5" /><path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7" /></template>
    <template v-else-if="name === 'eye'"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.8" /></template>
    <template v-else-if="name === 'pin'"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></template>
    <template v-else-if="name === 'photo'"><rect x="3.5" y="5" width="17" height="14" rx="3" /><circle cx="12" cy="11" r="2.6" /><path d="M7.5 19c.8-2.2 2.4-3.4 4.5-3.4s3.7 1.2 4.5 3.4" /></template>
    <template v-else-if="name === 'badge'"><path d="M12 3l2.3 1.7 2.8-.2.9 2.7 2.3 1.6-.9 2.7.9 2.7-2.3 1.6-.9 2.7-2.8-.2L12 21l-2.3-1.7-2.8.2-.9-2.7-2.3-1.6.9-2.7-.9-2.7 2.3-1.6.9-2.7 2.8.2Z" /><path d="M8.8 12.2l2.2 2.2 4.2-4.4" /></template>
    <template v-else-if="name === 'people'"><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" /><circle cx="17" cy="9.5" r="2.4" /><path d="M16 14.4c2.3.1 4 1.6 4.5 4.1" /></template>
    <template v-else-if="name === 'block'"><circle cx="12" cy="12" r="8.5" /><path d="M6 6l12 12" /></template>
    <template v-else-if="name === 'pause'"><circle cx="12" cy="12" r="8.5" /><path d="M10 9v6M14 9v6" /></template>
    <template v-else-if="name === 'finger'"><path d="M7.5 18.5c-1-1.8-1.5-3.9-1.5-6.5a6 6 0 0 1 10.6-3.9" /><path d="M18 11.5c0 3.2-.5 5.8-1.6 8" /><path d="M9.5 20c-.6-2.3-.9-5-.9-8a3.4 3.4 0 0 1 6.8 0c0 3-.3 5.6-.9 8" /><path d="M12 12c0 3.2.2 5.8-.5 8.5" /></template>
    <template v-else-if="name === 'share'"><path d="M12 15V4M8 8l4-4 4 4" /><path d="M6 12v6.5A1.5 1.5 0 0 0 7.5 20h9a1.5 1.5 0 0 0 1.5-1.5V12" /></template>
    <template v-else-if="name === 'globe'"><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.3 2.3 3.4 5.2 3.4 8.5s-1.1 6.2-3.4 8.5c-2.3-2.3-3.4-5.2-3.4-8.5S9.7 5.8 12 3.5Z" /></template>
    <template v-else-if="name === 'menu'"><path d="M4 8h16M4 16h16" /></template>
    <template v-else-if="name === 'close'"><path d="M6 6l12 12M18 6L6 18" /></template>
    <template v-else-if="name === 'download'"><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14" /></template>
  </svg>
</template>
