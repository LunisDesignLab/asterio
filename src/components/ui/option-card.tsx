import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface OptionCardProps {
  selected?: boolean;
  onClick?: () => void;
  icon: ReactNode;
  title: string;
}

/** Selectable card with an icon, title and radio/check indicator. */
export function OptionCard({ selected, onClick, icon, title }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex h-[116px] w-full items-center gap-2xl rounded-4xl bg-secondary px-xl text-left transition-colors",
        selected ? "border-[3px] border-[#7f56d9]" : "border border-secondary",
      )}
    >
      <span className="flex shrink-0 items-center justify-center">{icon}</span>
      <span className="flex-1 text-xl font-semibold text-primary">{title}</span>
      {selected ? (
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-solid">
          <Check className="size-[14px] text-white" strokeWidth={3} aria-hidden="true" />
        </span>
      ) : (
        <span className="size-6 shrink-0 rounded-full border border-primary bg-primary" />
      )}
    </button>
  );
}
