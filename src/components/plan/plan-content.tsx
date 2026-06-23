"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PLANS, annualMonthly } from "@/lib/plans";
import { BillingToggle, type Billing } from "@/components/plan/billing-toggle";
import { PlanCard } from "@/components/plan/plan-card";
import { PlanComparison } from "@/components/plan/plan-comparison";
import { FaqSection } from "@/components/plan/faq-section";
import { Testimonials } from "@/components/plan/testimonials";

export function PlanContent() {
  const router = useRouter();
  const params = useSearchParams();
  const role = params.get("role") ?? "broker";
  const [billing, setBilling] = useState<Billing>("monthly");

  function select(planId: string) {
    // Phase B: Free completes onboarding; paid plans go through Stripe checkout.
    router.push(`/signup/payment?role=${role}&plan=${planId}&billing=${billing}`);
  }

  return (
    <div className="flex flex-col gap-8xl py-7xl">
      <div className="flex flex-col items-center gap-xl text-center">
        <div className="flex flex-col gap-sm">
          <h1 className="text-display-sm font-semibold tracking-[-0.02em] text-primary">
            Choose your plan
          </h1>
          <p className="text-md text-tertiary">
            Start free, upgrade when you&apos;re ready. Cancel anytime.
          </p>
        </div>
        <BillingToggle value={billing} onChange={setBilling} />
      </div>

      <div className="flex flex-col gap-xl lg:flex-row lg:items-stretch">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            price={billing === "annual" ? annualMonthly(plan.priceMonthly) : plan.priceMonthly}
            onSelect={() => select(plan.id)}
          />
        ))}
      </div>

      <PlanComparison />
      <FaqSection />
      <Testimonials />
    </div>
  );
}
