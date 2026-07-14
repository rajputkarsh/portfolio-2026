import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Design tokens and accent primitives for the portfolio.",
  robots: { index: false },
};

const SWATCHES = [
  { name: "background", className: "bg-background border border-border" },
  { name: "card", className: "bg-card border border-border" },
  { name: "muted", className: "bg-muted" },
  { name: "primary", className: "bg-primary" },
  { name: "accent", className: "bg-accent" },
] as const;

export default function StyleguidePage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="// design system"
        title={<span className="text-gradient">Styleguide</span>}
        description="The blue → indigo → violet token system and the ~5% glass/depth accent layer."
      />

      <div className="mt-10 space-y-16">
        {/* Palette */}
        <div>
          <h3 className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
            Palette
          </h3>
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
        </div>

        {/* Type */}
        <div>
          <h3 className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
            Type scale
          </h3>
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
        </div>

        {/* Chips */}
        <div>
          <h3 className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
            Chips
          </h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {["TypeScript", "Next.js", "Node", "Postgres", "AWS"].map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </div>

        {/* Depth accents */}
        <div>
          <h3 className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
            Depth accents (~5%)
          </h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <Card>
              <h4 className="font-semibold">Elevated card</h4>
              <p className="text-muted-foreground mt-2 text-sm">
                Soft shadow, hairline border, gentle lift on hover.
              </p>
            </Card>
            <div className="glass hover-glow rounded-[var(--radius)] p-6">
              <h4 className="font-semibold">Glass panel</h4>
              <p className="text-muted-foreground mt-2 text-sm">
                Backdrop blur + saturation. Used sparingly for chrome.
              </p>
            </div>
            <Card>
              <h4 className="text-gradient font-semibold">Hover glow</h4>
              <p className="text-muted-foreground mt-2 text-sm">
                Indigo bloom on hover — the signature micro-interaction.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
