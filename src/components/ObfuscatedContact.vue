<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const CONTACTS = {
  email: {
    scheme: 'mailto' as const,
    parts: ['U3Rhc2VrLkpvc2Vm', 'QGVtYWlsLmN6'],
  },
  phone: {
    scheme: 'tel' as const,
    parts: ['KzQyMCA3MjE=', 'IDQ2NiAzODg='],
  },
}

const props = defineProps<{ type: keyof typeof CONTACTS }>()
const config = computed(() => CONTACTS[props.type])

const mounted = ref(false)
const linkReady = ref(false)

onMounted(() => {
  mounted.value = true
})

function buildLink() {
  if (mounted.value) linkReady.value = true
}

const decode = (b64: string) =>
  new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)))

const value = computed(() =>
  mounted.value ? config.value.parts.map(decode).join('') : '',
)

const href = computed(() => {
  if (!linkReady.value || !value.value) return undefined
  return config.value.scheme === 'tel'
    ? `tel:${value.value.replace(/[^+0-9]/g, '')}`
    : `mailto:${value.value}`
})
</script>

<template>
  <slot :value="value" :href="href" :ready="mounted" :build-link="buildLink" />
</template>
