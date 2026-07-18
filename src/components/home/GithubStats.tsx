import { getGithubStats } from "@/lib/github";
import { levelClass } from "@/lib/contributions";
import { profile } from "@/content/profile";
import { ContributionCalendar } from "./ContributionCalendar";

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
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            <Stat value={stats.total} label="commits" />
            <Stat value={stats.activeDays} label="active days" />
            <Stat value={`${stats.currentStreak}d`} label="current streak" />
            <Stat value={`${stats.longestStreak}d`} label="longest streak" />
          </div>

          <ContributionCalendar days={stats.days} />

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
          Couldn&apos;t load GitHub activity right now. See the work on{" "}
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
