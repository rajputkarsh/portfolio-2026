import type { Product } from "@/content/products";
import { cn } from "@/utils/cn";
import { ProductImage } from "./ProductImage";

const LINK_LABEL: Record<Product["link"]["type"], string> = {
  demo: "Live demo",
  source: "Source",
  npm: "NPM",
};

export function ProductCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  return (
    <a
      href={product.link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="card-elevated hover-glow group flex flex-col overflow-hidden"
    >
      <ProductImage
        slug={product.slug}
        title={product.title}
        sizes={
          featured
            ? "(max-width: 640px) 100vw, 50vw"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        }
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={cn(
              "font-semibold tracking-tight",
              featured ? "text-xl" : "text-base"
            )}
          >
            {product.title}
          </h3>
          <span
            aria-hidden
            className="text-muted-foreground group-hover:text-primary mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </span>
        </div>

        {product.description ? (
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {product.description}
          </p>
        ) : null}

        {product.stack?.length ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
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

        <span className="text-primary mt-auto pt-4 font-mono text-xs">
          {LINK_LABEL[product.link.type]} →
        </span>
      </div>
    </a>
  );
}
