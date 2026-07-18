"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Product screenshot banner. Falls back to a brand gradient if the image
 * is missing, fails to load, or `useFallback` is set — the latter for
 * archived products, whose capture is just the host's error page.
 */
export function ProductImage({
  slug,
  title,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  useFallback = false,
}: {
  slug: string;
  title: string;
  sizes?: string;
  useFallback?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="bg-muted border-border/60 relative aspect-[16/10] w-full overflow-hidden border-b">
      {failed || useFallback ? (
        <div
          className="gradient-brand absolute inset-0 opacity-80"
          aria-hidden
        />
      ) : (
        <Image
          src={`/products/${slug}.webp`}
          alt={`${title} — screenshot`}
          fill
          sizes={sizes}
          onError={() => setFailed(true)}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
    </div>
  );
}
