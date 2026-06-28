"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordStrength } from "@/components/ui/password-strength";
import { GoogleIcon } from "@/components/icons/google";
import { isValidEmail, suggestEmailDomain } from "@/lib/email";
import { signUpWithRole } from "@/lib/auth/client-auth";
import type { UserRole } from "@/lib/supabase/types";

function SignupContent() {
  const router = useRouter();
  const params = useSearchParams();
  const role: UserRole = params.get("role") === "investor" ? "investor" : "broker";
  const [email, setEmail] = useState("");
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [existingAccount, setExistingAccount] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; agree?: string }>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setExistingAccount(false);
    const next: typeof errors = {};
    if (!isValidEmail(email)) next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Password must be at least 8 characters.";
    if (!agree) next.agree = "Please accept the Terms & conditions to continue.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    const result = await signUpWithRole(email, password, role);
    setSubmitting(false);
    if (!result.ok) {
      if (result.code === "already_registered") {
        setExistingAccount(true);
      } else {
        setFormError(result.error);
      }
      return;
    }
    router.push(`/signup/verify?email=${encodeURIComponent(email)}&role=${role}`);
  }

  return (
    <div className="flex w-full max-w-[360px] flex-col items-center gap-4xl">
      <div className="flex flex-col gap-sm text-center">
        <h1 className="text-display-md font-semibold tracking-[-0.72px] text-primary">
          Create your account
        </h1>
        <p className="text-md text-tertiary">
          Start your journey with the most advanced real estate brokerage platform in the UAE.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3xl">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3xl">
          <div className="flex flex-col gap-xl">
            <div className="flex flex-col gap-sm">
              <Input
                id="email"
                type="email"
                label="Email address"
                placeholder="name@company.com"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                  if (emailSuggestion) setEmailSuggestion(null);
                  if (existingAccount) setExistingAccount(false);
                }}
                onBlur={() => {
                  const value = email.trim();
                  if (value && !isValidEmail(value)) {
                    setErrors((p) => ({ ...p, email: "Enter a valid email address." }));
                    setEmailSuggestion(null);
                  } else {
                    setEmailSuggestion(suggestEmailDomain(value));
                  }
                }}
                error={errors.email}
              />
              {emailSuggestion && (
                <p className="text-sm text-tertiary">
                  Did you mean{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setEmail(emailSuggestion);
                      setEmailSuggestion(null);
                      setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    className="font-medium text-brand-secondary"
                  >
                    {emailSuggestion}
                  </button>
                  ?
                </p>
              )}
            </div>
            <div className="flex flex-col gap-md">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Create your password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-quaternary transition-colors hover:text-tertiary"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                }
              />
              <PasswordStrength password={password} />
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <Checkbox
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              label={
                <>
                  I agree with the{" "}
                  <Link href="/terms" className="font-medium text-brand-secondary">
                    Terms &amp; conditions
                  </Link>{" "}
                  of Asterio.
                </>
              }
            />
            {errors.agree && <p className="text-sm text-[#d92d20]">{errors.agree}</p>}
          </div>

          <div className="flex flex-col items-center gap-md">
            {formError && (
              <p className="w-full text-left text-sm text-[#d92d20]">{formError}</p>
            )}
            {existingAccount && (
              <div className="w-full rounded-lg bg-secondary px-lg py-md text-left text-sm text-secondary">
                An account with this email already exists.{" "}
                <Link href="/login" className="font-semibold text-brand-secondary">
                  Log in instead
                </Link>
                .
              </div>
            )}
            <Button type="submit" variant="primary" fullWidth disabled={submitting}>
              {submitting ? "Creating account…" : "Create account"}
            </Button>
            <p className="text-sm text-tertiary">or</p>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              leftIcon={<GoogleIcon className="size-6" />}
            >
              Sign up with Google
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-center gap-xs">
          <span className="text-sm text-tertiary">Already have an account?</span>
          <Link href="/login" className="text-sm font-semibold text-brand-secondary">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupContent />
    </Suspense>
  );
}
