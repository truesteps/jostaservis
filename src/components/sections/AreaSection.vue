<script setup lang="ts"></script>

<template>
  <section id="kde-pusobime" class="section area">
    <div class="container area__grid">
      <div class="area__map">
        <div class="area__map-panel">
          <img
            src="/images/where-we-operate.png"
            alt="Mapa krajů České republiky, kde působíme"
            class="area__map-img"
            width="510"
            height="510"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div class="area__content">
        <h2 class="section__title">Kde všude působíme?</h2>
        <p class="area__lead">
          Primárně čistíme ve
          <strong>Středočeském, Libereckém a Královéhradeckém kraji</strong>
        </p>
        <p class="area__note">
          (Okolí Prahy, Kladno, Mělník, Mladá Boleslav, Neratovice, Litoměřice,
          Louny, Most, Chomutov, Teplice, Ústí nad Labem atd.)
        </p>
        <p class="area__text">
          Po předchozí dohodě realizujeme zakázky po celé České republice.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.area {
  background: var(--surface);
}
.area__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}
.area__map {
  justify-self: start;
  width: 100%;
  max-width: 544px;
  background: var(--bg);
  border: 1px solid var(--card-border);
  border-radius: 40px;
  padding: 1.0625rem;
}
.area__map-panel {
  background: var(--surface);
  border-radius: 24px;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  display: grid;
  place-items: center;
}
.area__map-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}
.area__lead {
  margin-top: 1.25rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-soft);
}
.area__lead strong {
  font-weight: 700;
}
.area__note {
  margin-top: 1rem;
  color: var(--text-soft);
  line-height: 1.7;
}
.area__text {
  margin-top: 1rem;
  color: var(--text-soft);
}

@media (max-width: 900px) {
  .area__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .area__content {
    order: -1;
  }
  .area__map {
    justify-self: center;
  }
}
</style>
