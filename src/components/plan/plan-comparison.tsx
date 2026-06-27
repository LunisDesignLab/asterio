import { CircleCheck, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { COMPARISON, type Cell } from "@/lib/plans";

const GRID = "grid grid-cols-[1.7fr_1fr_1fr_1fr] items-center gap-md";

// Precompute continuous zebra striping once (not during render).
const STRIPED_GROUPS = (() => {
  let index = 0;
  return COMPARISON.map((group) => ({
    title: group.title,
    rows: group.rows.map((row) => ({ ...row, striped: index++ % 2 === 0 })),
  }));
})();

function CellView({ value }: { value: Cell }) {
  if (value === true) {
    return <CircleCheck className="mx-auto size-5 text-[#17b26a]" aria-label="Included" />;
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

      <div className="overflow-hidden rounded-2xl">
        <div className={`${GRID} border-b border-secondary px-xl py-md`}>
          <span className="text-sm font-semibold text-tertiary">Features</span>
          <span className="text-center text-sm font-semibold text-primary">Free</span>
          <span className="text-center text-sm font-semibold text-primary">Plus</span>
          <span className="text-center text-sm font-semibold text-brand-secondary">Pro</span>
        </div>

        {STRIPED_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="px-xl pt-3xl pb-sm text-sm font-semibold text-brand-secondary">
              {group.title}
            </h3>
            {group.rows.map((row) => (
              <div
                key={row.feature}
                className={cn(
                  `${GRID} px-xl py-lg text-sm`,
                  row.striped ? "bg-[#f9f9f9]" : "bg-white",
                )}
              >
                <span className="font-medium text-secondary">{row.feature}</span>
                <CellView value={row.free} />
                <CellView value={row.plus} />
                <CellView value={row.pro} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
