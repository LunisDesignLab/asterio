import { CircleCheck, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { COMPARISON, type Cell } from "@/lib/plans";

const GRID = "grid grid-cols-[1.7fr_1fr_1fr_1fr] items-center gap-md";

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

      <div className="flex flex-col gap-3xl">
        <div className={`${GRID} sticky top-0 z-10 border-b border-secondary bg-primary px-xl py-md`}>
          <span className="text-sm font-semibold text-tertiary">Features</span>
          <span className="text-center text-sm font-semibold text-primary">Free</span>
          <span className="text-center text-sm font-semibold text-primary">Plus</span>
          <span className="text-center text-sm font-semibold text-brand-secondary">Pro</span>
        </div>

        {COMPARISON.map((group) => (
          <div key={group.title} className="flex flex-col gap-sm">
            <h3 className="px-xl text-sm font-semibold text-brand-secondary">{group.title}</h3>
            <div className="overflow-hidden rounded-xl">
              {group.rows.map((row, index) => (
                <div
                  key={row.feature}
                  className={cn(`${GRID} px-xl py-lg text-sm`, index % 2 === 0 && "bg-secondary")}
                >
                  <span className="font-medium text-secondary">{row.feature}</span>
                  <CellView value={row.free} />
                  <CellView value={row.plus} />
                  <CellView value={row.pro} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
