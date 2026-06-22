import type { InputHTMLAttributes, ReactNode } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: boolean;
  error?: string;
  trailing?: ReactNode;
}

export function Input({ label, hint, error, trailing, className, id, ...props }: InputProps) {
  return (
    <div className="flex w-full flex-col gap-sm">
      {label && (
        <div className="flex items-center gap-xs">
          <label htmlFor={id} className="text-sm font-medium text-secondary">
            {label}
          </label>
          {hint && <Info className="size-[18px] text-quaternary" aria-hidden="true" />}
        </div>
      )}
      <div
        className={cn(
          "flex items-center gap-md rounded-md border bg-primary px-[14px] py-[10px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] transition-shadow",
          error
            ? "border-[#fda29b] focus-within:shadow-[0px_0px_0px_4px_rgba(240,68,56,0.18)]"
            : "border-primary focus-within:border-[#7f56d9] focus-within:shadow-[0px_0px_0px_4px_rgba(127,86,217,0.20)]",
        )}
      >
        <input
          id={id}
          className={cn(
            "w-full bg-transparent text-md text-primary outline-none placeholder:text-placeholder",
            className,
          )}
          aria-invalid={!!error}
          {...props}
        />
        {trailing}
      </div>
      {error && <p className="text-sm text-[#d92d20]">{error}</p>}
    </div>
  );
}
