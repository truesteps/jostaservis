<script setup lang="ts">
import AppIcon from '../AppIcon.vue'
import ObfuscatedContact from '../ObfuscatedContact.vue'
</script>

<template>
  <section class="hero">
    <div class="hero__overlay" aria-hidden="true"></div>
    <div class="container hero__inner">
      <div class="hero__content">
        <h1 class="hero__title">Profesionální čištění<br />vrtaných studní</h1>
        <p class="hero__text">
          Obnovujeme výkon vrtaných studní a vracíme vodě její kvalitu.
          Zaměřujeme se na odstranění usazenin, sedimentů a nánosů, které snižují
          vydatnost vaší studny.
        </p>
        <div class="hero__actions">
          <a href="#kontakt" class="btn btn--primary">
            <AppIcon name="send" />
            Nezávazně poptat
          </a>
          <ObfuscatedContact
            type="phone"
            v-slot="{ value, href, ready, buildLink }"
          >
            <a
              :href="href"
              class="hero__phone"
              @mouseenter="buildLink"
              @focus="buildLink"
              @pointerdown="buildLink"
            >
              <span class="hero__phone-icon"><AppIcon name="phone" :size="20" /></span>
              <span class="hero__phone-text">
                <span class="hero__phone-label">Zavolat specialistu</span>
                <span class="hero__phone-number">{{
                  ready ? value : 'Zobrazit číslo'
                }}</span>
              </span>
            </a>
          </ObfuscatedContact>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  background: #002d5f url('/images/hero.png') right top / cover no-repeat;
  color: #fff;
  overflow: hidden;
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 63, 135, 0.9) 0%,
    rgba(0, 63, 135, 0.6) 50%,
    rgba(0, 63, 135, 0) 100%
  );
}
.hero__inner {
  position: relative;
  padding-block: clamp(3.5rem, 8vw, 6.5rem);
}
.hero__content {
  max-width: 40rem;
}
.hero__title {
  font-size: clamp(2.1rem, 5vw, 3.4rem);
  line-height: 1.1;
  color: #fff;
}
.hero__text {
  margin-top: 1.5rem;
  font-size: 1.08rem;
  color: rgba(255, 255, 255, 0.82);
  max-width: 34rem;
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-top: 2.25rem;
}
.hero__actions .btn--primary {
  min-height: 72px;
  padding-inline: 2rem;
  font-size: 1.05rem;
}
.hero__phone {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  min-height: 72px;
  padding: 0 1.75rem 0 1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.hero__phone-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: var(--accent);
  color: var(--accent-ink);
}
.hero__phone-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.hero__phone-label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.6);
}
.hero__phone-number {
  font-weight: 700;
  font-size: 1.05rem;
}
</style>
