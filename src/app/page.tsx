import { ThemeToggle } from "@/components/theme/ThemeToggle";

/**
 * TEMPORARY — Phase 1 design-system preview.
 * Showcases the new blue→indigo→violet token system, typography, and the
 * glass/depth accent layer. Replaced by the real Home page in Phase 3.
 */

const SWATCHES = [
  { name: "background", className: "bg-background border border-border" },
  { name: "card", className: "bg-card border border-border" },
  { name: "muted", className: "bg-muted" },
  { name: "primary", className: "bg-primary" },
  { name: "accent", className: "bg-accent" },
] as const;

export default function DesignSystemPreview() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      {/* Ambient depth — kept intentionally subtle */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="bg-aurora pointer-events-none absolute inset-0" />

      {/* Glass header */}
      <header className="glass sticky top-4 z-20 mx-auto flex w-[min(1100px,92%)] items-center justify-between rounded-full px-5 py-3">
        <span className="font-mono text-sm font-semibold tracking-tight">
          <span className="text-muted-foreground">const</span>{" "}
          <span className="text-gradient">utkarsh</span>
        </span>
        <ThemeToggle />
      </header>

      <div className="relative mx-auto w-[min(1100px,92%)] py-20">
        {/* Hero */}
        <section className="animate-rise max-w-3xl">
          <p className="text-muted-foreground font-mono text-sm">
            {"// founder-first developer"}
          </p>
          <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-7xl">
            I design & ship
            <br />
            <span className="text-gradient">products</span>, end to end.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg">
            Not just a full-stack developer — a founder who takes ideas from
            zero to a live, fast, well-crafted product.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#tokens"
              className="hover-glow gradient-brand shadow-soft-md inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white"
            >
              View the system
            </a>
            <a
              href="#tokens"
              className="glass hover-glow text-foreground inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold"
            >
              Explore accents
            </a>
          </div>
        </section>

        {/* Tokens */}
        <section id="tokens" className="mt-24 scroll-mt-24">
          <h2 className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
            Palette
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5">
            {SWATCHES.map((s) => (
              <div key={s.name}>
                <div
                  className={`h-20 w-full rounded-xl ${s.className}`}
                  aria-hidden
                />
                <p className="text-muted-foreground mt-2 font-mono text-xs">
                  {s.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mt-20">
          <h2 className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
            Type scale
          </h2>
          <div className="mt-5 space-y-2">
            <p className="text-5xl font-extrabold tracking-tight">
              Display / Jakarta
            </p>
            <p className="text-2xl font-semibold">Heading / semibold</p>
            <p className="text-muted-foreground text-base">
              Body copy in a calm, cool neutral — readable and unhurried.
            </p>
            <p className="text-primary font-mono text-sm">
              mono / JetBrains — const ship = () =&gt; product;
            </p>
          </div>
        </section>

        {/* Depth accents */}
        <section className="mt-20">
          <h2 className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
            Depth accents (~5%)
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <article className="card-elevated hover-glow p-6">
              <h3 className="font-semibold">Elevated card</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Soft shadow, hairline border, gentle lift on hover.
              </p>
            </article>
            <article className="glass hover-glow rounded-[var(--radius)] p-6">
              <h3 className="font-semibold">Glass panel</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Backdrop blur + saturation. Used sparingly for chrome.
              </p>
            </article>
            <article className="card-elevated hover-glow p-6">
              <h3 className="text-gradient font-semibold">Hover glow</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Indigo bloom on hover — the signature micro-interaction.
              </p>
            </article>
          </div>
        </section>

        <p className="text-muted-foreground mt-20 font-mono text-xs">
          {"/* temporary Phase 1 preview — real Home lands in Phase 3 */"}
        </p>
      </div>
    </main>
  );
}
