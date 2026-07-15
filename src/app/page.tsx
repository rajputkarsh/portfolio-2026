import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Reveal } from "@/components/ui/Reveal";
import { Typewriter } from "@/components/ui/Typewriter";
import { ProductCard } from "@/components/products/ProductCard";
import { GithubStats } from "@/components/home/GithubStats";
import { AvatarLazy } from "@/components/avatar/AvatarLazy";
import { profile } from "@/content/profile";
import { PRODUCTS, FEATURED_PRODUCTS } from "@/content/products";
import { SKILL_GROUPS } from "@/content/skills";

const HERO_STACK = ["TypeScript", "Next.js", "Node", "PostgreSQL", "AWS", "AI"];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="bg-aurora pointer-events-none absolute inset-0" />
        <Container className="relative grid items-center gap-8 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="text-muted-foreground font-mono text-sm">
              {"// "}
              <Typewriter
                phrases={[
                  "full-stack developer",
                  "product engineer",
                  "product & business thinker",
                  "0 → 1 builder",
                ]}
                className="text-foreground/80"
              />
            </p>
            <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-7xl">
              I design & ship
              <br />
              <span className="text-gradient">products</span>, end to end.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg">
              {profile.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/products">See what I build</Button>
              <Button href={profile.social.email} external variant="secondary">
                Get in touch
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {HERO_STACK.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </Reveal>

          {/* Lazy 3D avatar — hidden on small screens to protect mobile LCP */}
          <div className="hidden h-[30rem] md:block">
            <AvatarLazy />
          </div>
        </Container>
      </section>

      {/* How I work */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="// how I work"
            title={
              <>
                Product &amp; business,{" "}
                <span className="text-gradient">not just code</span>
              </>
            }
            description="Every decision weighs user value, business impact, and technical trade-offs together — that's what turns features into products."
          />
        </Reveal>

        <Reveal delay={0.05} className="mt-10">
          <BentoGrid>
            <BentoCard col={4} row={2} className="justify-between">
              <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                the approach
              </p>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  Product-minded engineering
                </h3>
                <p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed">
                  I scope for outcomes, sweat the details users feel, and keep
                  the codebase fast and maintainable as it scales.
                </p>
              </div>
            </BentoCard>

            <BentoCard col={2}>
              <h3 className="font-semibold">0 → 1 delivery</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                From idea to shipped, without losing momentum.
              </p>
            </BentoCard>

            <BentoCard col={2}>
              <h3 className="font-semibold">Full-stack depth</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Frontend, backend, infra — one coherent whole.
              </p>
            </BentoCard>

            <BentoCard col={3}>
              <h3 className="font-semibold">Fast &amp; measured</h3>
              <p className="text-muted-foreground mt-2 text-sm">
                Performance and Core Web Vitals treated as features.
              </p>
            </BentoCard>

            <BentoCard col={3} className="justify-between">
              <div>
                <h3 className="text-gradient font-semibold">
                  Products, not demos
                </h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Real users, real outcomes, real polish.
                </p>
              </div>
              <Button
                href="/products"
                variant="ghost"
                size="sm"
                className="mt-4 self-start px-0 hover:bg-transparent"
              >
                Explore products →
              </Button>
            </BentoCard>
          </BentoGrid>
        </Reveal>
      </Section>

      {/* Skills */}
      <Section className="pt-0">
        <Reveal>
          <SectionHeading eyebrow="// toolkit" title="The stack I build with" />
        </Reveal>
        <Reveal delay={0.05} className="mt-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_GROUPS.map((group) => (
              <div key={group.label}>
                <h3 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                  {group.label}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Featured products */}
      <Section className="pt-0">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="// selected work"
              title={
                <>
                  Featured <span className="text-gradient">products</span>
                </>
              }
            />
            <Button href="/products" variant="secondary" size="sm">
              All {PRODUCTS.length} products →
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.05} className="mt-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} featured />
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Activity + journey */}
      <Section className="pt-0">
        <Reveal>
          <GithubStats />
        </Reveal>
        <Reveal delay={0.05} className="mt-4">
          <div className="card-elevated hover-glow flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                the journey
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight">
                From first principles to shipping products
              </h3>
            </div>
            <Button href="/education" variant="secondary" size="sm">
              See the path →
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section className="pt-0">
        <Reveal>
          <div className="gradient-brand shadow-soft-lg relative overflow-hidden rounded-[var(--radius-2xl)] p-10 text-white sm:p-14">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Have a product to build?
                </h2>
                <p className="mt-2 max-w-md text-white/80">
                  Let&apos;s turn the idea into something live, fast, and
                  well-crafted.
                </p>
              </div>
              <Button
                href={profile.social.email}
                external
                variant="secondary"
                className="shrink-0 bg-white/15 text-white"
              >
                Start a conversation
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
