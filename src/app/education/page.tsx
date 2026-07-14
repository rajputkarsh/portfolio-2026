import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { EDUCATION } from "@/content/education";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Education, milestones, and the path that shaped how I build products.",
};

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
          description="From first principles to shipping products — the milestones along the way."
        />
      </Reveal>

      <ol className="mt-12 space-y-6 border-l pl-8 sm:pl-10">
        {EDUCATION.map((m, i) => (
          <Reveal as="li" key={`${m.year}-${m.title}`} delay={i * 0.05}>
            <div className="relative">
              {/* Node on the axis */}
              <span className="gradient-brand ring-background absolute top-6 -left-[2.6rem] h-3.5 w-3.5 rounded-full ring-4 sm:-left-[3.1rem]" />
              <div className="card-elevated hover-glow p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-primary font-mono text-sm font-semibold">
                    {m.year}
                  </span>
                  {m.institution ? (
                    <span className="border-border/70 text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs">
                      {m.institution}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {m.title}
                </h3>
                {m.description ? (
                  <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                    {m.description}
                  </p>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
