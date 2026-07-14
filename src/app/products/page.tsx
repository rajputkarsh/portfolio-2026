import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Products I've designed, built, and shipped — framed by role, outcome, and impact.",
};

export default function ProductsPage() {
  return (
    <Section>
      <Reveal>
        <SectionHeading
          eyebrow="// products"
          title={
            <>
              Shipped <span className="text-gradient">products</span>, not just
              projects
            </>
          }
          description="Each one framed by the role I played, the outcome it drove, and the stack behind it. Case studies load from the CMS in Phase 3."
        />
      </Reveal>

      <Reveal delay={0.05} className="mt-10">
        <BentoGrid>
          <BentoCard col={6} row={1} className="justify-between sm:col-span-2">
            <div className="flex items-center gap-2">
              <Chip>Featured</Chip>
              <span className="text-muted-foreground font-mono text-xs">
                role · outcome · impact
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-tight">
              Featured product
            </h3>
            <p className="text-muted-foreground mt-2 max-w-lg text-sm">
              The hero case study — problem, what I built, and the measurable
              result — lands here in Phase 3.
            </p>
          </BentoCard>

          {[1, 2, 3, 4].map((i) => (
            <BentoCard key={i} col={3}>
              <div className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                product {i}
              </div>
              <h3 className="mt-2 font-semibold">Case study {i}</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Role, outcome, and stack — coming from the CMS in Phase 3.
              </p>
            </BentoCard>
          ))}
        </BentoGrid>
      </Reveal>
    </Section>
  );
}
