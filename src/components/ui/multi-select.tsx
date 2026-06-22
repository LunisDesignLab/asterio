"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface MultiSelectProps {
  label?: string;
  placeholder?: string;
  options: readonly string[];
  value: string[];
  error?: boolean;
  onChange: (value: string[]) => void;
}

export function MultiSelect({
  label,
  placeholder,
  options,
  value,
  error,
  onChange,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function toggle(option: string) {
    onChange(
      value.includes(option) ? value.filter((v) => v !== option) : [...value, option],
    );
  }

  const summary = value.length > 0 ? value.join(", ") : null;

  return (
    <div className="flex w-full flex-col gap-sm" ref={ref}>
      {label && <span className="text-sm font-medium text-secondary">{label}</span>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "flex w-full items-center justify-between gap-md rounded-md border bg-primary px-[14px] py-[10px] text-left shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] transition",
            error
              ? "border-[#fda29b]"
              : open
                ? "border-[#7f56d9] shadow-[0px_0px_0px_4px_rgba(127,86,217,0.20)]"
                : "border-primary",
          )}
        >
          <span className={cn("truncate text-md", summary ? "text-primary" : "text-placeholder")}>
            {summary ?? placeholder}
          </span>
          <ChevronDown
            className={cn(
              "size-5 shrink-0 text-quaternary transition-transform",
              open && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>

        {open && (
          <div
            role="listbox"
            className="absolute z-20 mt-xs max-h-[240px] w-full overflow-auto rounded-md border border-secondary bg-primary p-xs shadow-md"
          >
            {options.map((option) => {
              const selected = value.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => toggle(option)}
                  className="flex w-full items-center justify-between rounded-sm px-md py-[8px] text-left text-md text-primary transition-colors hover:bg-secondary"
                >
                  <span>{option}</span>
                  {selected && <Check className="size-4 text-brand-secondary" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
