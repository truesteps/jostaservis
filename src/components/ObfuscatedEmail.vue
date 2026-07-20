<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// Anti-scraping email. The address is intentionally ABSENT from the
// pre-rendered (SSG) HTML — it is assembled in the browser and only shown once
// the component mounts, so HTML-scraping bots that read the static markup never
// obtain it. The clickable `mailto:` href is built even later, on first user
// interaction (hover / focus / tap). Parts are base64-encoded so no plaintext
// address sits in the JS bundle either. Decode: atob('U3Rhc2VrLkpvc2Vm') →
// 'Stasek.Josef', etc.
const PARTS = { user: 'U3Rhc2VrLkpvc2Vm', domain: 'ZW1haWwuY3o=' }

const mounted = ref(false)
const linkReady = ref(false)

onMounted(() => {
  mounted.value = true
})

function buildLink() {
  // Guard on mounted so SSR and the initial client render stay identical
  // (no hydration mismatch); the mailto is only assembled post-hydration.
  if (mounted.value) linkReady.value = true
}

// Visible address: available as soon as we are on the client.
const email = computed(() =>
  mounted.value ? `${atob(PARTS.user)}@${atob(PARTS.domain)}` : '',
)
// Clickable href: only after the user hovers/focuses/taps.
const href = computed(() =>
  linkReady.value && email.value ? `mailto:${email.value}` : undefined,
)
</script>

<template>
  <!-- Renderless: the parent owns the markup/styling and wires `buildLink`
       to hover/focus/click. `ready` = address is available to display. -->
  <slot :email="email" :href="href" :ready="mounted" :build-link="buildLink" />
</template>
