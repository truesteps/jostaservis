<script setup lang="ts">
// Real icons from the Figma design, downloaded from their source icon sets
// (Iconify) and stored in src/assets/icons/. The one non-Iconify glyph
// (well-clean) is exported straight from the Figma file. All are inlined as raw
// SVG (via ?raw) and drawn in `currentColor`, so size = font-size and color =
// the CSS `color` of the surrounding element.
import wellClean from '@/assets/icons/well-clean.svg?raw' // tdesign custom (Card 1)
import chartLine from '@/assets/icons/chart-line.svg?raw' // tdesign:chart-line
import eyeOutline from '@/assets/icons/eye-outline.svg?raw' // mdi:eye-outline
import repeat from '@/assets/icons/repeat.svg?raw' // material-symbols:repeat
import waterAlert from '@/assets/icons/water-alert.svg?raw' // mdi:water-alert
import lineChartDown from '@/assets/icons/line-chart-down.svg?raw' // bx:line-chart-down
import warningOutline from '@/assets/icons/warning-outline.svg?raw' // material-symbols:warning-outline
import dust from '@/assets/icons/dust.svg?raw' // fluent:dust-20-filled
import smell from '@/assets/icons/smell.svg?raw' // mdi:smell
import calendar from '@/assets/icons/calendar.svg?raw' // uil:calender
import facebook from '@/assets/icons/facebook.svg?raw' // ic:baseline-facebook
import instagram from '@/assets/icons/instagram.svg?raw' // mdi:instagram

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
