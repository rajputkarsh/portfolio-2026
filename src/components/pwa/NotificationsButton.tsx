"use client";

import { useState } from "react";
import { FIREBASE_CONFIGURED, enableNotifications } from "@/lib/notifications";

/** Opt-in push toggle. Renders only when Firebase is configured. */
export function NotificationsButton() {
  const [state, setState] = useState<"idle" | "loading" | "on" | "error">(
    "idle"
  );

  if (!FIREBASE_CONFIGURED) return null;

  async function enable() {
    setState("loading");
    const res = await enableNotifications();
    setState(res.ok ? "on" : "error");
  }

  return (
    <button
      onClick={enable}
      disabled={state === "loading" || state === "on"}
      className="text-muted-foreground hover:text-foreground text-sm transition-colors disabled:opacity-60"
    >
      {state === "on"
        ? "🔔 Notifications on"
        : state === "loading"
          ? "Enabling…"
          : state === "error"
            ? "Try again"
            : "Enable notifications"}
    </button>
  );
}
