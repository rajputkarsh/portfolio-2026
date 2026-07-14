import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Education",
  description: "Education, milestones, and how I got here.",
};

const MILESTONES = ["Milestone 01", "Milestone 02", "Milestone 03"];

export default function EducationPage() {
  return (
    <Section>
      <Reveal>
        <SectionHeading
          eyebrow="// journey"
          title={
            <>
              The <span className="text-gradient">path</span> so far
            </>
          }
          description="A custom milestone timeline (replacing the old library) — populated in Phase 3."
        />
      </Reveal>

      <Reveal delay={0.05} className="mt-12">
        <ol className="relative ml-3 space-y-8 border-l pl-8">
          {MILESTONES.map((m) => (
            <li key={m} className="relative">
              <span className="gradient-brand ring-background absolute top-1.5 -left-[2.55rem] h-3.5 w-3.5 rounded-full ring-4" />
              <div className="card-elevated hover-glow p-5">
                <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                  year
                </p>
                <h3 className="mt-1 font-semibold">{m}</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Institution, focus, and highlights — coming in Phase 3.
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
