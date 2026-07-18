import { cn } from "@/utils/cn";
import { Container } from "./Container";

/** Semantic section with consistent vertical rhythm. */
export function Section({
  className,
  containerClassName,
  children,
  ...props
}: React.ComponentProps<"section"> & { containerClassName?: string }) {
  return (
    <section className={cn("py-16 sm:py-24", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/**
 * Eyebrow + heading + description block for a section.
 * Use `as="h1"` for the primary heading of a page (one per page).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
