<script setup lang="ts">
import AppIcon from '../AppIcon.vue'

const reasons = [
  'Specializace na vrtané studny',
  'Profesionální technické vybavení',
  'Individuální přístup ke každé zakázce',
  'Spolehlivost, kvalita a pečlivě odvedená práce',
  'Rychlé termíny realizace',
  'Férové a transparentní ceny',
]
</script>

<template>
  <section id="proc-my" class="section why">
    <div class="container why__grid">
      <div class="why__intro">
        <h2 class="why__title">Proč si vybrat právě nás?</h2>
        <p class="why__lead">
          Protože věříme, že každá rodina si zaslouží mít snadný přístup k čisté
          a bezpečné vodě z vlastního zdroje.
        </p>
      </div>

      <ul class="why__list">
        <li v-for="r in reasons" :key="r" class="why__item">
          <span class="why__check"><AppIcon name="check-circle" :size="26" :stroke="2" /></span>
          {{ r }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.why {
  background: var(--blue);
  color: #fff;
}
.why__grid {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 3rem;
  align-items: center;
}
.why__title {
  color: #fff;
  font-size: clamp(1.7rem, 3.5vw, 2.3rem);
}
.why__lead {
  margin-top: 1.25rem;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 26rem;
}
.why__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.35rem 1.75rem;
}
.why__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.98rem;
  font-weight: 500;
}
.why__check {
  display: inline-flex;
  flex-shrink: 0;
  /* outlined circle + check, both #A1EFFF line-art (Figma check_circle_outline) */
  color: var(--accent-light);
}

@media (max-width: 900px) {
  .why__grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
@media (max-width: 480px) {
  .why__list {
    grid-template-columns: 1fr;
  }
}
</style>
