"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PlanCard } from "@/components/plan/plan-card";
import type { Plan } from "@/lib/plans";

/** Variant D: the same big plan cards in a horizontal, snapping carousel. */
export function PlanCarousel({
  plans,
  priceFor,
  onSelect,
}: {
  plans: Plan[];
  priceFor: (plan: Plan) => number;
  onSelect: (planId: string) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByDir(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.7, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-xl overflow-x-auto scroll-smooth px-[2px] pb-md [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {plans.map((plan) => (
          <div key={plan.id} className="flex w-[86%] shrink-0 snap-center sm:w-[400px]">
            <PlanCard plan={plan} price={priceFor(plan)} onSelect={() => onSelect(plan.id)} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByDir(-1)}
        aria-label="Previous plan"
        className="absolute left-[-16px] top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-secondary bg-primary text-tertiary shadow-sm transition-colors hover:text-secondary"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollByDir(1)}
        aria-label="Next plan"
        className="absolute right-[-16px] top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-secondary bg-primary text-tertiary shadow-sm transition-colors hover:text-secondary"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
