import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page doesn't exist — here's the way back.",
  robots: { index: false, follow: true },
};

const LINKS = [
  {
    href: "/products",
    label: "Products",
    hint: "Things I've designed & shipped",
  },
  { href: "/education", label: "Education", hint: "The path that got me here" },
  {
    href: "/games",
    label: "Games",
    hint: "Built for fun — playable in-browser",
  },
];

export default function NotFound() {
  return (
    <Section>
      <p className="text-primary font-mono text-sm">404</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="text-muted-foreground mt-4 max-w-xl text-lg leading-relaxed">
        The link may be outdated, or the page may have moved. Nothing&apos;s
        broken on your end.
      </p>

      <div className="mt-8">
        <Button href="/">← Back home</Button>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-3">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="card-elevated hover-glow group p-5"
          >
            <h2 className="font-semibold tracking-tight">{l.label}</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {l.hint}
            </p>
            <span className="text-primary mt-3 inline-block font-mono text-xs">
              Visit →
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
