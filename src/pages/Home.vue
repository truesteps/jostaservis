<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { SITE_URL, SITE_NAME } from '@/config/site'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
import WhenToCleanSection from '@/components/sections/WhenToCleanSection.vue'
import ProcessSection from '@/components/sections/ProcessSection.vue'
import ResultsSection from '@/components/sections/ResultsSection.vue'
import WhyUsSection from '@/components/sections/WhyUsSection.vue'
import AreaSection from '@/components/sections/AreaSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

const pageTitle = 'Profesionální čištění vrtaných studní'
const pageDescription =
  'JOSTA – profesionální čištění, obnova vydatnosti a údržba vrtaných studní ve Středočeském, Libereckém a Královéhradeckém kraji.'

useHead({
  title: pageTitle,
  link: [{ rel: 'canonical', href: `${SITE_URL}/` }],
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: `${pageTitle} — ${SITE_NAME}` },
    { property: 'og:description', content: pageDescription },
    { property: 'og:url', content: `${SITE_URL}/` },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
  ],
})
</script>

<template>
  <TheHeader />
  <main id="uvod">
    <HeroSection />
    <ServicesSection />
    <WhenToCleanSection />
    <ProcessSection />
    <ResultsSection />
    <WhyUsSection />
    <AreaSection />
    <ContactSection />
  </main>
  <TheFooter />
</template>
