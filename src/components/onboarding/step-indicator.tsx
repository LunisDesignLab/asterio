"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

// "/signup" (Choose your role) is a pre-step with no indicator.
// Main steps: Account → Profile → Plan → Payment.
const STEP_BY_PATH: Record<string, number> = {
  "/signup/create": 1,
  "/signup/verify": 1,
  "/signup/profile": 2,
  "/signup/plan": 3,
  "/signup/payment": 4,
};

export function StepIndicator({ total = 4 }: { total?: number }) {
  const pathname = usePathname();
  const current = STEP_BY_PATH[pathname];

  // No indicator on the role-selection step.
  if (current === undefined) return null;

  return (
    <div className="flex items-center gap-xl">
      <span className="text-sm font-medium text-secondary">
        Step {current}/{total}
      </span>
      <div className="flex w-[140px] items-center gap-lg">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full",
              i < current ? "bg-brand-solid" : "bg-quaternary",
            )}
          />
        ))}
      </div>
    </div>
  );
}
