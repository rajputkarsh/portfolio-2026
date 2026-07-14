import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/products/ProductCard";
import {
  FEATURED_PRODUCTS,
  OTHER_PRODUCTS,
  PRODUCTS,
} from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Products I've designed, built, and shipped — from AI apps and APIs to developer tools.",
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
          description={`${PRODUCTS.length} things I've designed, built, and put in front of real users — from AI apps and APIs to developer tools and experiments.`}
        />
      </Reveal>

      {/* Featured */}
      <Reveal delay={0.05} className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} featured />
          ))}
        </div>
      </Reveal>

      {/* Everything else */}
      <div className="mt-12">
        <Reveal>
          <h2 className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
            More products
          </h2>
        </Reveal>
        <Reveal delay={0.05} className="mt-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OTHER_PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
