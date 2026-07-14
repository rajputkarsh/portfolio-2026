import { cn } from "@/utils/cn";

/** Signature asymmetric grid. Children set their own span via BentoCard. */
export function BentoGrid({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6",
        className
      )}
      {...props}
    />
  );
}

const colSpans: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  6: "lg:col-span-6",
};

const rowSpans: Record<number, string> = {
  1: "lg:row-span-1",
  2: "lg:row-span-2",
};

/** A tile within a BentoGrid. `col`/`row` control span at lg+. */
export function BentoCard({
  className,
  col = 3,
  row = 1,
  hover = true,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  col?: 1 | 2 | 3 | 4 | 6;
  row?: 1 | 2;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "card-elevated flex flex-col p-6 sm:col-span-1",
        colSpans[col],
        rowSpans[row],
        hover && "hover-glow",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
