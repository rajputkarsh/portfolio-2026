import { cn } from "@/utils/cn";

/** Compact pill used for skills / tags. */
export function Chip({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "border-border bg-card/60 text-foreground/90 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
