"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, Lock } from "lucide-react";
import { AsterioLogo } from "@/components/icons/asterio-logo";
import { Notification } from "@/components/ui/notification";
import { getCurrentUserEmail } from "@/lib/auth/client-auth";
import { PLANS, orderBreakdown, type Billing } from "@/lib/plans";

// Stripe-style test cards — same numbers as real Stripe, so swapping to live
// Stripe later needs no test-flow changes. This screen is a DEMO: no real charge.
const TEST_SUCCESS = "4242424242424242";
const TEST_DECLINE = "4000000000000002";

function groupCard(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

function PaymentContent() {
  const router = useRouter();
  const params = useSearchParams();
  const role = params.get("role") ?? "broker";
  const planId = params.get("plan") ?? "plus";
  const billing: Billing = params.get("billing") === "annual" ? "annual" : "monthly";

  const plan = useMemo(() => PLANS.find((p) => p.id === planId) ?? null, [planId]);
  const isFree = plan?.id === "free";

  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill the email with the signed-in user's, so they don't retype it.
  // (Real Stripe does the same via customer_email / Element default values.)
  useEffect(() => {
    let active = true;
    getCurrentUserEmail().then((value) => {
      if (active && value) setEmail((prev) => prev || value);
    });
    return () => {
      active = false;
    };
  }, []);

  // Free plan has nothing to charge and no receipt — drop straight into the app.
  useEffect(() => {
    if (isFree) router.replace("/dashboard");
  }, [isFree, router]);

  if (!plan || isFree) return null;

  const { subtotal, vat, total } = orderBreakdown(plan, billing);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !card.trim() || !expiry.trim() || !cvc.trim() || !name.trim()) {
      setError("Please complete all payment fields.");
      return;
    }

    const digits = card.replace(/\s/g, "");
    setSubmitting(true);
    // Simulate the network round-trip a real charge would take.
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);

    if (digits === TEST_SUCCESS) {
      const trx = makeTrx();
      router.push(
        `/signup/success?plan=${planId}&billing=${billing}&amount=${total}&trx=${trx}&date=${encodeURIComponent(today())}`,
      );
      return;
    }
    if (digits === TEST_DECLINE) {
      router.push(`/signup/failed?role=${role}&plan=${planId}&billing=${billing}`);
      return;
    }
    setError(
      "Demo mode — use 4242 4242 4242 4242 to simulate success, or 4000 0000 0000 0002 to simulate a decline.",
    );
  }

  return (
    <div className="relative min-h-screen w-full">
      <header className="absolute left-8 top-8 flex items-center gap-[14px] text-[#0a0d12]">
        <AsterioLogo className="size-[30px]" />
        <span className="text-[23px] font-bold tracking-tight">Asterio</span>
      </header>

      <div className="mx-auto flex min-h-screen max-w-[980px] flex-col items-stretch gap-16 px-6 py-28 lg:flex-row lg:gap-24 lg:py-32">
        {/* Order summary */}
        <div className="flex flex-1 flex-col gap-xl">
          <div className="flex flex-col gap-xs">
            <p className="text-sm font-medium text-tertiary">Subscribe to Asterio {plan.name}</p>
            <div className="flex items-baseline gap-xs">
              <span className="text-display-md font-semibold tracking-[-0.72px] text-primary">
                AED {total}
              </span>
              <span className="text-md text-tertiary">
                / {billing === "annual" ? "year" : "month"}
              </span>
            </div>
          </div>

          <dl className="flex flex-col gap-md border-t border-secondary pt-xl text-md">
            <div className="flex items-center justify-between">
              <dt className="text-secondary">
                {plan.name} plan · {billing === "annual" ? "Annual" : "Monthly"}
              </dt>
              <dd className="text-primary">AED {subtotal}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-tertiary">VAT (5%)</dt>
              <dd className="text-tertiary">AED {vat}</dd>
            </div>
            <div className="mt-sm flex items-center justify-between border-t border-secondary pt-lg text-lg font-semibold">
              <dt className="text-primary">Total due</dt>
              <dd className="text-primary">AED {total}</dd>
            </div>
          </dl>

          <div className="flex items-start gap-md rounded-lg bg-secondary px-lg py-md text-sm text-tertiary">
            <Lock className="mt-[2px] size-4 shrink-0" aria-hidden="true" />
            <span>
              Demo checkout — no real charge. Use <strong className="text-secondary">4242 4242 4242 4242</strong>{" "}
              for success or <strong className="text-secondary">4000 0000 0000 0002</strong> for a decline.
            </span>
          </div>
        </div>

        {/* Payment form */}
        <div className="flex flex-1 flex-col">
          <form onSubmit={handlePay} noValidate className="flex flex-col gap-xl">
            {error && <Notification variant="error" onClose={() => setError(null)}>{error}</Notification>}

            <Field label="Email">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                autoComplete="email"
                className="w-full bg-transparent text-md text-primary outline-none placeholder:text-placeholder"
              />
            </Field>

            <div className="flex flex-col gap-sm">
              <label className="text-sm font-medium text-secondary">Card information</label>
              <div className="overflow-hidden rounded-md border border-primary shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
                <div className="flex items-center gap-md px-[14px] py-[10px]">
                  <input
                    inputMode="numeric"
                    value={card}
                    onChange={(e) => setCard(groupCard(e.target.value))}
                    placeholder="1234 1234 1234 1234"
                    autoComplete="cc-number"
                    className="w-full bg-transparent text-md text-primary outline-none placeholder:text-placeholder"
                  />
                  <CreditCard className="size-5 shrink-0 text-quaternary" aria-hidden="true" />
                </div>
                <div className="grid grid-cols-2 border-t border-primary">
                  <input
                    inputMode="numeric"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM / YY"
                    autoComplete="cc-exp"
                    className="border-r border-primary bg-transparent px-[14px] py-[10px] text-md text-primary outline-none placeholder:text-placeholder"
                  />
                  <input
                    inputMode="numeric"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    placeholder="CVC"
                    autoComplete="cc-csc"
                    className="bg-transparent px-[14px] py-[10px] text-md text-primary outline-none placeholder:text-placeholder"
                  />
                </div>
              </div>
            </div>

            <Field label="Cardholder name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name on card"
                autoComplete="cc-name"
                className="w-full bg-transparent text-md text-primary outline-none placeholder:text-placeholder"
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="mt-sm flex w-full items-center justify-center rounded-md bg-[#0570de] px-lg py-[12px] text-md font-semibold text-white transition-colors hover:bg-[#0461c2] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Processing…" : `Pay AED ${total}`}
            </button>

            <p className="flex items-center justify-center gap-xs text-xs text-quaternary">
              <Lock className="size-3.5" aria-hidden="true" /> Secured by Stripe · demo mode
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-sm">
      <label className="text-sm font-medium text-secondary">{label}</label>
      <div className="flex items-center rounded-md border border-primary px-[14px] py-[10px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
        {children}
      </div>
    </div>
  );
}

function makeTrx() {
  const n = Math.floor(1000 + Math.random() * 9000);
  const letters = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26)),
  ).join("");
  return `TRX-${n}-${letters}`;
}

function today() {
  return new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function PaymentPage() {
  return (
    <Suspense>
      <PaymentContent />
    </Suspense>
  );
}
