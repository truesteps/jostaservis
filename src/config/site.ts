export const SITE_URL = 'https://jostaservis.cz'

export const SITE_NAME = 'JOSTA'

export const SITE_TITLE = 'JOSTA — Čištění vrtaných studní'

export const SITE_DESCRIPTION =
  'JOSTA – profesionální čištění, obnova vydatnosti a údržba vrtaných studní ve Středočeském, Libereckém a Královéhradeckém kraji.'

export const OG_IMAGE = `${SITE_URL}/images/og-image.png`

export const BUSINESS = {
  telephone: '+420721466388',
  facebook:
    'https://www.facebook.com/people/JOSTA-%C4%8Ci%C5%A1t%C4%9Bn%C3%AD-a-servis-vrtan%C3%BDch-studn%C3%AD/61591463190978/',
  areaServed: ['Středočeský kraj', 'Liberecký kraj', 'Královéhradecký kraj'],
  openingHours: 'Mo-Fr 08:00-17:00',
} as const

export const absUrl = (path = '/') =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
