"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function FailedActions({ retryHref }: { retryHref: string }) {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col gap-xl">
      <Button variant="primary" fullWidth onClick={() => router.push(retryHref)}>
        Retry payment
      </Button>
      <Button
        variant="secondary"
        fullWidth
        onClick={() => {
          window.location.href = "mailto:support@asterio.ae";
        }}
      >
        Contact support
      </Button>
    </div>
  );
}
