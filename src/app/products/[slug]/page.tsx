import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumb, productSchema } from "@/lib/structured-data";
import {
  PRODUCTS,
  getProduct,
  relatedProducts,
  isLive,
  LINK_CTA,
} from "@/content/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const description =
    product.description ??
    product.caseStudy?.problem ??
    `${product.title} — built with ${product.stack?.join(", ") ?? "modern web tooling"}.`;

  return {
    title: product.title,
    description,
    alternates: { canonical: `/products/${slug}` },
    // The hosted demo is down — don't spend crawl budget on a page whose
    // primary value (a working link) no longer exists.
    ...(isLive(product) ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      type: "article",
      title: product.title,
      description,
      url: `/products/${slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const cs = product.caseStudy;
  const related = relatedProducts(slug);
  const live = isLive(product);

  return (
    <Section>
      <StructuredData
        data={[
          breadcrumb([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: product.title, path: `/products/${slug}` },
          ]),
          // Only claim a SoftwareApplication when it's actually reachable.
          ...(live ? [productSchema(product)] : []),
        ]}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="text-muted-foreground font-mono text-xs"
      >
        <Link href="/" className="hover:text-foreground transition-colors">
          home
        </Link>
        <span className="mx-1.5">/</span>
        <Link
          href="/products"
          className="hover:text-foreground transition-colors"
        >
          products
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-foreground">{product.slug}</span>
      </nav>

      <Reveal className="mt-6">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {product.title}
        </h1>
        {product.description ? (
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg leading-relaxed">
            {product.description}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {live ? (
            <Button href={product.link.href} external>
              {LINK_CTA[product.link.type]} →
            </Button>
          ) : (
            <span className="border-border/70 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
              <span
                aria-hidden
                className="bg-muted-foreground/60 size-2 rounded-full"
              />
              Demo archived — no longer hosted
            </span>
          )}
          {cs?.role ? (
            <span className="text-muted-foreground text-sm">{cs.role}</span>
          ) : null}
        </div>

        {product.stack?.length ? (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {product.stack.map((tech) => (
              <span
                key={tech}
                className="border-border/70 text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        ) : null}
      </Reveal>

      {/* Screenshot — skipped when offline, since the capture would just be
          the host's error page rather than the product. */}
      {live ? (
        <Reveal delay={0.05} className="mt-10">
          <div className="card-elevated relative aspect-[16/10] w-full overflow-hidden p-0">
            <Image
              src={`/products/${slug}.webp`}
              alt={`${product.title} — product screenshot`}
              fill
              sizes="(max-width: 1024px) 100vw, 1100px"
              priority
              className="object-cover object-top"
            />
          </div>
        </Reveal>
      ) : null}

      {/* Case study */}
      {cs && (cs.problem || cs.build || cs.outcome || cs.highlights?.length) ? (
        <Reveal delay={0.05} className="mt-14">
          <div className="grid gap-10 sm:grid-cols-2">
            {cs.problem ? (
              <section>
                <h2 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                  The problem
                </h2>
                <p className="mt-3 leading-relaxed">{cs.problem}</p>
              </section>
            ) : null}
            {cs.build ? (
              <section>
                <h2 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                  What I built
                </h2>
                <p className="mt-3 leading-relaxed">{cs.build}</p>
              </section>
            ) : null}
            {cs.outcome ? (
              <section>
                <h2 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                  Outcome
                </h2>
                <p className="mt-3 leading-relaxed">{cs.outcome}</p>
              </section>
            ) : null}
            {cs.highlights?.length ? (
              <section>
                <h2 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                  Highlights
                </h2>
                <ul className="mt-3 space-y-2">
                  {cs.highlights.map((h) => (
                    <li key={h} className="flex gap-2 leading-relaxed">
                      <span className="text-primary">→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </Reveal>
      ) : null}

      {/* Related — internal linking */}
      {related.length ? (
        <Reveal delay={0.05} className="mt-16">
          <h2 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
            More products
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/products/${r.slug}`}
                className="card-elevated hover-glow group p-5"
              >
                <h3 className="font-semibold tracking-tight">{r.title}</h3>
                {r.stack?.length ? (
                  <p className="text-muted-foreground mt-2 font-mono text-xs">
                    {r.stack.slice(0, 3).join(" · ")}
                  </p>
                ) : null}
                <span className="text-primary mt-3 inline-block font-mono text-xs">
                  View →
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      ) : null}
    </Section>
  );
}
