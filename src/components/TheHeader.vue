<script setup lang="ts">
import { ref } from 'vue'
import AppLogo from './AppLogo.vue'
import AppIcon from './AppIcon.vue'

const nav = [
  { href: '#sluzby', label: 'Naše služby' },
  { href: '#kdy-cistit', label: 'Kdy čistit' },
  { href: '#proc-my', label: 'Proč my' },
  { href: '#kde-pusobime', label: 'Kde působíme' },
  { href: '#kontakt', label: 'Kontakt' },
]

const open = ref(false)
</script>

<template>
  <header class="header">
    <div class="container header__inner">
      <AppLogo variant="light" />

      <nav class="header__nav" :class="{ 'is-open': open }">
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          @click="open = false"
        >
          {{ item.label }}
        </a>
      </nav>

      <a href="#kontakt" class="btn btn--primary header__cta">
        <AppIcon name="send" />
        Nezávazně poptat
      </a>

      <button
        class="header__burger"
        :aria-expanded="open"
        aria-label="Menu"
        @click="open = !open"
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: #fff;
  border-bottom: 1px solid var(--border);
}
.header__inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  min-height: 74px;
}
.header__nav {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  margin-left: auto;
}
.header__nav a {
  color: #424752;
  font-size: 0.92rem;
  font-weight: 500;
  transition: color 0.15s ease;
}
.header__nav a:hover {
  color: var(--blue);
}
.header__cta {
  flex-shrink: 0;
}
.header__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 0;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  cursor: pointer;
}
.header__burger span {
  width: 18px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
}

@media (max-width: 900px) {
  .header__cta {
    display: none;
  }
  .header__burger {
    display: flex;
    margin-left: auto;
  }
  .header__nav {
    position: absolute;
    top: 74px;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    margin-left: 0;
    background: #fff;
    border-bottom: 1px solid var(--border);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease;
  }
  .header__nav.is-open {
    max-height: 320px;
  }
  .header__nav a {
    width: 100%;
    padding: 0.9rem 1.25rem;
    border-top: 1px solid var(--border);
  }
}
</style>
