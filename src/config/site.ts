// Single source of truth for site-wide SEO / NAP (name, address, phone) data.
// Change the production domain here and everything (canonical, og:url, sitemap,
// JSON-LD) follows. Keep the trailing slash off SITE_URL.

export const SITE_URL = 'https://jostaservis.cz'

export const SITE_NAME = 'JOSTA'

export const SITE_TITLE = 'JOSTA — Čištění vrtaných studní'

export const SITE_DESCRIPTION =
  'JOSTA – profesionální čištění, obnova vydatnosti a údržba vrtaných studní ve Středočeském, Libereckém a Královéhradeckém kraji.'

// Absolute URL of the social-share (Open Graph) image, 1200×630.
export const OG_IMAGE = `${SITE_URL}/images/og-image.png`

// Business contact / social. NOTE: the phone is intentionally exposed here for
// local-SEO structured data (per project decision); the e-mail stays obfuscated
// via ObfuscatedContact and is deliberately NOT included below.
export const BUSINESS = {
  telephone: '+420721466388',
  facebook:
    'https://www.facebook.com/people/JOSTA-%C4%8Ci%C5%A1t%C4%9Bn%C3%AD-a-servis-vrtan%C3%BDch-studn%C3%AD/61591463190978/',
  areaServed: ['Středočeský kraj', 'Liberecký kraj', 'Královéhradecký kraj'],
  openingHours: 'Mo-Fr 08:00-17:00',
} as const

// Helper for building absolute URLs from root-relative paths.
export const absUrl = (path = '/') =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
