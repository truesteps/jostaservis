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
- **Contact form** (`ContactSection.vue`) is client-only with no backend — `onSubmit`
  just shows a confirmation. Wire it to an email service / API endpoint before launch.
- Path alias `@` → `src/`; `<script setup lang="ts">` everywhere; components PascalCase.
