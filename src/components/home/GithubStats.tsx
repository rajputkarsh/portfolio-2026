import { getGithubStats } from "@/lib/github";
import { profile } from "@/content/profile";

function cellClass(count: number): string {
  if (count === 0) return "bg-muted";
  if (count <= 2) return "bg-primary/30";
  if (count <= 5) return "bg-primary/60";
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
          <p className="text-muted-foreground text-sm">Last 90 days</p>
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
          <div className="mt-6 grid grid-flow-col grid-rows-7 gap-1">
            {stats.days.map((d) => (
              <span
                key={d.date}
                title={`${d.date}: ${d.count} commit${d.count === 1 ? "" : "s"}`}
                className={`h-2.5 w-2.5 rounded-[3px] ${cellClass(d.count)}`}
              />
            ))}
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
