"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    const onInstalled = () => setVisible(false);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!visible) return null;

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setVisible(false);
  }

  return (
    <div className="glass shadow-soft-lg fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-md items-center justify-between gap-4 rounded-2xl p-4 sm:inset-x-auto sm:right-4 sm:left-auto">
      <div>
        <p className="text-sm font-semibold">Install this portfolio</p>
        <p className="text-muted-foreground text-xs">
          Add it to your home screen for a fast, app-like experience.
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button size="sm" onClick={install}>
          Install
        </Button>
        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss"
          className="text-muted-foreground hover:text-foreground text-lg"
        >
          ×
        </button>
      </div>
    </div>
  );
}
