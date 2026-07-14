"use client";

import dynamic from "next/dynamic";

function AvatarFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="bg-primary/20 h-40 w-40 animate-pulse rounded-full blur-2xl" />
    </div>
  );
}

const Avatar = dynamic(() => import("./Avatar"), {
  ssr: false,
  loading: () => <AvatarFallback />,
});

/**
 * Client-only, lazily-loaded 3D avatar. Three.js is code-split into its own
 * chunk and never blocks first paint.
 */
export function AvatarLazy() {
  return (
    <div className="h-full w-full">
      <Avatar />
    </div>
  );
}
