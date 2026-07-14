import { cn } from "@/utils/cn";

/** Soft elevated surface. `hover` adds the signature glow lift. */
export function Card({
  className,
  hover = true,
  children,
  ...props
}: React.ComponentProps<"div"> & { hover?: boolean }) {
  return (
    <div
      className={cn("card-elevated p-6", hover && "hover-glow", className)}
      {...props}
    >
      {children}
    </div>
  );
}
