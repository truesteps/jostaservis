import validator from 'validator'
import { isValidPhoneNumber } from 'libphonenumber-js'

interface ContactPayload {
  name?: string
  phone?: string
  email?: string
  message?: string
  'bot-field'?: string

  elapsed?: number
  turnstileToken?: string
}

const MIN_FILL_MS = 1500

const json = (status: number, body: Record<string, unknown>): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })

const silentOk = (reason: string, ctx: Record<string, unknown> = {}): Response => {
  console.warn(`contact: dropped submission (${reason})`, ctx)
  return json(200, { ok: true })
}

const clean = (value: string, max: number): string =>
  value.replace(/[\x00-\x1f\x7f]/g, ' ').trim().slice(0, max)

function looksLikeSpam(message: string): boolean {
  if (/\[(url|link|img)[\]=]/i.test(message)) return true
  const links = (message.match(/\bhttps?:\/\/|\bwww\./gi) || []).length
  return links >= 2
}

async function verifyTurnstile(
  token: string | undefined,
  ip: string | null,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!token) return false
  const body = new URLSearchParams({ secret, response: token })
  if (ip) body.set('remoteip', ip)
  try {
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      },
    )
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return false
  }
}

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return json(405, { error: 'Method not allowed' })
  }

  const ip =
    req.headers.get('x-nf-client-connection-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    null

  let data: ContactPayload
  try {
    data = await req.json()
  } catch {
    return json(400, { error: 'Neplatný formát požadavku.' })
  }

  if (data['bot-field']) {
    return silentOk('honeypot', { ip })
  }

  // A too-fast fill is almost always a bot, but can catch a fast autofill+paste
  // user — so this returns a retryable error, not a silent OK (a human's retry
  // clears the threshold; an instant-POST bot keeps failing). Honeypot stays silent.
  const elapsed = Number(data.elapsed)
  if (!Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) {
    console.warn('contact: time-trap tripped', { ip, elapsed })
    return json(429, {
      error: 'Formulář byl odeslán příliš rychle. Zkuste to prosím znovu.',
    })
  }

  const name = data.name ? clean(data.name, 200) : ''
  const phone = data.phone ? clean(data.phone, 40) : ''
  const email = data.email?.trim() ?? ''
  const message = data.message?.trim() ?? ''

  if (!name || !email || !message) {
    return json(400, { error: 'Vyplňte prosím jméno, e-mail a zprávu.' })
  }
  if (!validator.isEmail(email) || email.length > 254) {
    return json(400, { error: 'Zadejte prosím platnou e-mailovou adresu.' })
  }
  if (phone && !isValidPhoneNumber(phone, 'CZ')) {
    return json(400, {
      error: 'Zadejte prosím platné telefonní číslo, nebo pole nechte prázdné.',
    })
  }
  if (message.length > 5000) {
    return json(422, { error: 'Zpráva je příliš dlouhá.' })
  }
  if (looksLikeSpam(message)) {
    return json(422, {
      error: 'Zpráva vypadá jako spam. Odeberte prosím odkazy, nebo nám zavolejte.',
    })
  }

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return json(403, {
      error: 'Ověření proti robotům selhalo. Zkuste to prosím znovu.',
    })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO
  const from = process.env.CONTACT_FROM || 'JOSTA web <poptavka@jostaservis.cz>'

  if (!apiKey || !to) {
    console.error('contact: missing RESEND_API_KEY or CONTACT_TO env var')
    return json(500, { error: 'Formulář není správně nastaven. Zavolejte nám prosím.' })
  }

  const text = [
    `Nová poptávka z webu jostaservis.cz`,
    ``,
    `Jméno:   ${name}`,
    `E-mail:  ${email}`,
    `Telefon: ${phone || '—'}`,
    ``,
    `Zpráva:`,
    message,
  ].join('\n')

  let res: Response
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: to.split(',').map((s) => s.trim()),
        reply_to: email,
        subject: `Nová poptávka z webu — ${name}`,
        text,
      }),
    })
  } catch (err) {
    console.error('contact: Resend request failed', err)
    return json(502, { error: 'Odeslání se nezdařilo. Zkuste to prosím znovu.' })
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error(`contact: Resend responded ${res.status}: ${detail}`)
    return json(502, { error: 'Odeslání se nezdařilo. Zkuste to prosím znovu.' })
  }

  return json(200, { ok: true })
}
