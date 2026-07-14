import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false },
};

export default function OfflinePage() {
  return (
    <Section className="text-center">
      <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
        {"// no connection"}
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
        You&apos;re <span className="text-gradient">offline</span>
      </h1>
      <p className="text-muted-foreground mx-auto mt-4 max-w-md">
        Looks like the network dropped. Pages you&apos;ve already visited are
        still available — reconnect to load the rest.
      </p>
      <div className="mt-8 flex justify-center">
        <Button href="/">Back to home</Button>
      </div>
    </Section>
  );
}
