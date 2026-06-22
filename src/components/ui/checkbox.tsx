import type { InputHTMLAttributes, ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
}

export function Checkbox({ label, id, className, ...props }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-lg">
      <span className="relative inline-flex size-[20px] shrink-0">
        <input
          id={id}
          type="checkbox"
          className={cn(
            "peer size-full cursor-pointer appearance-none rounded-sm border border-primary bg-primary shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] checked:border-[#7f56d9] checked:bg-brand-solid",
            className,
          )}
          {...props}
        />
        {/* Checkmark sits above the input so the filled background can't cover it */}
        <Check
          className="pointer-events-none absolute left-1/2 top-1/2 hidden size-[14px] -translate-x-1/2 -translate-y-1/2 text-white peer-checked:block"
          strokeWidth={3}
          aria-hidden="true"
        />
      </span>
      {label && <span className="text-sm text-secondary">{label}</span>}
    </label>
  );
}
