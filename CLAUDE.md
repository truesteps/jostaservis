# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`jostaservis` — a single-page marketing website for **JOSTA**, a Czech well-cleaning
service (čištění vrtaných studní). All UI copy is **hardcoded Czech**; there is no
i18n and none should be added.

## Commands

```bash
npm run dev        # Vite dev server (hot reload)
npm run build      # vue-tsc typecheck, then vite-ssg static build → dist/
npm run preview    # serve the built dist/ locally
npm run typecheck  # vue-tsc --noEmit only
```

There is no test suite. `npm run build` is the primary correctness gate — it runs
`vue-tsc` first, so type errors fail the build.

## Architecture

Vue 3 (`<script setup lang="ts">`) + Vite, statically pre-rendered with **vite-ssg**
so every page ships as fully-rendered HTML for SEO. This is not a runtime SSR
server; the output in `dist/` is static files.

- **Entry / SSG bootstrap**: `src/main.ts` exports `createApp = ViteSSG(...)`. Router
  options (including `scrollBehavior` for anchor scrolling) live here.
- **Routing**: `src/router/index.ts`. The site is **one route** (`/`) rendering
  `src/pages/Home.vue`. Navigation is in-page anchors (`#sluzby`, `#kdy-cistit`,
  `#proc-my`, `#kde-pusobime`, `#kontakt`, `#jak-probiha`) — not separate routes.
  vite-ssg pre-renders one HTML file per route listed here.
- **Page composition**: `Home.vue` stacks the sections in
  `src/components/sections/` (Hero → Services → WhenToClean → Process → Results →
  WhyUs → Area → Contact), wrapped by `TheHeader` / `TheFooter`.
- **SEO / head**: `useHead()` from `@unhead/vue`. Site-wide defaults (titleTemplate,
  `lang="cs"`) in `src/App.vue`; per-page title/description in `Home.vue`.
- **Styling**: global tokens + primitives (`.container`, `.section`, `.btn`) in
  `src/styles/main.css` via CSS custom properties (brand palette: `--navy`, `--blue`,
  `--accent`). Everything else is component-scoped `<style scoped>`. No CSS framework.
- **Icons** — two complementary components, both `currentColor` (size = a `size` prop):
  - `AppIcon.vue`: hand-rolled inline-SVG **UI/stroke** set keyed by name (`PATHS` map,
    24×24, stroke). Used for chrome — phone, mail, send, check, map-pin, shield-check.
  - `AppGlyph.vue`: the **content icons taken from the Figma design**, downloaded from
    their source sets (Iconify) into `src/assets/icons/*.svg` and inlined via `?raw`.
    Names match the files (`chart-line`, `eye-outline`, `repeat`, `water-alert`,
    `line-chart-down`, `warning-outline`, `dust`, `smell`, `calendar`, `facebook`,
    `instagram`, plus the Figma-exported `well-clean`). To add one, download the SVG to
    that dir (ensure `fill/stroke="currentColor"`) and register it in `AppGlyph.vue`.

## Conventions & gotchas

- **`@unhead/vue` must stay on v2 (`^2.x`)** to match `vite-ssg`'s own dependency.
  Installing v3 creates a second head context — `useHead()` still runs but its tags
  are silently dropped from the SSG output (title/description/lang fall back to the
  static `index.html`). Verify after head changes: `grep '<title>' dist/index.html`.
- **Assets** live in `public/images/` and are referenced by absolute root paths
  (`/images/hero.png` etc.) so they work in both dev and the SSG build. The
  client-supplied images are wired in: `hero.png` (Hero background), `when-to-clean.png`
  (WhenToClean), `before-/during-/after-cleaning.png` (Results), `where-we-operate.png`
  (Area map). Content `<img>`s use `object-fit: contain` + `object-position: center`.
- **Logo** (`AppLogo.vue`) inlines `public/images/logo.svg` (the full "JOSTA" wordmark +
  tagline lockup). It renders in the original brand colors as-is (royal-blue `#003F87`
  wordmark/tagline + cyan `#16BCE1` accent); do **not** recolor its fills.
- **Colors are matched to the Figma design** (`Pepa-Web`, node `111:3`). Key tokens in
  `main.css`: brand royal blue `#003F87` (`--blue`; why-us band, contact panel), design
  cyan `#58E6FF` (`--accent`; CTAs & accents — this is the design's interactive cyan,
  taken from the hero CTA rect and the icon-chip tint, **not** the logo's `#16BCE1`),
  dark cyan-ink `#001F25` (`--accent-ink`; label/icon color on the light-cyan CTAs —
  primary buttons use dark text, never white), headings `#191c21` (`--text`), body copy
  & nav links `#424752` (`--text-soft`), section bg `#f2f8fc` (`--bg`), card border
  `rgba(194,198,212,0.3)` (`--card-border`), icon tint `rgba(88,230,255,0.25)`
  (`--icon-chip`), footer bg `#0b1018`. The header is **white** (`#fff`) with `#424752`
  nav links — the `light` logo variant sits on it in original blue; the footer is dark
  with the `dark` logo variant (white wordmark + cyan accent). Note the logo keeps its
  own inline `#16BCE1` cyan — do not conflate it with the `#58E6FF` UI accent.
- **Hero** (`HeroSection.vue`) layers the brand-blue left-to-right gradient
  (`.hero__overlay`, 90deg, 0.9→0.6→0 alpha) over `hero.png`. The two CTAs are the
  design's 72px pills: the primary is solid `--accent` cyan with dark `--accent-ink`
  text; the phone button is a frosted-glass pill (white 10% + `backdrop-filter:
  blur(12px)` + subtle border) with a solid cyan circle holding a dark phone icon.
- **Contact details are anti-scraping** — both the **email and the phone number** run
  through the renderless `src/components/ObfuscatedContact.vue` (`type="email"` /
  `type="phone"`). The value is base64-encoded (in the component's `CONTACTS` map) and
  assembled in-browser: the visible text appears once the component **mounts**
  (`ready`); the clickable `mailto:` / `tel:` href is built only on first
  **hover/focus/pointer-down** (`buildLink`, `@pointerdown` makes the first mobile tap
  work). Both are therefore absent from the pre-rendered HTML *and* the JS bundle as
  plaintext. Do **not** hardcode the email/phone as plaintext or a `mailto:`/`tel:` in
  markup — route every occurrence through this component (slot props
  `{ value, href, ready, buildLink }`; the pre-mount fallback shows "Zobrazit e-mail" /
  "Zobrazit číslo"). To change an address/number, update the base64 parts in `CONTACTS`
  (`node -e "console.log(Buffer.from('...').toString('base64'))"`); parts are
  concatenated verbatim so keep separators (`@`, spaces) inside the encoded text.
  Verify after builds: `grep -c '466 388' dist/index.html` should be `0`.
- **Contact form** (`ContactSection.vue`) posts JSON to a Netlify Function
  (`netlify/functions/contact.ts`), which relays the message by e-mail via **Resend**.
  This replaced Netlify Forms (no 100-submission cap; receiver is env-configurable).
  Env vars (set in the Netlify UI, not in `netlify.toml`): `RESEND_API_KEY`,
  `CONTACT_TO` (recipient — comma-separate for several), optional `CONTACT_FROM`
  (sender on a Resend-verified domain; defaults to `JOSTA web <poptavka@jostaservis.cz>`).
  Verify the `jostaservis.cz` domain in Resend before launch. The function uses
  Netlify Functions v2 (web `Request`/`Response`, global `fetch`) and lives outside
  `tsconfig`'s `include`, so `vue-tsc` skips it; Netlify bundles it with esbuild
  (`[functions] node_bundler` in `netlify.toml`) — including its two runtime deps
  (`validator`, `libphonenumber-js`), which stay server-only and never enter the
  client bundle.
- **Contact-form field validation** runs on both sides, but with different rigor by
  design. The **server** (`contact.ts`) is authoritative: e-mail via
  `validator.isEmail` (max 254), phone (optional) via libphonenumber-js
  `isValidPhoneNumber(phone, 'CZ')` — real numbering-plan validation, not a
  digit count. It also `clean()`s `name`/`phone` (strips control chars incl. CR/LF,
  caps length) so they can't inject into the e-mail subject/headers. The **client**
  (`ContactSection.vue`) keeps a lightweight regex check (`EMAIL_RE`/`PHONE_RE`, 9–15
  digits) purely for instant feedback — it deliberately does **not** pull in
  libphonenumber-js (would bloat the marketing bundle by ~100 KB); the server is the
  real gate and its Czech error surfaces via `errorMessage` if the loose client check
  passes something the server rejects.
- **Contact-form bot protection** is layered, all validated in the function:
  (1) the `bot-field` **honeypot**; (2) a **time-trap** — the client stamps
  `renderedAt` on mount and sends the fill **duration** `elapsed` (a duration, not
  an absolute timestamp, so client/server clock skew can't false-positive a real
  lead); the function rejects anything faster than `MIN_FILL_MS` (1.5 s). There is
  deliberately **no upper bound** (a long fill = tab left open = a real user, not
  spam); (3) a **spam-content** heuristic (`looksLikeSpam` — BBCode or ≥2 links);
  (4) **Cloudflare Turnstile**, *optional & env-gated*. Turnstile activates only
  when both keys are set: `VITE_TURNSTILE_SITE_KEY` (public, inlined at build)
  renders the `.cf-turnstile` widget (script in `index.html`) and
  `TURNSTILE_SECRET_KEY` (secret) drives server `verifyTurnstile`. With no keys, the
  widget doesn't render and verification is skipped, so the form still works — but
  Turnstile is the only real rate-limiter (the function is stateless), so **enable
  it before launch**. The **honeypot** failure returns a silent `{ok:true}` (a real
  user never fills it, so no signal is leaked to bots); the **time-trap** instead
  returns a real retryable `429` (it can occasionally catch a fast autofill+paste
  human, and a silent OK there would lose the lead — a human's retry clears the
  threshold). Both `console.warn` server-side so drops stay visible to the operator.
  Content/Turnstile failures return a real Czech error the form surfaces via
  `errorMessage`. All env vars are documented in `.env.example`
  (`.env` is gitignored).
- Path alias `@` → `src/`; `<script setup lang="ts">` everywhere; components PascalCase.
