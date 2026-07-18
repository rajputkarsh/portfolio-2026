import Link from "next/link";
import config from "@/constants/config";
import { NAV_LINKS } from "@/constants/navigation";
import { Container } from "@/components/ui/Container";
import { NotificationsButton } from "@/components/pwa/NotificationsButton";

type IconProps = { className?: string };

const icons: Record<string, (p: IconProps) => React.ReactElement> = {
  github: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  ),
  linkedin: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  ),
  twitter: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.96 6.82H1.66l7.73-8.84L1.24 2.25h6.83l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
    </svg>
  ),
  stackoverflow: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M17.36 20.2v-5.38h1.79V22H3.55v-7.18h1.79v5.38h12.02ZM6.77 14.28l.37-1.76 8.78 1.85-.37 1.76-8.78-1.85Zm1.16-4.21.76-1.61 8.13 3.79-.76 1.62-8.13-3.8Zm2.26-3.99 1.15-1.38 6.9 5.76-1.15 1.38-6.9-5.76ZM14.6 2l5.34 7.18-1.44 1.07L13.16 3.1 14.6 2ZM6.59 18.41v-1.8h8.96v1.8H6.59Z" />
    </svg>
  ),
  email: (p) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
      {...p}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
};

const SOCIALS: { key: keyof typeof config.social; label: string }[] = [
  { key: "github", label: "GitHub" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "twitter", label: "X / Twitter" },
  { key: "stackoverflow", label: "Stack Overflow" },
  { key: "email", label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-border/60 mt-16 border-t">
      <Container className="py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-sm font-semibold tracking-tight">
              <span className="text-muted-foreground">const</span>{" "}
              <span className="text-gradient">utkarsh</span>
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Full-stack developer &amp; product engineer — thinking in product
              and business, not just code.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="border-border/60 mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground text-xs">
              Built with ❤️ by Utkarsh
            </p>
            <NotificationsButton />
          </div>
          <ul className="flex items-center gap-2">
            {SOCIALS.map(({ key, label }) => {
              const Icon = icons[key];
              return (
                <li key={key}>
                  <a
                    href={config.social[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="glass hover-glow text-muted-foreground hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
