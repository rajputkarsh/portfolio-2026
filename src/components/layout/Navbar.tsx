"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { NAV_LINKS } from "@/constants/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/utils/cn";

function isActivePath(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="glass shadow-soft-md flex items-center gap-1 rounded-full p-1.5 pl-4">
        {/* Brand */}
        <Link
          href="/"
          className="mr-1 font-mono text-sm font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="text-muted-foreground">const</span>{" "}
          <span className="text-gradient">utkarsh</span>
        </Link>

        {/* Desktop links */}
        <ul className="mx-1 hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = !link.external && isActivePath(link.href, pathname);
            return (
              <li key={link.href} className="relative">
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground relative z-10 inline-flex rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative z-10 inline-flex rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                )}
                {active ? (
                  <motion.span
                    layoutId="nav-active"
                    className="bg-primary/12 ring-primary/20 absolute inset-0 rounded-full ring-1"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </li>
            );
          })}
        </ul>

        <ThemeToggle className="h-9 w-9" />

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="glass hover-glow text-foreground inline-flex h-9 w-9 items-center justify-center rounded-full md:hidden"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 -z-10 cursor-default md:hidden"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.ul
              className="glass shadow-soft-lg absolute top-16 w-[min(20rem,90vw)] space-y-1 rounded-2xl p-2 md:hidden"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {NAV_LINKS.map((link) => {
                const active =
                  !link.external && isActivePath(link.href, pathname);
                const cls = cn(
                  "block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/12 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                );
                return (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cls}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className={cls}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
