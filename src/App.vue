<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  titleTemplate: (title) =>
    title ? `${title} — JOSTA` : 'JOSTA — Čištění vrtaných studní',
  htmlAttrs: { lang: 'cs' },
  meta: [{ name: 'theme-color', content: '#0a1f3d' }],
})
</script>

<template>
  <RouterView />
</template>
