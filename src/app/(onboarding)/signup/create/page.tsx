"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordStrength } from "@/components/ui/password-strength";
import { GoogleIcon } from "@/components/icons/google";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; agree?: string }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Password must be at least 8 characters.";
    if (!agree) next.agree = "Please accept the Terms & conditions to continue.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Phase B: call Supabase Auth signUp + send email OTP here.
    router.push(`/signup/verify?email=${encodeURIComponent(email)}`);
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
            <Input
              id="email"
              type="email"
              label="Email address"
              placeholder="name@company.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
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
            <Button type="submit" variant="primary" fullWidth>
              Create account
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
