"use client";

import { cn } from "@/lib/cn";

export type Billing = "monthly" | "annual";

const OPTIONS: { id: Billing; label: string }[] = [
  { id: "monthly", label: "Monthly" },
  { id: "annual", label: "Annual" },
];

export function BillingToggle({
  value,
  onChange,
}: {
  value: Billing;
  onChange: (value: Billing) => void;
}) {
  return (
    <div className="inline-flex items-center gap-xs rounded-full border border-secondary bg-primary p-xs">
      {OPTIONS.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "rounded-full px-xl py-[6px] text-sm font-semibold transition-colors",
              active ? "bg-brand-solid text-white" : "text-tertiary hover:text-secondary",
            )}
          >
            {option.label}
            {option.id === "annual" && (
              <span className={cn("ml-xs text-xs", active ? "text-white/80" : "text-brand-secondary")}>
                save 17%
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
