<script setup lang="ts">
import { useHead } from '@unhead/vue'
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

useHead({
  title: 'Profesionální čištění vrtaných studní',
  meta: [
    {
      name: 'description',
      content:
        'JOSTA – profesionální čištění, obnova vydatnosti a údržba vrtaných studní ve Středočeském, Libereckém a Královéhradeckém kraji.',
    },
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
