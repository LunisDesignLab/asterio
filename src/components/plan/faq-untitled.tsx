"use client";

import {
  CreditCardRefresh,
  File05,
  Heart,
  Send01,
  SlashCircle01,
  SwitchHorizontal01,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const faqs = [
  {
    question: "Is there a free trial?",
    answer:
      "There's no time-limited trial. The Free plan lets you explore Asterio within its limits for as long as you like, and you can upgrade whenever you're ready.",
    icon: Heart,
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes — upgrade or downgrade anytime from your settings. Changes take effect on your next billing cycle.",
    icon: SwitchHorizontal01,
  },
  {
    question: "What's the difference between Plus and Pro?",
    answer:
      "Plus is built for independent brokers organizing a portfolio. Pro adds higher limits, full Discover Investors, advanced AI, automatic SPA tracking, PDF parsing and CSV exports.",
    icon: SlashCircle01,
  },
  {
    question: "How does annual billing work?",
    answer:
      "Annual plans are billed once a year at a discounted monthly rate — that's 2 months free. You can switch between monthly and annual at any time.",
    icon: CreditCardRefresh,
  },
  {
    question: "Do investors pay to receive my posts?",
    answer:
      "No. Investors you invite join for free and only see what you share with their groups. Your subscription covers the broker tools.",
    icon: File05,
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. There's no long-term commitment — cancel anytime and keep access until the end of your billing period.",
    icon: Send01,
  },
];

export const FaqUntitled = () => {
  return (
    <section className="bg-primary py-16 lg:py-24">
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

        <dl className="mt-16 grid grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          {faqs.map((item) => (
            <div key={item.question} className="flex max-w-[384px] flex-col items-center text-center">
              <FeaturedIcon color="gray" theme="modern" size="lg" icon={item.icon} />
              <dt className="mt-4 text-lg font-semibold text-primary md:mt-5 md:text-xl">
                {item.question}
              </dt>
              <dd className="mt-1 text-md text-tertiary md:mt-2">{item.answer}</dd>
            </div>
          ))}
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

        <div className="mx-auto mt-16 w-full md:max-h-100 md:overflow-hidden">
          <div className="size-full rounded-[9.03px] bg-primary p-[0.9px] shadow-lg ring-[0.56px] ring-utility-neutral-300 ring-inset md:rounded-[32px] md:p-1 md:ring-[2px]">
            <div className="size-full rounded-[7.9px] bg-primary p-0.5 shadow-modern-mockup-inner-md md:rounded-[28px] md:p-[5.4px] md:shadow-modern-mockup-inner-lg">
              <div className="relative size-full overflow-hidden rounded-[6.77px] bg-utility-neutral-50 ring-[0.56px] ring-utility-neutral-200 md:rounded-[24px] md:ring-[2px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/asterio-dashboard.png"
                  className="size-full object-cover object-top"
                  alt="Asterio broker dashboard"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
