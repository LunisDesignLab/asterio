import { X } from "lucide-react";
import { PaymentResultShell } from "@/components/checkout/payment-result-shell";
import { FailedActions } from "./failed-actions";

export default async function PaymentFailedPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const query = new URLSearchParams();
  if (sp.role) query.set("role", sp.role);
  if (sp.plan) query.set("plan", sp.plan);
  if (sp.billing) query.set("billing", sp.billing);
  const retryHref = `/signup/payment${query.toString() ? `?${query}` : ""}`;

  return (
    <PaymentResultShell
      rightPanel={
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/payment/success-building.jpg"
            alt=""
            className="absolute inset-0 size-full scale-110 object-cover blur-[18px]"
          />
          <div className="absolute inset-0 flex items-center justify-center p-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/payment/failed-invoice.png"
              alt="Failed invoice"
              className="w-[80%] max-w-[503px] object-contain drop-shadow-2xl"
            />
          </div>
        </>
      }
    >
      <div className="flex w-full flex-col items-center gap-4xl">
        <div className="flex w-full flex-col gap-lg">
          <div className="flex w-full items-center justify-center">
            <span className="flex size-20 items-center justify-center rounded-[28px] bg-[#fee4e2]">
              <span className="flex size-[52px] items-center justify-center rounded-full bg-[#d92d20] text-white">
                <X className="size-7" aria-hidden="true" />
              </span>
            </span>
          </div>
          <h1 className="text-display-md font-semibold tracking-[-0.72px] text-primary">
            Payment unsuccessful
          </h1>
          <p className="text-md text-tertiary">
            Something went wrong with your transaction. Please check your card details or contact
            your bank.
          </p>
        </div>

        <FailedActions retryHref={retryHref} />
      </div>
    </PaymentResultShell>
  );
}
