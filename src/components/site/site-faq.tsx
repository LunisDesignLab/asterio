"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { SITE_FAQS } from "@/lib/site-content";
import { cn } from "@/lib/cn";

export function SiteFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto flex w-full max-w-[768px] flex-col gap-md">
      {SITE_FAQS.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={faq.q}
            className="rounded-2xl border border-secondary bg-primary px-3xl py-xl transition-colors"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-xl text-left"
              aria-expanded={isOpen}
            >
              <span className="text-lg font-semibold text-primary">{faq.q}</span>
              <span className="flex size-6 shrink-0 items-center justify-center text-tertiary">
                {isOpen ? <Minus className="size-5" /> : <Plus className="size-5" />}
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-200",
                isOpen ? "mt-md grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="text-md text-tertiary">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
