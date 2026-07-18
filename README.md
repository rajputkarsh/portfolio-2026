# Portfolio 2026

A modern, fast, SEO-first developer portfolio — positioned around a **full-stack
developer & product engineer** who designs, builds, and ships products end to end.

Rebuilt from the ground up: **Next.js 16 · React 19 · Tailwind v4 · TypeScript**,
with a cool blue → indigo → violet design system, a real 3D avatar, an offline-capable
PWA, and a small arcade of games.

## Highlights

- **Design system** — Tailwind v4 CSS-first tokens, flash-free light/dark (`next-themes`),
  a modern-minimal look with ~5% glass/depth accents (glass nav, elevated cards, hover glow).
- **Hybrid IA** — a single-page bento **Home** plus dedicated `/products`, `/education`,
  and `/games` routes.
- **Server-first & SEO** — Server Components by default, per-route metadata, `Person`/`WebSite`
  JSON-LD, dynamic `sitemap.ts` + `robots.ts`, and a `next/og` OpenGraph image.
- **Real content** — products, skills, and education live as typed content in `src/content/`.
- **Live GitHub activity** — commit band via the GitHub API + ISR (graceful fallback).
- **3D avatar** — React Three Fiber, lazy-loaded off the critical path.
- **PWA** — installable, offline fallback, hand-rolled service worker, generated icons,
  and (opt-in) push notifications.
- **Games** — 2048, Tic-Tac-Toe (minimax AI), Snakes, Tetris, Minesweeper, and Klondike
  Solitaire — all in Tailwind, route-split.
- **Tested** — Vitest + Testing Library over game logic and utilities.

## Tech stack

| Area      | Choice                                         |
| --------- | ---------------------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack, PPR-ready)  |
| UI        | React 19, Tailwind CSS v4, `motion`            |
| Language  | TypeScript                                     |
| Theming   | `next-themes` (class strategy)                 |
| 3D        | three, @react-three/fiber, @react-three/drei   |
| Push      | Firebase Cloud Messaging (optional)            |
| Tests     | Vitest, @testing-library/react                 |
| Tooling   | ESLint 9 (flat), Prettier, Husky + lint-staged |
| Runtime   | Node 24, pnpm                                  |

## Getting started

```bash
pnpm install
cp .env.example .env.local   # optional — see below
pnpm dev                     # http://localhost:3000
```

> The app runs and builds with **no** environment variables. See `.env.example`
> for the optional keys (GitHub activity, push notifications).

## Scripts

| Script            | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| `pnpm dev`        | Dev server (Turbopack)                               |
| `pnpm build`      | Production build                                     |
| `pnpm start`      | Serve the production build (required to test PWA/SW) |
| `pnpm test`       | Run the Vitest suite                                 |
| `pnpm test:watch` | Vitest in watch mode                                 |
| `pnpm typecheck`  | `tsc --noEmit`                                       |
| `pnpm lint`       | ESLint                                               |
| `pnpm format`     | Prettier write                                       |

> The **service worker registers in production only**. To exercise install/offline/push,
> run `pnpm build && pnpm start`.

## Project structure

```
src/
  app/              App Router routes, metadata, manifest, robots, sitemap, OG image
    products/[slug]/  Per-product case-study page + OG image (statically generated)
    not-found.tsx     Branded 404
  components/
    avatar/         Lazy R3F 3D avatar
    games/          The six games (each with route-split logic)
    home/           GitHub activity band + contribution calendar
    layout/         Glass pill Navbar, Footer
    products/       Product case-study card
    pwa/            Service-worker registration, install prompt, notifications
    seo/            JSON-LD
    theme/          Theme provider + toggle
    ui/             Container, Section, BentoGrid, Card, Chip, Button, Reveal
  content/          Typed content: products, skills, education, games, profile
  lib/              GitHub stats, contribution maths, structured data, notifications
  utils/            cn, common helpers
public/
  models/           Desk-scene GLBs (avatar, laptop, plant, coffee, scandi)
  products/         Product screenshots (.webp)
  sw.js             Hand-rolled service worker
scripts/
  generate-icons.mjs        Regenerate PWA icons (sharp)
  screenshot-products.mjs   Capture product screenshots (puppeteer)
  screenshot-games.mjs      Capture game screenshots (puppeteer)
```

## Content

Everything is editable as typed data — no CMS required:

- **Products** → `src/content/products.ts`
- **Skills** → `src/content/skills.ts`
- **Education** → `src/content/education.ts`
- **Profile / socials** → `src/content/profile.ts`

### Products

Each entry in `PRODUCTS` generates a statically-rendered detail page at
`/products/<slug>`, with its own metadata, canonical, OG image and
`SoftwareApplication` JSON-LD. Two optional fields drive it:

- **`caseStudy`** — `role` / `timeline` / `problem` / `build` / `outcome` /
  `highlights`. Every field is optional and each section renders only when
  filled, so partial copy is fine. Leave `outcome` empty until you have a real,
  verifiable number.
- **`status`** — set `"offline"` when a hosted demo stops responding. The page
  is then `noindex`, dropped from the sitemap and structured data, its
  screenshot is suppressed (the capture would just be the host's error page),
  and the live-link CTA is replaced with an "archived" note. The product stays
  listed as portfolio history. Recheck with:

  ```bash
  curl -s -o /dev/null -w "%{http_code}\n" -L <product-url>
  ```

Regenerate app icons after tweaking the brand mark:

```bash
node scripts/generate-icons.mjs
```

Recapture product / game screenshots (puppeteer + sharp). Pass slugs to limit
the run, and `WAIT_MS` for slow client-rendered apps:

```bash
node scripts/screenshot-products.mjs              # all products
WAIT_MS=9000 node scripts/screenshot-products.mjs astroniq heera
node scripts/screenshot-games.mjs
```

## Deployment

Optimized for Vercel (or any Node 24 host). Set the optional env vars in your host,
then `pnpm build`.
