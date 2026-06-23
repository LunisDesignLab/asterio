import { Check, ChevronDown, Minus } from "lucide-react";
import { COMPARISON, type Cell } from "@/lib/plans";

const GRID = "grid grid-cols-[1.7fr_1fr_1fr_1fr] items-center gap-md";

function CellView({ value }: { value: Cell }) {
  if (value === true) {
    return <Check className="mx-auto size-[18px] text-brand-secondary" aria-label="Included" />;
  }
  if (value === false) {
    return <Minus className="mx-auto size-[18px] text-quaternary" aria-label="Not included" />;
  }
  return <span className="block text-center text-sm font-medium text-secondary">{value}</span>;
}

export function PlanComparison() {
  return (
    <section className="flex flex-col gap-xl">
      <h2 className="text-display-xs font-semibold text-primary">Compare plans</h2>

      <div className="overflow-hidden rounded-2xl bg-primary shadow-[inset_0_0_0_1px_#e9eaeb]">
        <div className={`${GRID} border-b border-secondary px-xl py-lg text-sm font-semibold text-tertiary`}>
          <span>Feature</span>
          <span className="text-center">Free</span>
          <span className="text-center">Plus</span>
          <span className="text-center">Pro</span>
        </div>

        {COMPARISON.map((group, index) => (
          <details key={group.title} open={index === 0} className="group border-b border-secondary last:border-b-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-md bg-secondary px-xl py-lg text-sm font-semibold text-primary [&::-webkit-details-marker]:hidden">
              {group.title}
              <ChevronDown
                className="size-5 shrink-0 text-quaternary transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div>
              {group.rows.map((row) => (
                <div
                  key={row.feature}
                  className={`${GRID} border-t border-secondary px-xl py-md text-sm`}
                >
                  <span className="text-secondary">{row.feature}</span>
                  <CellView value={row.free} />
                  <CellView value={row.plus} />
                  <CellView value={row.pro} />
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
