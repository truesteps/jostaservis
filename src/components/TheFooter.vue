<script setup lang="ts">
  import { computed } from 'vue'
  import AppLogo from './AppLogo.vue'
  import AppIcon from './AppIcon.vue'
  import AppGlyph from './AppGlyph.vue'
  import ObfuscatedContact from './ObfuscatedContact.vue'

  const year = computed(() => new Date().getFullYear())

  const quickNav = [
    { href: '#uvod', label: 'Úvod' },
    { href: '#sluzby', label: 'Naše služby' },
    { href: '#kdy-cistit', label: 'Kdy čistit' },
    { href: '#jak-probiha', label: 'Náš postup' },
  ]
</script>

<template>
  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__brand">
        <AppLogo variant="dark" />
        <p class="footer__desc">
          Profesionální čištění a údržba vrtaných studní ve Středočeském a
          Severočeském kraji.
        </p>
        <div class="footer__social">
          <a
            href="https://www.facebook.com/people/JOSTA-%C4%8Ci%C5%A1t%C4%9Bn%C3%AD-a-servis-vrtan%C3%BDch-studn%C3%AD/61591463190978/"
            class="footer__social-link"
            aria-label="Facebook"
            target="_blank"
            rel="noopener nofollow"
          >
            <AppGlyph name="facebook" :size="24" />
          </a>
          <!--  ToDo: re-enable when instagram will be available
                      <a
                      href="#"
                      class="footer__social-link"
                      aria-label="Instagram"
                    ><AppGlyph name="instagram" :size="24" /></a>-->
        </div>
      </div>

      <div class="footer__col">
        <h3 class="footer__heading">Rychlá navigace</h3>
        <ul>
          <li v-for="item in quickNav" :key="item.href">
            <a :href="item.href">{{ item.label }}</a>
          </li>
        </ul>
      </div>

      <div class="footer__col">
        <h3 class="footer__heading">Kontakt</h3>
        <ul>
          <li class="footer__contact">
            <AppIcon name="phone" :size="16" />
            <ObfuscatedContact type="phone" v-slot="{ value, href, ready, buildLink }">
              <a
                v-if="ready"
                :href="href"
                class="footer__email"
                @mouseenter="buildLink"
                @focus="buildLink"
                @pointerdown="buildLink"
              >{{ value }}</a>
              <span v-else class="footer__email">Zobrazit číslo</span>
            </ObfuscatedContact>
          </li>
          <li class="footer__contact">
            <AppIcon name="mail" :size="16" />
            <ObfuscatedContact type="email" v-slot="{ value, href, ready, buildLink }">
              <a
                v-if="ready"
                :href="href"
                class="footer__email"
                @mouseenter="buildLink"
                @focus="buildLink"
                @pointerdown="buildLink"
              >{{ value }}</a>
              <span v-else class="footer__email">Zobrazit e-mail</span>
            </ObfuscatedContact>
          </li>
        </ul>
      </div>

      <div class="footer__col">
        <h3 class="footer__heading">Kdy volat?</h3>
        <div class="footer__hours-card">
          <p class="footer__hours">Po–Pá: 8:00 – 17:00</p>
          <p class="footer__hours-note">Nebo dle dohody.</p>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p>© {{ year }} JOSTA. Všechna práva vyhrazena.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  .footer {
    background: #0b1018;
    color: rgba(255, 255, 255, 0.8);
  }

  .footer__grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1fr;
    gap: 2.5rem;
    padding-block: 3.5rem;
  }

  .footer__desc {
    margin-top: 1.1rem;
    font-size: 1rem;
    max-width: 22rem;
    line-height: 1.625;
  }

  .footer__social {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .footer__social-link {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--accent);
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .footer__social-link:hover {
    background: var(--accent);
    color: var(--blue);
  }

  .footer__heading {
    color: #fff;
    font-size: 0.95rem;
    margin-bottom: 1rem;
  }

  .footer__col ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 0.875rem;
  }

  .footer__col a:hover {
    color: var(--accent);
  }

  .footer__contact {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .footer__contact svg {
    color: var(--accent);
    flex-shrink: 0;
  }

  .footer__email {
    cursor: pointer;
  }

  .footer__email:hover {
    color: var(--accent);
  }

  .footer__hours-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.0625rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .footer__hours {
    font-size: 0.875rem;
  }

  .footer__hours-note {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
  }

  .footer__bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .footer__bottom-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-block: 1.35rem;
    font-size: 0.82rem;
    opacity: 0.75;
  }

  .footer__legal {
    display: flex;
    gap: 1.5rem;
  }

  .footer__legal a:hover {
    color: var(--accent);
  }

  @media (max-width: 820px) {
    .footer__grid {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }

  @media (max-width: 520px) {
    .footer__grid {
      grid-template-columns: 1fr;
    }

    .footer__bottom-inner {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
