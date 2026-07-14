import { cn } from "@/utils/cn";

/** Centered max-width wrapper used across all sections. */
export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-[min(1200px,92%)]", className)} {...props} />
  );
}
