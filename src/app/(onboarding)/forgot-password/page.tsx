"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidEmail } from "@/lib/email";
import { sendPasswordReset } from "@/lib/auth/client-auth";

function ForgotPasswordContent() {
  const params = useSearchParams();
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setSubmitting(true);
    // Ignore the result on purpose: always show the same confirmation so we
    // never reveal whether an account exists (anti-enumeration).
    await sendPasswordReset(email);
    setSubmitting(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex w-full max-w-[360px] flex-col items-center gap-4xl text-center">
        <div className="flex flex-col gap-sm">
          <h1 className="text-display-md font-semibold tracking-[-0.72px] text-primary">
            Check your email
          </h1>
          <p className="text-md text-tertiary">
            If an account exists for{" "}
            <span className="font-medium text-secondary">{email}</span>, we&apos;ve sent a
            link to reset your password.
          </p>
        </div>
        <Link href="/login" className="text-sm font-semibold text-secondary">
          ← Back to log in
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-[360px] flex-col items-center gap-4xl">
      <div className="flex flex-col gap-sm text-center">
        <h1 className="text-display-md font-semibold tracking-[-0.72px] text-primary">
          Forgot your password?
        </h1>
        <p className="text-md text-tertiary">
          Enter your email and we&apos;ll send you a link to reset it.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-3xl">
        <Input
          id="email"
          type="email"
          label="Email address"
          placeholder="name@company.com"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          error={error ?? undefined}
        />

        <div className="flex flex-col items-center gap-lg">
          <Button type="submit" variant="primary" fullWidth disabled={submitting}>
            {submitting ? "Sending…" : "Send reset link"}
          </Button>
          <Link
            href="/login"
            className="flex items-center justify-center gap-sm text-md font-semibold text-tertiary"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
            Back to log in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordContent />
    </Suspense>
  );
}
