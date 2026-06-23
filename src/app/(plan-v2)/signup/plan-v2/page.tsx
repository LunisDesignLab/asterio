"use client";

import { Suspense, useState } from "react";
import { cn } from "@/lib/cn";
import { PlanContent, type CardsLayout } from "@/components/plan/plan-content";

const VARIANTS: { id: CardsLayout; label: string }[] = [
  { id: "rows", label: "A" },
  { id: "columns", label: "B" },
  { id: "split", label: "C" },
];

export default function PlanV2Page() {
  const [layout, setLayout] = useState<CardsLayout>("columns");

  return (
    <div className="relative">
      <div className="sticky top-4 z-30 flex justify-end">
        <div className="inline-flex items-center gap-xs rounded-full border border-secondary bg-primary p-xs shadow-sm">
          <span className="pl-md pr-xs text-xs font-medium text-tertiary">Layout</span>
          {VARIANTS.map((variant) => (
            <button
              key={variant.id}
              type="button"
              onClick={() => setLayout(variant.id)}
              className={cn(
                "size-7 rounded-full text-sm font-semibold transition-colors",
                layout === variant.id
                  ? "bg-brand-solid text-white"
                  : "text-tertiary hover:text-secondary",
              )}
              aria-pressed={layout === variant.id}
            >
              {variant.label}
            </button>
          ))}
        </div>
      </div>

      <Suspense>
        <PlanContent cardsLayout={layout} />
      </Suspense>
    </div>
  );
}
