# Portfolio 2026 — Modernization Implementation Plan

> A phase-wise plan to rebuild a Next.js developer-portfolio PWA as a fast, SEO-first,
> founder-positioned product. The legacy app lives in `old_code/` (reference only, git-ignored)
> and the new app is a **fresh scaffold** at the repository root.

---

## 1. Vision & Positioning

**Positioning:** A _founder-first developer who builds products_ — projects are presented as
**shipped products with outcomes and impact**, not just tech-stack lists. This shapes copy,
information architecture, and structured data.

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

### Phase 2 — Core Layout & Shared Components

**Goal:** shell, navigation, transitions.

- [ ] Port `layout`, `TransitionProvider`, `Navbar`, `Footer`, `Header` (analytics/schema/tags),
      `ThemeButton`, `title`, `socials`, `timeline`, `tileList`, dialogs.
- [ ] Framer Motion → `motion`; replace `react-transition-group` / `react-easy-swipe` with `motion`.
- [ ] Apply glass navbar + subtle page transitions.
- **Deliverable:** navigable shell with the new look.

### Phase 3 — Feature Pages (Home / Projects→Products / Education)

**Goal:** primary content, server-rendered, founder-positioned.

- [ ] **Client→Server refactor** of containers (isolate analytics/motion to leaf components).
- [ ] Reframe "Projects" as **Products** with outcomes/impact; rewrite copy for founder positioning.
- [ ] Port Firebase server actions with a **lazy-singleton** init; GitHub commit caching; activity calendar; skillset.
- [ ] Add per-route metadata, JSON-LD, OG images.
- [ ] Upgrade Firebase, octokit, dayjs; drop lodash.
- **Deliverable:** SEO-complete content pages.

### Phase 4 — Games (rewrite; remove rebass / styled-components / MobX)

**Goal:** all games with zero legacy styling/state deps, lazy-loaded.

- [ ] Rewrite 2048, tic-tac-toe, snakes, tetris, minesweeper, **Klondike solitaire** in Tailwind.
- [ ] Replace MobX solitaire store with **Zustand** (or `useReducer`); port Card/Deck/Pile/Foundation models.
- [ ] `next/dynamic` load each game; ensure no game code enters the main bundle.
- **Deliverable:** games at feature parity, lean.

### Phase 5 — PWA & 3D

**Goal:** full PWA + 3D parity on the new stack.

- [ ] PWA: upgrade next-pwa or migrate to **Serwist**; validate offline fallback, SW, install dialog, push, precache.
- [ ] Upgrade Three.js / R3F / drei; keep or port the 3D avatar (lazy-loaded, off critical path).
- [ ] Verify manifest, sitemap, robots, schema markup, analytics.
- **Deliverable:** installable, offline-capable PWA with 3D.

### Phase 6 — Quality, Verification & Ship

**Goal:** tested, documented, production-ready.

- [ ] Testing: Vitest + React Testing Library (optional Playwright for offline/PWA).
- [ ] Remove obsolete `(old-routes)`; consolidate route groups.
- [ ] Lighthouse + a11y pass, bundle analysis, `npm audit`, unused-dependency check.
- [ ] Update README, `.env.example`; final `old_code/` removal.
- **Deliverable:** all pillar gates met (see §5).

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
