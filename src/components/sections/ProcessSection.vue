<template>
  <section id="jak-probiha" class="section process">
    <div class="container process__inner">
      <h2 class="section__title">Jak probíhá čištění?</h2>
      <p class="process__text">
        Každou zakázku zahajujeme <strong>posouzením technického stavu</strong>
        vrtu a celé soustavy. Následně <strong>odstraníme usazeniny</strong> ze
        dna vrtu, <strong>vyčistíme zanesené části</strong> a provedeme
        dezinfekci. Po dokončení <strong>doporučíme další péči</strong> a interval
        <strong>pravidelné údržby</strong>.
      </p>
      <p class="process__text">
        Používáme <strong>profesionální technické vybavení</strong>, které
        umožňuje účinné čištění s maximálním ohledem na konstrukci vrtané studny.
      </p>
    </div>
  </section>
</template>

<style scoped>
.process {
  background: var(--bg-alt);
}
.process__inner {
  max-width: 46rem;
  margin-inline: auto;
  text-align: center;
}
.process__text {
  margin-top: 1.5rem;
  font-size: 1.05rem;
  color: var(--text-soft);
  line-height: 1.8;
}
.process__text strong {
  color: var(--text);
  font-weight: 600;
}
.process__text + .process__text {
  margin-top: 1.25rem;
}
</style>
