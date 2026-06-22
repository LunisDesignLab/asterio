"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { filterOptions } from "@/lib/filter-options";

interface MultiComboboxProps {
  label?: string;
  placeholder?: string;
  options: readonly string[];
  value: string[];
  error?: boolean;
  onChange: (value: string[]) => void;
}

export function MultiCombobox({
  label,
  placeholder,
  options,
  value,
  error,
  onChange,
}: MultiComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = filterOptions(options, query, value);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function add(option: string) {
    onChange([...value, option]);
    setQuery("");
    setHighlight(0);
    inputRef.current?.focus();
  }

  function remove(option: string) {
    onChange(value.filter((v) => v !== option));
  }

  function openAndFocus() {
    setOpen(true);
    setHighlight(0);
    inputRef.current?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && filtered[highlight]) add(filtered[highlight]);
    } else if (e.key === "Backspace" && query === "" && value.length > 0) {
      remove(value[value.length - 1]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  }

  return (
    <div className="flex w-full flex-col gap-sm" ref={rootRef}>
      {label && <span className="text-sm font-medium text-secondary">{label}</span>}
      <div className="relative">
        <div
          onClick={openAndFocus}
          className={cn(
            "flex min-h-[44px] w-full cursor-text flex-wrap items-center gap-xs rounded-md border bg-primary py-[5px] pl-[8px] pr-[38px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] transition",
            error
              ? "border-[#fda29b]"
              : open
                ? "border-[#7f56d9] shadow-[0px_0px_0px_4px_rgba(127,86,217,0.20)]"
                : "border-primary",
          )}
        >
          {value.map((v) => (
            <span
              key={v}
              className="flex items-center gap-xs rounded-sm border border-secondary bg-secondary py-[2px] pl-md pr-[6px] text-sm font-medium text-secondary"
            >
              {v}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(v);
                }}
                className="text-quaternary transition-colors hover:text-tertiary"
                aria-label={`Remove ${v}`}
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setHighlight(0);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder={value.length === 0 ? placeholder : ""}
            className="min-w-[80px] flex-1 bg-transparent text-md text-primary outline-none placeholder:text-placeholder"
          />
        </div>
        <ChevronDown
          className={cn(
            "pointer-events-none absolute right-[14px] top-[12px] size-5 text-quaternary transition-transform",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />

        {open && (
          <div
            role="listbox"
            className="absolute z-20 mt-xs max-h-[240px] w-full overflow-auto rounded-md border border-secondary bg-primary p-xs shadow-md"
          >
            {filtered.length > 0 ? (
              filtered.map((option, i) => (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={i === highlight}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => add(option)}
                  className={cn(
                    "flex w-full items-center rounded-sm px-md py-[8px] text-left text-md text-primary transition-colors",
                    i === highlight && "bg-secondary",
                  )}
                >
                  {option}
                </button>
              ))
            ) : (
              <p className="px-md py-[8px] text-sm text-tertiary">No matches</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
