"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidEmail } from "@/lib/email";
import { signInWithPassword } from "@/lib/auth/client-auth";

// After this many wrong attempts we nudge toward a password reset; after the
// lock threshold we freeze the form for a short cooldown. This is UX friction —
// the unbypassable brute-force protection is Supabase's server-side rate limit.
const RESET_HINT_AFTER = 3;
const LOCK_AFTER = 5;
const LOCK_SECONDS = 30;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockSeconds, setLockSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const locked = lockSeconds > 0;
  const showResetHint = attempts >= RESET_HINT_AFTER;

  // Cooldown countdown while the form is locked.
  useEffect(() => {
    if (lockSeconds <= 0) return;
    const id = setTimeout(() => setLockSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [lockSeconds]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (locked || submitting) return;
    setError(null);

    const next: typeof errors = {};
    if (!isValidEmail(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    const result = await signInWithPassword(email, password);
    setSubmitting(false);

    if (result.ok) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    if (nextAttempts >= LOCK_AFTER) {
      setLockSeconds(LOCK_SECONDS);
      setError("Too many attempts. Please wait or reset your password.");
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="flex w-full max-w-[360px] flex-col items-center gap-4xl">
      <div className="flex flex-col gap-sm text-center">
        <h1 className="text-display-md font-semibold tracking-[-0.72px] text-primary">
          Welcome back
        </h1>
        <p className="text-md text-tertiary">Log in to your Asterio account.</p>
      </div>

      <div className="flex w-full flex-col gap-3xl">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3xl">
          <div className="flex flex-col gap-xl">
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
              }}
              error={errors.email}
            />
            <div className="flex flex-col gap-sm">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Enter your password"
                autoComplete="current-password"
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
              <div className="flex justify-end">
                <Link
                  href={`/forgot-password${email ? `?email=${encodeURIComponent(email)}` : ""}`}
                  className="text-sm font-semibold text-brand-secondary"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-md">
            {error && <p className="w-full text-left text-sm text-[#d92d20]">{error}</p>}
            {showResetHint && !locked && (
              <p className="w-full text-left text-sm text-tertiary">
                Trouble signing in?{" "}
                <Link
                  href={`/forgot-password${email ? `?email=${encodeURIComponent(email)}` : ""}`}
                  className="font-semibold text-brand-secondary"
                >
                  Reset your password
                </Link>
                .
              </p>
            )}
            <Button type="submit" variant="primary" fullWidth disabled={submitting || locked}>
              {locked ? `Try again in ${lockSeconds}s` : submitting ? "Logging in…" : "Log in"}
            </Button>
          </div>
        </form>

        <div className="flex items-center justify-center gap-xs">
          <span className="text-sm text-tertiary">Don&apos;t have an account?</span>
          <Link href="/signup" className="text-sm font-semibold text-brand-secondary">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
