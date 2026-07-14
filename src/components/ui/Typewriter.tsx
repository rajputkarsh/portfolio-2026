"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Types and erases through `phrases` on a loop. No dependency.
 * Renders the first phrase statically when reduced motion is preferred.
 */
export function Typewriter({
  phrases,
  className,
}: {
  phrases: string[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce || phrases.length === 0) return;
    const current = phrases[index % phrases.length];

    // Finished typing → pause, then start deleting.
    if (!deleting && sub === current.length) {
      const t = setTimeout(() => setDeleting(true), 1500);
      return () => clearTimeout(t);
    }
    // Finished deleting → pause, then advance to the next phrase.
    if (deleting && sub === 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      }, 400);
      return () => clearTimeout(t);
    }
    // Type or erase one character.
    const t = setTimeout(
      () => setSub((s) => s + (deleting ? -1 : 1)),
      deleting ? 45 : 85
    );
    return () => clearTimeout(t);
  }, [sub, deleting, index, phrases, reduce]);

  if (reduce) {
    return <span className={className}>{phrases[0]}</span>;
  }

  const text = phrases[index % phrases.length].slice(0, sub);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse" aria-hidden>
        |
      </span>
    </span>
  );
}
