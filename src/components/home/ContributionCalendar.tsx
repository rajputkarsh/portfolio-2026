"use client";

import { useState } from "react";
import { levelClass, type GithubDay } from "@/lib/contributions";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Split the day list into weekday-aligned week columns (Sun → Sat). */
function toWeeks(days: GithubDay[]): (GithubDay | null)[][] {
  if (days.length === 0) return [];
  const leading = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells: (GithubDay | null)[] = [
    ...Array<null>(leading).fill(null),
    ...days,
  ];
  const weeks: (GithubDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

function describe(count: number): string {
  if (count === 0) return "No contributions";
  return `${count} contribution${count === 1 ? "" : "s"}`;
}

type Hover = { day: GithubDay; x: number; y: number };

export function ContributionCalendar({ days }: { days: GithubDay[] }) {
  const [hover, setHover] = useState<Hover | null>(null);
  const weeks = toWeeks(days);

  const monthOf = (week: (GithubDay | null)[] | undefined): number => {
    const first = week?.find(Boolean);
    return first ? new Date(`${first.date}T00:00:00Z`).getUTCMonth() : -1;
  };
  const labels = weeks.map((week, i) => {
    const m = monthOf(week);
    return m !== -1 && m !== monthOf(weeks[i - 1]) ? MONTHS[m] : "";
  });

  const columns = `repeat(${weeks.length}, minmax(0, 1fr))`;

  return (
    <div className="mt-6 overflow-x-auto pb-1">
      <div className="relative min-w-[42rem]">
        <div
          className="text-muted-foreground mb-1 grid gap-1 text-[10px]"
          style={{ gridTemplateColumns: columns }}
        >
          {labels.map((label, i) => (
            <span key={i} className="whitespace-nowrap">
              {label}
            </span>
          ))}
        </div>

        <div
          className="grid grid-flow-col gap-1"
          style={{
            gridTemplateColumns: columns,
            gridTemplateRows: "repeat(7, minmax(0, 1fr))",
          }}
          onMouseLeave={() => setHover(null)}
        >
          {weeks.flat().map((day, i) =>
            day ? (
              <span
                key={i}
                aria-label={`${describe(day.count)} on ${formatDate(day.date)}`}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  setHover({
                    day,
                    x: el.offsetLeft + el.offsetWidth / 2,
                    y: el.offsetTop,
                  });
                }}
                className={`hover:ring-primary/70 aspect-square rounded-[2px] transition-shadow hover:ring-2 ${levelClass(day.count)}`}
              />
            ) : (
              <span key={i} className="aspect-square" />
            )
          )}
        </div>

        {hover ? (
          <div
            className="glass shadow-soft-lg pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-lg px-2.5 py-1.5 text-xs whitespace-nowrap"
            style={{ left: hover.x, top: hover.y - 8 }}
            role="tooltip"
          >
            <span className="font-semibold">{describe(hover.day.count)}</span>
            <span className="text-muted-foreground">
              {" "}
              on {formatDate(hover.day.date)}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
