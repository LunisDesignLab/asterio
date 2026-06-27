"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PLANS, annualMonthly, type Plan } from "@/lib/plans";
import { RecommendedBadge } from "@/components/icons/laurel";
import { BillingToggle, type Billing } from "@/components/plan/billing-toggle";
import { PlanCard } from "@/components/plan/plan-card";
import { PlanComparison } from "@/components/plan/plan-comparison";
import { FaqUntitled } from "@/components/plan/faq-untitled";
import { TestimonialsSection } from "@/components/plan/testimonials-section";

export function PlanContent() {
  const router = useRouter();
  const params = useSearchParams();
  const role = params.get("role") ?? "broker";
  const [billing, setBilling] = useState<Billing>("monthly");

  function select(planId: string) {
    // Phase B: Free completes onboarding; paid plans go through Stripe checkout.
    router.push(`/signup/payment?role=${role}&plan=${planId}&billing=${billing}`);
  }

  function priceFor(plan: Plan) {
    return billing === "annual" ? annualMonthly(plan.priceMonthly) : plan.priceMonthly;
  }

  return (
    <div className="flex flex-col">
      <div className="mx-auto flex w-full max-w-[1140px] flex-col gap-4xl px-8 pt-xl">
        <div className="flex flex-col items-center gap-xl text-center">
          <RecommendedBadge text="Recommended by Emaar" />
          <div className="flex flex-col gap-sm">
            <h1 className="text-display-sm font-semibold tracking-[-0.02em] text-primary">
              Choose your plan
            </h1>
            <p className="text-md text-tertiary">Start free, upgrade when you&apos;re ready.</p>
          </div>
          <div className="flex flex-col items-center gap-md">
            <BillingToggle value={billing} onChange={setBilling} />
            <p className="text-sm font-medium text-brand-secondary">
              Save 17% with annual billing — that&apos;s 2 months free.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-xl lg:flex-row lg:items-stretch">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              price={priceFor(plan)}
              onSelect={() => select(plan.id)}
            />
          ))}
        </div>

        <p className="text-center text-sm text-tertiary">
          No long-term commitment. Cancel anytime.
        </p>
      </div>

      <section className="bg-primary">
        <div className="mx-auto w-full max-w-[1140px] px-8 pt-8xl pb-[100px]">
          <PlanComparison onSelect={select} />
        </div>
      </section>
      <TestimonialsSection />
      <FaqUntitled />
    </div>
  );
}
