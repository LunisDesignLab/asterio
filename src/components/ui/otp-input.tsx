"use client";

import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/cn";

interface OtpInputProps {
  length?: number;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
}

export function OtpInput({
  length = 6,
  error,
  disabled,
  autoFocus,
  onChange,
  onComplete,
}: OtpInputProps) {
  const [values, setValues] = useState<string[]>(() => Array(length).fill(""));
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus();
  }, [autoFocus]);

  function commit(next: string[]) {
    setValues(next);
    const code = next.join("");
    onChange?.(code);
    if (next.every((v) => v !== "")) onComplete?.(code);
  }

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const next = [...values];
    next[index] = digit;
    if (digit && index < length - 1) refs.current[index + 1]?.focus();
    commit(next);
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = [...values];
      if (next[index]) {
        next[index] = "";
      } else if (index > 0) {
        refs.current[index - 1]?.focus();
        next[index - 1] = "";
      }
      commit(next);
    } else if (e.key === "ArrowLeft" && index > 0) {
      refs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!text) return;
    const next = Array(length).fill("");
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    refs.current[Math.min(text.length, length - 1)]?.focus();
    commit(next);
  }

  return (
    <div className="flex w-full items-center gap-md">
      {Array.from({ length }).map((_, i) => (
        <div key={i} className="contents">
          <input
            ref={(el) => {
              refs.current[i] = el;
            }}
            autoFocus={autoFocus && i === 0}
            type="text"
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            maxLength={1}
            disabled={disabled}
            value={values[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={cn(
              "aspect-square w-full min-w-0 rounded-lg border bg-primary text-center text-display-xs font-semibold text-primary shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] outline-none transition disabled:opacity-60",
              error
                ? "border-[#fda29b] focus:shadow-[0px_0px_0px_4px_rgba(240,68,56,0.18)]"
                : values[i]
                  ? "border-[#7f56d9]"
                  : "border-primary",
              !error && "focus:border-[#7f56d9] focus:shadow-[0px_0px_0px_4px_rgba(127,86,217,0.20)]",
            )}
          />
          {i === Math.floor(length / 2) - 1 && (
            <span className="text-display-xs text-quaternary" aria-hidden="true">
              –
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
