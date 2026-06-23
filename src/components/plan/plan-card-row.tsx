import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/lib/plans";

/** Horizontal plan card (variant A): one wide row per plan. */
export function PlanCardRow({
  plan,
  price,
  onSelect,
}: {
  plan: Plan;
  price: number;
  onSelect: () => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-xl rounded-2xl bg-primary p-3xl md:flex-row md:items-center",
        plan.featured ? "shadow-[inset_0_0_0_2px_#7f56d9]" : "shadow-[inset_0_0_0_1px_#e9eaeb]",
      )}
    >
      <div className="flex w-full shrink-0 flex-col gap-md md:w-[220px]">
        <div className="flex items-center gap-md">
          <h3 className="text-xl font-semibold text-primary">{plan.name}</h3>
          {plan.badge && (
            <span className="rounded-full bg-[#f4f0ff] px-md py-[2px] text-xs font-semibold text-brand-secondary">
              {plan.badge}
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-xs">
          <span className="text-display-sm font-semibold text-primary">
            {price === 0 ? "Free" : price}
          </span>
          {price !== 0 && <span className="text-sm text-tertiary">AED / mo</span>}
        </div>
        <p className="text-sm text-tertiary">{plan.tagline}</p>
      </div>

      <ul className="grid flex-1 gap-x-xl gap-y-md sm:grid-cols-2">
        {plan.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-md text-sm font-medium text-secondary">
            <Check className="mt-[2px] size-4 shrink-0 text-brand-secondary" aria-hidden="true" />
            {highlight}
          </li>
        ))}
      </ul>

      <div className="w-full shrink-0 md:w-[180px]">
        <Button variant={plan.featured ? "primary" : "secondary"} fullWidth onClick={onSelect}>
          {plan.cta}
        </Button>
      </div>
    </div>
  );
}
