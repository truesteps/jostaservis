<script setup lang="ts">
import wellClean from '@/assets/icons/well-clean.svg?raw'
import chartLine from '@/assets/icons/chart-line.svg?raw'
import eyeOutline from '@/assets/icons/eye-outline.svg?raw'
import repeat from '@/assets/icons/repeat.svg?raw'
import waterAlert from '@/assets/icons/water-alert.svg?raw'
import lineChartDown from '@/assets/icons/line-chart-down.svg?raw'
import warningOutline from '@/assets/icons/warning-outline.svg?raw'
import dust from '@/assets/icons/dust.svg?raw'
import smell from '@/assets/icons/smell.svg?raw'
import calendar from '@/assets/icons/calendar.svg?raw'
import facebook from '@/assets/icons/facebook.svg?raw'
import instagram from '@/assets/icons/instagram.svg?raw'

const GLYPHS: Record<string, string> = {
  'well-clean': wellClean,
  'chart-line': chartLine,
  'eye-outline': eyeOutline,
  repeat,
  'water-alert': waterAlert,
  'line-chart-down': lineChartDown,
  'warning-outline': warningOutline,
  dust,
  smell,
  calendar,
  facebook,
  instagram,
}

const props = withDefaults(
  defineProps<{ name: string; size?: number | string }>(),
  { size: 24 },
)

const fontSize = typeof props.size === 'number' ? `${props.size}px` : props.size
</script>

<template>
  <span class="glyph" :style="{ fontSize }" v-html="GLYPHS[name] ?? ''" />
</template>

<style scoped>
.glyph {
  display: inline-flex;
  line-height: 0;
}
.glyph :deep(svg) {
  width: 1em;
  height: 1em;
  display: block;
}
</style>
