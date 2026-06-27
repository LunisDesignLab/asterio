"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/ui/otp-input";
import { cn } from "@/lib/cn";
import { resendSignupOtp, verifyEmailOtp } from "@/lib/auth/client-auth";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;
  const visible = name.slice(0, 1);
  const last = name.length > 1 ? name.slice(-1) : "";
  return `${visible}${"*".repeat(Math.max(name.length - 2, 1))}${last}@${domain}`;
}

function VerifyContent() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const role = params.get("role") ?? "broker";

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [errorNonce, setErrorNonce] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  // Countdown so "Resend code" can't be spammed.
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  async function resend() {
    if (secondsLeft > 0) return;
    setSecondsLeft(RESEND_SECONDS);
    const result = await resendSignupOtp(email);
    if (!result.ok) fail(result.error);
  }

  function fail(message: string) {
    setError(message);
    setErrorNonce((n) => n + 1);
  }

  async function verify(value: string) {
    if (value.length < CODE_LENGTH) {
      fail("Enter the 6-digit code.");
      return;
    }
    setVerifying(true);
    const result = await verifyEmailOtp(email, value);
    setVerifying(false);
    if (!result.ok) {
      fail("That code isn't right. Check your inbox and try again.");
      return;
    }
    setError(null);
    router.push(`/signup/profile?role=${role}`);
  }

  return (
    <div className="flex w-full max-w-[360px] flex-col items-center gap-4xl text-center">
      <div className="flex flex-col gap-sm">
        <h1 className="text-display-md font-semibold tracking-[-0.72px] text-primary">
          Verify your email
        </h1>
        <p className="text-md text-tertiary">
          We&apos;ve sent a code to{" "}
          <span className="font-medium text-secondary">
            {email ? maskEmail(email) : "your email"}
          </span>
          . Enter it below.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3xl">
        <div className="flex flex-col gap-sm">
          <div key={errorNonce} className={cn("w-full", error && "animate-otp-bounce")}>
            <OtpInput
              length={CODE_LENGTH}
              autoFocus
              error={!!error}
              onChange={(value) => {
                setCode(value);
                if (error) setError(null);
              }}
              onComplete={verify}
            />
          </div>
          {error && <p className="text-left text-sm text-[#d92d20]">{error}</p>}
        </div>

        <div className="flex flex-col items-center gap-md">
          <Button
            type="button"
            variant="primary"
            fullWidth
            disabled={verifying}
            onClick={() => verify(code)}
          >
            {verifying ? "Verifying…" : "Verify code"}
          </Button>
          <p className="text-sm text-tertiary">
            Didn&apos;t receive the code?{" "}
            {secondsLeft > 0 ? (
              <span className="text-quaternary">Resend in {secondsLeft}s</span>
            ) : (
              <button
                type="button"
                onClick={resend}
                className="font-semibold text-brand-secondary"
              >
                Resend code
              </button>
            )}
          </p>
        </div>
      </div>

      <Link href="/signup" className="text-sm font-semibold text-secondary">
        ← Back to previous step
      </Link>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyContent />
    </Suspense>
  );
}
