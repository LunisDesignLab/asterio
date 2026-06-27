import { Check, Crown, Rocket, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import type { Plan, PlanId } from "@/lib/plans";

const ICONS: Record<PlanId, LucideIcon> = {
  free: Rocket,
  plus: Zap,
  pro: Crown,
};

export function PlanCard({
  plan,
  price,
  onSelect,
}: {
  plan: Plan;
  price: number;
  onSelect: () => void;
}) {
  const Icon = ICONS[plan.id];
  const colorfulIcon = plan.featured || plan.id === "pro";

  const content = (
    <div
      className={cn(
        "relative flex flex-1 flex-col overflow-hidden bg-primary p-3xl",
        plan.featured ? "rounded-[14px]" : "rounded-2xl shadow-[inset_0_0_0_1px_#e9eaeb]",
      )}
    >
      {plan.featured && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[-14%] size-44 rounded-full bg-[#7f56d9]/25 blur-3xl animate-glow-drift" />
          <div className="absolute bottom-[2%] right-[4%] size-40 rounded-full bg-[#e48b0f]/18 blur-3xl animate-glow-drift [animation-delay:-4s]" />
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col gap-xl">
        <div className="flex flex-col gap-lg">
          <div className="flex items-center gap-md">
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-[10px]",
                plan.featured
                  ? "bg-white text-brand-secondary"
                  : colorfulIcon
                    ? "bg-[#f4f0ff] text-brand-secondary"
                    : "bg-secondary text-tertiary",
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="text-xl font-semibold text-primary">{plan.name}</h3>
            {plan.badge && (
              <span
                className={cn(
                  "rounded-full px-md py-[2px] text-xs font-semibold text-brand-secondary",
                  plan.featured ? "bg-white" : "bg-[#f4f0ff]",
                )}
              >
                {plan.badge}
              </span>
            )}
          </div>
          <p className="min-h-[80px] text-sm text-tertiary">{plan.tagline}</p>
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
            <li key={highlight} className="flex items-start gap-md text-sm font-medium text-secondary">
              <Check className="mt-[2px] size-4 shrink-0 text-brand-secondary" aria-hidden="true" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  if (!plan.featured) {
    return <div className="flex flex-1">{content}</div>;
  }

  return (
    <div className="relative flex flex-1 rounded-2xl p-[2px]">
      <div
        className="absolute inset-0 rounded-2xl animate-border-spin"
        style={{
          background:
            "conic-gradient(from var(--border-angle), #7f56d9, #e48b0f, #7f56d9, #e48b0f, #7f56d9)",
        }}
        aria-hidden="true"
      />
      <div className="relative flex flex-1">{content}</div>
    </div>
  );
}
