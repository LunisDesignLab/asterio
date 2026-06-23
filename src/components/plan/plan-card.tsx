import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/lib/plans";

export function PlanCard({
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
        "flex flex-1 flex-col gap-xl rounded-2xl bg-primary p-3xl",
        plan.featured
          ? "shadow-md shadow-[inset_0_0_0_2px_#7f56d9]"
          : "shadow-[inset_0_0_0_1px_#e9eaeb]",
      )}
    >
      <div className="flex flex-col gap-xs">
        <div className="flex items-center gap-md">
          <h3 className="text-xl font-semibold text-primary">{plan.name}</h3>
          {plan.featured && (
            <span className="rounded-full bg-[#f4f0ff] px-md py-[2px] text-xs font-semibold text-brand-secondary">
              Most popular
            </span>
          )}
        </div>
        <p className="text-sm text-tertiary">{plan.tagline}</p>
      </div>

      <div className="flex items-baseline gap-xs">
        <span className="text-display-sm font-semibold text-primary">
          {price === 0 ? "Free" : price}
        </span>
        {price !== 0 && <span className="text-sm text-tertiary">AED / month</span>}
      </div>

      <Button variant={plan.featured ? "primary" : "secondary"} fullWidth onClick={onSelect}>
        {plan.cta}
      </Button>

      <ul className="flex flex-col gap-md">
        {plan.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-md text-sm text-secondary">
            <Check className="mt-[2px] size-4 shrink-0 text-brand-secondary" aria-hidden="true" />
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  );
}
