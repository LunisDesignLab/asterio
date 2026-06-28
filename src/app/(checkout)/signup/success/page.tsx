import { CheckCircle } from "lucide-react";
import { PaymentResultShell } from "@/components/checkout/payment-result-shell";
import { PLANS } from "@/lib/plans";
import { SuccessActions } from "./success-actions";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const plan = PLANS.find((p) => p.id === sp.plan);
  const planLabel = plan ? `${plan.name} plan` : "Asterio plan";
  const amount = sp.amount ?? "0";
  const billing = sp.billing === "annual" ? "Annual" : "Monthly";
  const trx = sp.trx ?? "TRX-0000-XXXX";
  const date = sp.date ?? "—";

  return (
    <PaymentResultShell
      rightPanel={
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/payment/success-building.jpg"
            alt="Modern Dubai development"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0d12]/70" />
        </>
      }
    >
      <div className="flex w-full flex-col items-center gap-4xl">
        <div className="flex w-full flex-col gap-lg">
          <div className="flex w-full items-center justify-center">
            <span className="flex size-20 items-center justify-center rounded-[28px] bg-[#dcfae6]">
              <span className="flex size-[52px] items-center justify-center rounded-full bg-[#079455] text-white">
                <CheckCircle className="size-7" aria-hidden="true" />
              </span>
            </span>
          </div>
          <h1 className="text-display-md font-semibold tracking-[-0.72px] text-primary">
            Payment Successful!
          </h1>
          <p className="text-md text-tertiary">
            Welcome to the future of real estate. Your account is now fully active.
          </p>
        </div>

        <dl className="flex w-full flex-col gap-xl rounded-2xl bg-secondary p-3xl">
          <Row label="Transaction ID" value={trx} />
          <div className="h-px w-full bg-[#e9eaeb]" />
          <Row label="Plan" value={planLabel} />
          <Row label="Amount Paid" value={`AED ${amount}`} />
          <Row label="Date" value={date} />
        </dl>

        <SuccessActions
          receipt={{ plan: planLabel, billing, amount, trx, date }}
        />
      </div>
    </PaymentResultShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-md text-md">
      <dt className="text-tertiary">{label}</dt>
      <dd className="font-semibold text-primary">{value}</dd>
    </div>
  );
}
