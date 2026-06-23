import { Suspense } from "react";

// Placeholder — real Stripe checkout + success/failure screens come in Phase B.
function PaymentContent() {
  return (
    <div className="flex w-full max-w-[360px] flex-col items-center gap-4xl text-center">
      <div className="flex flex-col gap-sm">
        <h1 className="text-display-md font-semibold tracking-[-0.72px] text-primary">
          Payment
        </h1>
        <p className="text-md text-tertiary">
          Coming next: Stripe checkout (Free skips this step).
        </p>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense>
      <PaymentContent />
    </Suspense>
  );
}
