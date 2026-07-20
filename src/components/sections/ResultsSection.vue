<script setup lang="ts">
const steps = [
  {
    image: '/images/before-cleaning.png',
    alt: 'Studna na začátku čištění – zanesená jílem a pískem',
    title: 'Na začátku čištění',
    text: 'Vrt byl zanesený jílem a pískem.',
  },
  {
    image: '/images/during-cleaning.png',
    alt: 'Čištění studny v průběhu prací',
    title: 'V průběhu prací',
    text: 'Nasazení profi techniky. Odsáváme sedimenty ze dna, čistíme stěny vrtu a šetrně uvolňujeme přítoky vody.',
  },
  {
    image: '/images/after-cleaning.png',
    alt: 'Výsledný stav – kompletně regenerovaná studna',
    title: 'Výsledný stav',
    text: 'Kompletně regenerovaná studna. Vrt je bez usazenin, má obnovený průtok a poskytuje opět čistou vodu.',
  },
]
</script>

<template>
  <section id="vysledky" class="section results">
    <div class="container">
      <div class="section__head">
        <h2 class="section__title">Výsledek naší práce mluví za vše</h2>
      </div>

      <div class="results__grid">
        <figure v-for="s in steps" :key="s.title" class="results__item">
          <img :src="s.image" :alt="s.alt" class="results__img" loading="lazy" />
          <figcaption>
            <h3 class="results__title">{{ s.title }}</h3>
            <p class="results__text">{{ s.text }}</p>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.results {
  background: var(--surface);
}
.results__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 325px));
  justify-content: center;
  gap: 2rem;
}
.results__item {
  margin: 0;
}
.results__img {
  width: 100%;
  max-width: 325px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center;
  border-radius: 48px;
  box-shadow: var(--shadow-card);
}
.results__title {
  font-size: 1.05rem;
  margin: 1.1rem 0 0.5rem;
}
.results__text {
  font-size: 0.92rem;
  color: var(--muted);
  line-height: 1.65;
}

@media (max-width: 820px) {
  .results__grid {
    grid-template-columns: 1fr;
    max-width: 26rem;
    margin-inline: auto;
  }
}
</style>
