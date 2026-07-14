# Portfolio 2026 — Modernization Implementation Plan

> A phase-wise plan to rebuild a Next.js developer-portfolio PWA as a fast, SEO-first,
> product-engineer-positioned site. The legacy app lives in `old_code/` (reference only, git-ignored)
> and the new app is a **fresh scaffold** at the repository root.

---

## 1. Vision & Positioning

**Positioning:** A _full-stack developer who is also a product engineer_ — someone who thinks
in **product and business alongside tech**. Projects are presented as **shipped products with
outcomes and impact**, not just tech-stack lists. This shapes copy, information architecture,
and structured data.

**Three non-negotiable pillars, threaded through every phase:**

1. **SEO** — server-first rendering, complete metadata, structured data, dynamic OG images.
2. **Speed** — minimal client JS, lazy-loaded heavy modules, enforced Core Web Vitals budget.
3. **Fresh look** — modern-minimal design system with ~5% glass/depth accents.

---

## 2. Target Stack

| Area            | Old                                            | New (target — verify latest stable at execution)    |
| --------------- | ---------------------------------------------- | --------------------------------------------------- |
| Framework       | Next.js 15.0.2                                 | **Next.js 16** (App Router, PPR)                    |
| Runtime         | React 18.3.1                                   | **React 19**                                        |
| Language        | TypeScript 5.6                                 | TypeScript (latest)                                 |
| Styling         | Tailwind 3 + SCSS + styled-components + rebass | **Tailwind v4** (CSS-first `@theme`) + minimal SCSS |
| State           | MobX 6 (+ unused Redux)                        | **Zustand** / `useReducer` (games only)             |
| Animation       | Framer Motion 11                               | **`motion`** package                                |
| Data            | Firebase 11 (Firestore + FCM)                  | Firebase (latest) — lazy singleton                  |
| PWA             | `@ducanh2912/next-pwa`                         | Evaluate **Serwist** vs. upgraded next-pwa          |
| 3D              | three 0.170 + R3F + drei                       | Latest R3F stack (lazy-loaded)                      |
| Lint            | ESLint 9 (`.eslintrc.json`)                    | ESLint 9 **flat config**                            |
| Node            | —                                              | **Node 24** (`.nvmrc`)                              |
| Package manager | npm                                            | npm (default; confirm)                              |

**Removed entirely:** `@reduxjs/toolkit` (unused), `rebass`, `styled-components`, `mobx`,
`react-transition-group`, `react-easy-swipe`, `lodash` (→ native / `es-toolkit`).

---

## 3. Cross-Cutting Pillars (apply to every phase)

### 3.1 SEO

- **Server Components by default.** The old `HomeContainer` was `"use client"` only to fire an
  analytics pageview — this kept content out of server-rendered HTML. Content renders on the server (SSG/ISR);
  client-only concerns (analytics, motion) live in thin leaf components.
- **Metadata API** per route via `generateMetadata` — keyword-tuned titles/descriptions, canonical URLs.
- **Dynamic OG images** with `next/og` (`ImageResponse`) — per page/product social cards.
- **Structured data (JSON-LD):** `Person`, `WebSite`, `BreadcrumbList`, `SoftwareApplication`/`CreativeWork`
  for products (modernize the existing `schemaMarkup` action).
- `robots.ts` + dynamic `sitemap.ts`, semantic HTML, strict heading hierarchy, real `alt` text.
- **Gate:** Lighthouse SEO = 100.

### 3.2 Speed

- Minimize `"use client"`; ship far less JS.
- **Lazy-load off the critical path:** Three.js/R3F avatar and all games via `next/dynamic` — never in the initial bundle.
- **Defer analytics** (GA / Hotjar / Clarity) via `next/script` `lazyOnload` / `afterInteractive`.
- `next/image` everywhere (correct `sizes`, `priority` on LCP image); `next/font` with `display: swap` + subsetting.
- Adopt Next 16 **Partial Prerendering** (static shell + streamed dynamic data).
- **Bundle analyzer** in CI; enforce a perf budget.
- **Gate:** Lighthouse Perf ≥ 95 · LCP < 2.0s · CLS < 0.05 · INP < 200ms.

### 3.3 Fresh Look — Design System

- **Modern-minimal** foundation: typography-led, generous whitespace, restrained.
- **~5% glass/depth accents only:** navbar backdrop-blur, soft elevated cards, gentle hover glows. Everything else flat/fast.
- **Accent palette:** cool **blue / indigo / violet**, tuned for light + dark, WCAG-checked.
- **Motion:** tasteful, subtle entrance/scroll reveals; honors `prefers-reduced-motion`.
- Tokens (color, type scale, spacing, radius, shadow/elevation) defined once in the Tailwind v4 `@theme` layer.

---

## 4. Phased Plan

### Phase 0 — Fresh Scaffold & Toolchain ✅

**Goal:** an empty-but-running modern app shell.

- [x] Verify latest stable versions — Next **16.2.10**, React **19.2.7**, Tailwind **4.3.2** (via npm).
- [x] `create-next-app` merged into repo root (App Router, TS, Tailwind v4, ESLint flat, `src/`, `@/*` alias, Turbopack) — installed with **pnpm**.
- [x] Toolchain: Prettier (+ tailwind plugin), ESLint 9 flat config (ignores `old_code/`), Husky + lint-staged pre-commit, `.nvmrc` (Node 24), `packageManager` pinned.
- [x] Port `.env.example`; `old_code/` git-ignored + excluded from tsconfig/eslint.
- [x] Port dependency-light modules: `constants/`, `interfaces/`, `utils/` (common, analyticsEvents), `assets/` (added `dayjs`).
- **Deliverable met:** `pnpm build` ✓ · `typecheck` ✓ · `lint` ✓ · `format` ✓ · dev server Ready in ~200ms.

### Phase 1 — Theme System & Design Tokens ⭐ ✅

**Goal:** coherent, flash-free theming as the foundation.

- [x] Tailwind v4 CSS-first `@theme` in `globals.css`: cool **blue→indigo→violet** palette, cool neutrals, semantic tokens, radius + soft-shadow scales, modern type (Plus Jakarta Sans + JetBrains Mono).
- [x] Glass/depth accent `@utility`s: `glass`, `card-elevated`, `hover-glow`, `gradient-brand`, `text-gradient`, `bg-aurora`, `bg-grid`.
- [x] `next-themes` wired (class strategy, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`) + `suppressHydrationWarning`; flash-free CSS-driven `ThemeToggle` (no old hardcoded `light` class).
- [x] Folded useful global styles (scrollbar, selection, `fade-in`) re-skinned to the new palette; SCSS partials superseded by tokens.
- **Deliverable met:** single flash-free theming source; verified light + dark + system detection in-browser. Temporary design-system preview at `src/app/page.tsx` (replaced in Phase 3).

### Phase 2 — Core Layout & Shared Components ✅

**Goal:** shell, navigation, transitions — **redesigned, not ported.**

> Design direction (confirmed): **Hybrid IA** (single-page scroll Home + dedicated Products/Education/Games routes) · **bento & asymmetric** layouts · **floating glass pill** nav. Old components are a content/behavior reference only — reimagine UI, components, and layouts.

- [x] **Floating glass pill nav** with animated active indicator (motion `layoutId`), mobile dropdown, brand + `ThemeToggle` — `src/components/layout/Navbar.tsx`.
- [x] New **Footer** (socials from config) + shared primitives: `Container`, `Section`/`SectionHeading`, `BentoGrid`/`BentoCard`, `Card`, `Chip`, `Button`, `Reveal` — `src/components/ui/*`.
- [x] Motion via **`motion`** package: reduced-motion-safe scroll reveals + hover-glow micro-interactions (replaces old curtain wipe / `react-transition-group` / `react-easy-swipe`).
- [x] App shell in root layout (nav + main + footer); hybrid routes `/`, `/products`, `/education`, `/games` + `/styleguide`; per-route metadata.
- **Deliverable met:** navigable redesigned shell; build ✓ typecheck ✓ lint ✓; verified in-browser (light+dark, nav active states, bento layout, footer) — 6 routes prerendered.

### Phase 3 — Feature Pages (Home / Products / Education) ✅

**Goal:** primary content, server-rendered, product-engineer-positioned — **freshly composed layouts.**

**Data decision:** content moved to **local typed files** (`src/content/*`) — Firestore dropped for content (better SEO/speed, no creds). Products pulled from the live site (22 real products w/ live links). GitHub stats fetched live via GitHub API + ISR, with graceful fallback until `GITHUB_TOKEN` is set.

- [x] **Single-page Home** bento narrative: hero → "how I work" approach bento → grouped skill chips → featured products → GitHub activity band + journey → contact CTA.
- [x] **/products** — real case-study cards (description/stack/live-demo), featured grid + full list (22 products).
- [x] **/education** — custom **milestone timeline** from real data (no `react-vertical-timeline-component`).
- [x] Skills as **chips grouped by domain**; GitHub activity **stat band** (commits/active days/streak + 90-day heatmap) with fallback.
- [x] **Server-first** rendering (only `Reveal`/theme/nav are client leaves); `src/lib/github.ts` cached via ISR.
- [x] Per-route metadata + canonical, **Person + WebSite JSON-LD**, `robots.ts`, dynamic `sitemap.ts`, `next/og` OG image. `lodash` never introduced; octokit avoided in favour of native fetch.
- **Deliverable met:** SEO endpoints serve (robots/sitemap/JSON-LD/OG ✓); build ✓ typecheck ✓ lint ✓; verified in-browser (Home/Products/Education, light+dark). 11 routes prerendered.

> Follow-up (optional): product descriptions/outcomes can be enriched in `src/content/products.ts`; add `GITHUB_TOKEN` to `.env` to light up live stats.

### Phase 4 — Games (rewrite; remove rebass / styled-components / MobX) ✅

**Goal:** all games with zero legacy styling/state deps, route-split.

- [x] Rewrote all six in Tailwind + React state: **2048** (keyboard+swipe), **Tic-Tac-Toe** (minimax AI + 2P), **Snakes**, **Tetris**, **Minesweeper** (3 levels), **Klondike Solitaire**.
- [x] Replaced MobX with **`useReducer`** (Solitaire) — no new dependency; MobX/rebass/styled-components/redux confirmed absent from the project.
- [x] Route-split by App Router — each game is its own `/games/<slug>` chunk, never in the main/home bundle (`next/dynamic` unnecessary).
- [x] Games hub with arcade cards + shared `GameShell`; per-game metadata.
- **Deliverable met:** build ✓ typecheck ✓ lint ✓ (17 routes prerendered); verified in-browser — Tic-Tac-Toe plays with a working AI (X center → AI O corner).

### Phase 5 — PWA & 3D ✅

**Goal:** full PWA + 3D parity on the new stack.

**SW decision:** hand-rolled `public/sw.js` (not Serwist/next-pwa) — the project builds with **Turbopack**, where those webpack plugins are unreliable. Fully controllable + Turbopack-safe.

- [x] **PWA:** `app/manifest.ts` (indigo theme), fresh **generated indigo icons** (192/256/384/512/maskable/apple/favicon via `scripts/generate-icons.mjs` + sharp), hand-rolled service worker (offline fallback + runtime caching + Web-Push handlers), prod-only registration, `/offline` page, custom `InstallPrompt`, theme-color viewport.
- [x] **Push:** FCM wired (`src/lib/notifications.ts` + footer `NotificationsButton`) — **creds-gated**, no-ops until `NEXT_PUBLIC_FIREBASE_*` + VAPID set; SW push/notificationclick handlers ready.
- [x] **3D:** Three.js + R3F + drei; **rebuilt avatar** from `utkarsh.glb`, **lazy-loaded** (`next/dynamic` `ssr:false`, code-split) so it never blocks first paint; hidden < md to protect mobile LCP.
- **Deliverable met:** verified in production (`pnpm start`) — SW registers (scope `/`), avatar renders, manifest/sw.js/offline/icons serve; build ✓ typecheck ✓ lint ✓.

### Phase 6 — Quality, Verification & Ship ✅

**Goal:** tested, documented, production-ready.

- [x] **Testing:** Vitest + Testing Library — **23 tests / 5 files** green. Extracted pure game logic into `logic.ts` (2048, tic-tac-toe) and covered rules, utils (`common`, `cn`), + a Chip render smoke test.
- [x] **Dead-code cleanup:** removed 10 unused ported modules (old constants/interfaces/analytics) and the orphaned `src/assets/` tree.
- [x] **Audit:** `pnpm audit` → 1 moderate, transitive via `next>postcss` (not directly fixable; low impact). Manual unused-dependency + `@/assets` check clean.
- [x] **a11y:** semantic landmarks, heading hierarchy, `aria-label`s on icon buttons, focus-visible rings, `prefers-reduced-motion`.
- [x] **Docs:** rewrote `README.md` for the new stack; trimmed `.env.example` to the keys actually used (all optional).
- **Deliverable met:** `pnpm test` ✓ · `build` ✓ (19 routes) · `typecheck` ✓ · `lint` ✓. `old_code/` retained (git-ignored) pending user go-ahead to delete.

> Note: Lighthouse isn't runnable in this environment; run `pnpm build && pnpm start` then Lighthouse against `:3000` to confirm the §5 score gates.

---

## 5. Acceptance Gates

| Metric                      | Target                                                                                   |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| Lighthouse — SEO            | 100                                                                                      |
| Lighthouse — Performance    | ≥ 95                                                                                     |
| Lighthouse — Accessibility  | ≥ 95                                                                                     |
| Lighthouse — Best Practices | ≥ 95                                                                                     |
| LCP                         | < 2.0s                                                                                   |
| CLS                         | < 0.05                                                                                   |
| INP                         | < 200ms                                                                                  |
| Legacy deps removed         | rebass, styled-components, mobx, redux, lodash, react-transition-group, react-easy-swipe |
| Theme flash (FOUC)          | none                                                                                     |
| Structured data             | validates (Rich Results Test)                                                            |

---

## 6. Open Items / To Confirm at Execution

- Exact latest stable versions of Next / React / Tailwind (verify vs. npm).
- Package manager (default **npm**; pnpm/bun optional).
- Serwist vs. upgraded `@ducanh2912/next-pwa` for the PWA layer.
- Whether to port the 3D avatar as-is or rebuild in R3F components.

---

_Legacy reference: `old_code/` (git-ignored). Decisions of record are also stored in the project memory._
