import { getGithubStats, type GithubDay } from "@/lib/github";
import { profile } from "@/content/profile";

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

function levelClass(count: number): string {
  if (count <= 0) return "bg-foreground/[0.06]";
  if (count <= 2) return "bg-primary/30";
  if (count <= 5) return "bg-primary/55";
  if (count <= 9) return "bg-primary/80";
  return "bg-primary";
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold tracking-tight sm:text-3xl">
        {value}
      </div>
      <div className="text-muted-foreground text-xs">{label}</div>
    </div>
  );
}

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

export async function GithubStats() {
  const stats = await getGithubStats();
  const githubUrl = `https://github.com/${profile.githubUsername}`;

  return (
    <div className="card-elevated p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            GitHub activity
          </h3>
          <p className="text-muted-foreground text-sm">Past year of commits</p>
        </div>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-mono text-sm hover:underline"
        >
          @{profile.githubUsername} →
        </a>
      </div>

      {stats ? (
        <>
          <div className="mt-6 flex gap-8">
            <Stat value={stats.total} label="commits" />
            <Stat value={stats.activeDays} label="active days" />
            <Stat value={`${stats.currentStreak}d`} label="current streak" />
          </div>

          <Calendar days={stats.days} />

          <div className="text-muted-foreground mt-3 flex items-center gap-1.5 text-xs">
            <span>Less</span>
            {[0, 2, 5, 9, 12].map((n) => (
              <span
                key={n}
                className={`h-2.5 w-2.5 rounded-[2px] ${levelClass(n)}`}
              />
            ))}
            <span>More</span>
          </div>
        </>
      ) : (
        <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
          Live commit activity appears here once a{" "}
          <code className="font-mono text-xs">GITHUB_TOKEN</code> is configured.
          In the meantime, see the work on{" "}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      )}
    </div>
  );
}

function Calendar({ days }: { days: GithubDay[] }) {
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
      <div className="min-w-[42rem]">
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
        >
          {weeks
            .flat()
            .map((day, i) =>
              day ? (
                <span
                  key={i}
                  title={`${day.date}: ${day.count} commit${day.count === 1 ? "" : "s"}`}
                  className={`aspect-square rounded-[2px] ${levelClass(day.count)}`}
                />
              ) : (
                <span key={i} className="aspect-square" />
              )
            )}
        </div>
      </div>
    </div>
  );
}
