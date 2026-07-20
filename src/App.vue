<script setup lang="ts">
import { useHead } from '@unhead/vue'
import {
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
  OG_IMAGE,
  BUSINESS,
} from '@/config/site'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: BUSINESS.telephone,
  image: OG_IMAGE,
  logo: `${SITE_URL}/images/logo.svg`,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CZ',
  },
  areaServed: BUSINESS.areaServed.map((name) => ({
    '@type': 'AdministrativeArea',
    name,
  })),
  openingHours: BUSINESS.openingHours,
  sameAs: [BUSINESS.facebook],
}

useHead({
  titleTemplate: (title) =>
    title ? `${title} — ${SITE_NAME}` : SITE_TITLE,
  htmlAttrs: { lang: 'cs' },
  meta: [
    { name: 'theme-color', content: '#003F87' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:locale', content: 'cs_CZ' },
    { property: 'og:image', content: OG_IMAGE },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: SITE_TITLE },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: OG_IMAGE },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
