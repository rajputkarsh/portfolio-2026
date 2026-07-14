"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Registers the service worker (production only), surfaces an "update ready"
 * prompt when a new worker is waiting, and reloads when the network returns
 * after being offline.
 */
export function ServiceWorkerRegister() {
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator))
      return;

    let refreshing = false;
    const hadController = !!navigator.serviceWorker.controller;

    const onControllerChange = () => {
      // Only reload for genuine updates (not the first-ever install).
      if (refreshing || !hadController) return;
      refreshing = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener(
      "controllerchange",
      onControllerChange
    );

    let reg: ServiceWorkerRegistration | undefined;
    const register = async () => {
      try {
        reg = await navigator.serviceWorker.register("/sw.js");
        if (reg.waiting && navigator.serviceWorker.controller) {
          setWaiting(reg.waiting);
        }
        reg.addEventListener("updatefound", () => {
          const next = reg?.installing;
          if (!next) return;
          next.addEventListener("statechange", () => {
            if (
              next.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setWaiting(next);
            }
          });
        });
      } catch {
        /* registration failures are non-fatal */
      }
    };
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register);

    // Auto-refresh when connectivity returns after an outage.
    let wasOffline = !navigator.onLine;
    const onOffline = () => {
      wasOffline = true;
    };
    const onOnline = () => {
      if (wasOffline && document.visibilityState === "visible") {
        window.location.reload();
      }
    };
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        onControllerChange
      );
      window.removeEventListener("load", register);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []);

  if (!waiting) return null;

  const refresh = () => waiting.postMessage({ type: "SKIP_WAITING" });

  return (
    <div className="glass shadow-soft-lg fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md items-center justify-between gap-4 rounded-2xl p-4 sm:right-auto sm:left-4">
      <div>
        <p className="text-sm font-semibold">A new version is available</p>
        <p className="text-muted-foreground text-xs">
          Refresh to get the latest.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button size="sm" onClick={refresh}>
          Refresh
        </Button>
        <button
          onClick={() => setWaiting(null)}
          aria-label="Dismiss"
          className="text-muted-foreground hover:text-foreground text-lg"
        >
          ×
        </button>
      </div>
    </div>
  );
}
