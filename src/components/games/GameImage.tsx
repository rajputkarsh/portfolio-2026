"use client";

import Image from "next/image";
import { useState } from "react";

/** Game preview banner. Falls back to a gradient + emoji if the image is missing. */
export function GameImage({
  slug,
  title,
  emoji,
}: {
  slug: string;
  title: string;
  emoji: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="bg-muted border-border/60 relative aspect-[16/10] w-full overflow-hidden border-b">
      {failed ? (
        <div
          className="gradient-brand absolute inset-0 flex items-center justify-center text-4xl"
          aria-hidden
        >
          {emoji}
        </div>
      ) : (
        <Image
          src={`/games/${slug}.webp`}
          alt={`${title} preview`}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          onError={() => setFailed(true)}
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
    </div>
  );
}
