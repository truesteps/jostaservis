<script setup lang="ts">
import AppGlyph from '../AppGlyph.vue'

const services = [
  {
    icon: 'well-clean',
    title: 'Čištění vrtaných studní',
    text: 'Odstranění usazenin, jemných sedimentů, jílu, písku či bahna, které se během let usazují ve vrtu.',
  },
  {
    icon: 'chart-line',
    title: 'Obnovení vydatnosti studny',
    text: 'Pomáháme obnovit průtok vody a zlepšit celkovou funkčnost studny.',
  },
  {
    icon: 'eye-outline',
    title: 'Kontrola technického stavu',
    text: 'Vyhodnotíme stav vrtu a celé soustavy domácí vodárny. V případě potřeby kompletní servis domácí vodárny.',
  },
  {
    icon: 'repeat',
    title: 'Preventivní údržba',
    text: 'Pravidelná péče, která předchází poruchám a prodlužuje životnost studny.',
  },
]
</script>

<template>
  <section id="sluzby" class="section services">
    <div class="container">
      <div class="section__head">
        <h2 class="section__title">Naše služby</h2>
        <p class="section__subtitle">
          Používáme moderní metody pro dosažení maximální čistoty a obnovu
          průtoku studny.
        </p>
      </div>

      <div class="services__grid">
        <article v-for="s in services" :key="s.title" class="card">
          <span class="card__icon"><AppGlyph :name="s.icon" :size="28" /></span>
          <h3 class="card__title">{{ s.title }}</h3>
          <p class="card__text">{{ s.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services {
  background: var(--bg);
}
.services__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.card {
  background: var(--surface);
  border: 1px solid var(--card-border);
  border-radius: 24px;
  padding: 1.5625rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}
.card__icon {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--icon-chip);
  color: var(--blue);
  margin-bottom: 1rem;
}
.card__title {
  font-size: 1.25rem;
  line-height: 1.4;
  margin-bottom: 0.6rem;
}
.card__text {
  font-size: 1rem;
  color: var(--text-soft);
  line-height: 1.625;
}

@media (max-width: 960px) {
  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 520px) {
  .services__grid {
    grid-template-columns: 1fr;
  }
}
</style>
