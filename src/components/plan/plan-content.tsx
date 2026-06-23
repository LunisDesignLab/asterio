"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PLANS, annualMonthly, type Plan } from "@/lib/plans";
import { Button } from "@/components/ui/button";
import { BillingToggle, type Billing } from "@/components/plan/billing-toggle";
import { PlanCard } from "@/components/plan/plan-card";
import { PlanCardRow } from "@/components/plan/plan-card-row";
import { PlanComparison } from "@/components/plan/plan-comparison";
import { FaqSection } from "@/components/plan/faq-section";
import { Testimonials } from "@/components/plan/testimonials";

export type CardsLayout = "columns" | "rows" | "split";

export function PlanContent({ cardsLayout = "columns" }: { cardsLayout?: CardsLayout }) {
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

      {cardsLayout === "rows" ? (
        <div className="flex flex-col gap-lg">
          {PLANS.map((plan) => (
            <PlanCardRow
              key={plan.id}
              plan={plan}
              price={priceFor(plan)}
              onSelect={() => select(plan.id)}
            />
          ))}
        </div>
      ) : cardsLayout === "split" ? (
        <SplitCards priceFor={priceFor} onSelect={select} />
      ) : (
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
      )}

      <PlanComparison />
      <FaqSection />
      <Testimonials />
    </div>
  );
}

/** Variant C: Free as a slim strip, Plus + Pro as the two prominent choices. */
function SplitCards({
  priceFor,
  onSelect,
}: {
  priceFor: (plan: Plan) => number;
  onSelect: (planId: string) => void;
}) {
  const free = PLANS.find((p) => p.id === "free")!;
  const paid = PLANS.filter((p) => p.id !== "free");

  return (
    <div className="flex flex-col gap-xl">
      <div className="flex flex-col gap-md rounded-2xl bg-primary p-xl shadow-[inset_0_0_0_1px_#e9eaeb] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-xxs">
          <div className="flex flex-wrap items-baseline gap-md">
            <h3 className="text-lg font-semibold text-primary">{free.name}</h3>
            <span className="text-sm text-tertiary">1 group · 50 members · developer & manual posts</span>
          </div>
          <p className="text-sm text-tertiary">{free.tagline}</p>
        </div>
        <div className="shrink-0">
          <Button variant="secondary" onClick={() => onSelect(free.id)}>
            {free.cta}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-xl lg:flex-row lg:items-stretch">
        {paid.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            price={priceFor(plan)}
            onSelect={() => onSelect(plan.id)}
          />
        ))}
      </div>
    </div>
  );
}
