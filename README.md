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
  components/
    avatar/         Lazy R3F 3D avatar
    games/          The six games (each with route-split logic)
    home/           GitHub activity band
    layout/         Glass pill Navbar, Footer
    products/       Product case-study card
    pwa/            Service-worker registration, install prompt, notifications
    seo/            JSON-LD
    theme/          Theme provider + toggle
    ui/             Container, Section, BentoGrid, Card, Chip, Button, Reveal
  content/          Typed content: products, skills, education, games, profile
  lib/              GitHub stats, notifications
  utils/            cn, common helpers
public/
  models/           utkarsh.glb (3D avatar)
  sw.js             Hand-rolled service worker
scripts/
  generate-icons.mjs  Regenerate PWA icons (sharp)
```

## Content

Everything is editable as typed data — no CMS required:

- **Products** → `src/content/products.ts`
- **Skills** → `src/content/skills.ts`
- **Education** → `src/content/education.ts`
- **Profile / socials** → `src/content/profile.ts`

Regenerate app icons after tweaking the brand mark:

```bash
node scripts/generate-icons.mjs
```

## Deployment

Optimized for Vercel (or any Node 24 host). Set the optional env vars in your host,
then `pnpm build`.
