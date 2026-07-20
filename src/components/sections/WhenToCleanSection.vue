<script setup lang="ts">
import AppGlyph from '../AppGlyph.vue'

// Order is row-major to match the design's two columns (col 1: water-alert,
// line-chart-down, warning-outline · col 2: dust, smell, calendar).
const signs = [
  { icon: 'water-alert', text: 'Voda je zakalená nebo zbarvená' },
  { icon: 'dust', text: 'Ve vodě se objevuje písek či sediment' },
  { icon: 'line-chart-down', text: 'Studna má nižší vydatnost než dříve' },
  { icon: 'smell', text: 'Voda změnila chuť nebo zápach' },
  { icon: 'warning-outline', text: 'Čerpadlo se často vypíná nebo běží naprázdno' },
  {
    icon: 'calendar',
    text: 'Studna nebyla čištěna více než 5–8 let (u méně používaných vrtů 2–4 roky).',
  },
]
</script>

<template>
  <section id="kdy-cistit" class="section when">
    <div class="container when__grid">
      <div class="when__content">
        <h2 class="section__title">Kdy je čas na čištění studny?</h2>
        <p class="section__subtitle when__subtitle">
          Včasné vyčištění může předejít nákladným opravám a obnovit správnou
          funkci studny.
        </p>
        <ul class="when__list">
          <li v-for="s in signs" :key="s.text" class="when__item">
            <span class="when__icon"><AppGlyph :name="s.icon" :size="24" /></span>
            <span>{{ s.text }}</span>
          </li>
        </ul>
      </div>

      <div class="when__media">
        <img
          src="/images/when-to-clean.png"
          alt="Čistá voda tekoucí z kohoutku"
          class="when__img"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.when {
  background: var(--surface);
}
.when__grid {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 3rem;
  align-items: center;
}
.when__subtitle {
  text-align: left;
  margin-bottom: 2rem;
}
.when__img {
  width: 100%;
  max-width: 496px;
  aspect-ratio: 1 / 1; /* square (Figma 496×496) */
  object-fit: cover;
  object-position: center;
  border-radius: 48px;
  border: 4px solid rgba(215, 226, 255, 0.3); /* #D7E2FF @ 30% (Figma) */
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.12);
}
.when__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem 1.75rem;
}
.when__item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: var(--text-soft);
  line-height: 1.5;
}
.when__icon {
  display: inline-flex;
  flex-shrink: 0;
  color: var(--blue); /* bare #003F87 glyph — no background chip (Figma) */
}

@media (max-width: 900px) {
  .when__grid {
    grid-template-columns: 1fr;
    gap: 2.25rem;
  }
  .when__media {
    order: -1;
    max-width: 24rem;
  }
}
@media (max-width: 520px) {
  .when__list {
    grid-template-columns: 1fr;
  }
}
</style>
