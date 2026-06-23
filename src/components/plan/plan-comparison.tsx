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
        {/* Column header — the single, clearly-styled header of the table */}
        <div className={`${GRID} border-b-2 border-secondary px-xl py-xl`}>
          <span className="text-sm font-semibold text-tertiary">Features</span>
          <span className="text-center text-md font-semibold text-primary">Free</span>
          <span className="text-center text-md font-semibold text-primary">Plus</span>
          <span className="text-center text-md font-semibold text-brand-secondary">Pro</span>
        </div>

        {/* Categories — subtle uppercase labels, not header bands */}
        {COMPARISON.map((group, index) => (
          <details key={group.title} open={index === 0} className="group">
            <summary className="flex cursor-pointer list-none items-center gap-md border-t border-secondary px-xl py-md text-xs font-semibold uppercase tracking-[0.06em] text-tertiary transition-colors hover:text-secondary [&::-webkit-details-marker]:hidden">
              <ChevronDown
                className="size-4 shrink-0 -rotate-90 transition-transform group-open:rotate-0"
                aria-hidden="true"
              />
              {group.title}
            </summary>
            <div className="pb-sm">
              {group.rows.map((row) => (
                <div key={row.feature} className={`${GRID} px-xl py-md text-sm`}>
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
