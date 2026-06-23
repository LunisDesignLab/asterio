"use client";

import { Suspense, useState } from "react";
import { cn } from "@/lib/cn";
import { PlanContent, type CardsLayout } from "@/components/plan/plan-content";

const VARIANTS: { id: CardsLayout; label: string }[] = [
  { id: "rows", label: "A" },
  { id: "columns", label: "B" },
  { id: "split", label: "C" },
  { id: "carousel", label: "D" },
];

export default function PlanV2Page() {
  const [layout, setLayout] = useState<CardsLayout>("columns");

  return (
    <>
      <Suspense>
        <PlanContent cardsLayout={layout} />
      </Suspense>

      {/* Experiment switcher — floats over the bottom-right, off the layout flow */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-xs rounded-full border border-secondary bg-primary p-xs shadow-md">
        <span className="pl-md pr-xs text-xs font-medium text-tertiary">Layout</span>
        {VARIANTS.map((variant) => (
          <button
            key={variant.id}
            type="button"
            onClick={() => setLayout(variant.id)}
            className={cn(
              "size-7 rounded-full text-sm font-semibold transition-colors",
              layout === variant.id ? "bg-brand-solid text-white" : "text-tertiary hover:text-secondary",
            )}
            aria-pressed={layout === variant.id}
          >
            {variant.label}
          </button>
        ))}
      </div>
    </>
  );
}
