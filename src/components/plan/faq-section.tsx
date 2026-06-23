import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/plans";

export function FaqSection() {
  return (
    <section className="flex flex-col gap-xl">
      <h2 className="text-display-xs font-semibold text-primary">Frequently asked questions</h2>
      <div className="flex flex-col gap-md">
        {FAQS.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-xl bg-primary px-xl py-lg shadow-[inset_0_0_0_1px_#e9eaeb]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-md text-md font-semibold text-primary [&::-webkit-details-marker]:hidden">
              {faq.q}
              <ChevronDown
                className="size-5 shrink-0 text-quaternary transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="pt-md text-sm text-tertiary">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
