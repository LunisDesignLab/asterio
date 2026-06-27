"use client";

import { useState } from "react";
import { MinusCircle, PlusCircle } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { cn } from "@/lib/cn";

const faqs = [
  {
    question: "Is there a free trial?",
    answer:
      "There's no time-limited trial. The Free plan lets you explore Asterio within its limits for as long as you like, and you can upgrade whenever you're ready.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes — upgrade or downgrade anytime from your settings. Changes take effect on your next billing cycle, and you keep access until the end of the current period.",
  },
  {
    question: "What's the difference between Plus and Pro?",
    answer:
      "Plus is built for independent brokers organizing a portfolio — it unlocks the Discover Investors list with up to 5 contacts a month. Pro raises that to 25, adds advanced AI insights, automatic deal tracking, PDF parsing and CSV exports.",
  },
  {
    question: "How does annual billing work?",
    answer:
      "Annual plans are billed once a year at a discounted monthly rate — that's 2 months free. You can switch between monthly and annual at any time, and the change applies from your next renewal.",
  },
  {
    question: "Do investors pay to receive my posts?",
    answer:
      "No. Investors you invite join for free and only see what you share with their groups. Your subscription covers the broker tools — distribution into your groups is always unlimited, on every plan.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. There's no long-term commitment — cancel anytime and keep access until the end of your billing period. Your groups and investors stay intact if you come back.",
  },
];

export const FaqUntitled = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set([0]));

  const toggle = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="bg-primary pt-14">
      <div className="mx-auto w-full max-w-container px-4 md:px-8">
        <div className="mx-auto flex max-w-[768px] flex-col items-center text-center">
          <span className="text-sm font-semibold text-brand-secondary md:text-md">FAQs</span>
          <h2 className="mt-3 text-display-md font-semibold text-primary md:text-display-lg">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-tertiary md:mt-6 md:text-xl">
            Have questions? We&apos;re here to help.
          </p>
        </div>

        <dl className="mx-auto mt-12 w-full max-w-[768px] md:mt-16">
          {faqs.map((item, index) => {
            const isOpen = openItems.has(index);
            const Icon = isOpen ? MinusCircle : PlusCircle;
            return (
              <div key={item.question} className="border-t border-secondary first:border-t-0">
                <dt>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="group flex w-full items-start justify-between gap-4 py-6 text-left"
                  >
                    <span className="text-lg font-semibold text-primary">{item.question}</span>
                    <Icon
                      aria-hidden="true"
                      className="mt-0.5 size-6 shrink-0 text-fg-quaternary transition-colors group-hover:text-fg-tertiary"
                    />
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${index}`}
                  hidden={!isOpen}
                  className={cn("pr-10 text-md text-tertiary md:text-lg", isOpen && "pb-6")}
                >
                  {item.answer}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="mt-16 flex flex-col items-center gap-6 rounded-2xl bg-secondary px-6 py-8 text-center md:gap-8">
          <div className="flex items-end -space-x-4">
            <Avatar src="https://www.untitledui.com/images/avatars/marco-kelly?fm=webp&q=80" alt="" size="lg" className="ring-[1.5px] ring-fg-white" />
            <Avatar src="https://www.untitledui.com/images/avatars/amelie-laurent?fm=webp&q=80" alt="" size="xl" className="z-10 ring-[1.5px] ring-fg-white" />
            <Avatar src="https://www.untitledui.com/images/avatars/jaya-willis?fm=webp&q=80" alt="" size="lg" className="ring-[1.5px] ring-fg-white" />
          </div>
          <div>
            <h4 className="text-xl font-semibold text-primary">Still have questions?</h4>
            <p className="mt-2 text-md text-tertiary md:text-lg">
              Can&apos;t find what you&apos;re looking for? Our team is happy to help.
            </p>
          </div>
          <Button size="xl">Get in touch</Button>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-display-sm font-semibold text-primary md:text-display-md">
            Start growing your portfolio with Asterio
          </h2>
        </div>

        <div className="mx-auto mt-16 w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/asterio-dashboard.png" className="h-auto w-full" alt="Asterio broker dashboard" />
        </div>
      </div>
    </section>
  );
};
