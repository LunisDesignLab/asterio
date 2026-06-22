"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OptionCard } from "@/components/ui/option-card";
import { BrokerRoleIcon, InvestorRoleIcon } from "@/components/icons/role-icons";

type Role = "broker" | "investor";

export default function RolePage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("broker");

  function getStarted() {
    // Role is the first step. Both roles continue to account creation;
    // the investor self-signup flow diverges later (TBD).
    router.push(`/signup/create?role=${role}`);
  }

  return (
    <div className="flex w-full flex-col items-center gap-8xl">
      <div className="flex w-full max-w-[360px] flex-col items-center gap-4xl">
        <h1 className="text-center text-display-md font-semibold tracking-[-0.72px] text-primary">
          Choose your role
        </h1>

        <div className="flex w-full flex-col gap-lg">
          <OptionCard
            selected={role === "broker"}
            onClick={() => setRole("broker")}
            title="Broker"
            icon={<BrokerRoleIcon className="size-10" />}
          />
          <OptionCard
            selected={role === "investor"}
            onClick={() => setRole("investor")}
            title="Investor"
            icon={<InvestorRoleIcon className="size-12" />}
          />
        </div>

        <Button variant="primary" fullWidth onClick={getStarted}>
          Get started
        </Button>

        <div className="flex items-center justify-center gap-xs">
          <span className="text-sm text-tertiary">Already have an account?</span>
          <Link href="/login" className="text-sm font-semibold text-brand-secondary">
            Log in
          </Link>
        </div>
      </div>

      <Link
        href="/partner"
        className="relative flex h-[74px] w-full max-w-[496px] items-center overflow-hidden rounded-3xl border border-secondary bg-[#f9f9f9] px-[19px]"
      >
        <div className="relative z-10 flex flex-col gap-[2px]">
          <span className="text-sm text-tertiary">Are you a real estate developer?</span>
          <span className="text-sm font-semibold text-brand-secondary">Partner with us</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/onboarding/developer-card.png"
          alt=""
          className="pointer-events-none absolute right-[-1px] top-[-7px] h-[94px] w-[131px] object-cover blur-[6px]"
        />
      </Link>
    </div>
  );
}
