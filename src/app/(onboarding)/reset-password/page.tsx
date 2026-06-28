"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordStrength } from "@/components/ui/password-strength";
import { updatePassword } from "@/lib/auth/client-auth";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError(null);
    setSubmitting(true);
    const result = await updatePassword(password);
    setSubmitting(false);
    if (!result.ok) {
      setError("This reset link is invalid or has expired. Request a new one.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex w-full max-w-[360px] flex-col items-center gap-4xl">
      <div className="flex flex-col gap-sm text-center">
        <h1 className="text-display-md font-semibold tracking-[-0.72px] text-primary">
          Set a new password
        </h1>
        <p className="text-md text-tertiary">Choose a new password for your account.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-3xl">
        <div className="flex flex-col gap-md">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            label="New password"
            placeholder="Create a new password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(null);
            }}
            error={error ?? undefined}
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

        <Button type="submit" variant="primary" fullWidth disabled={submitting}>
          {submitting ? "Saving…" : "Update password"}
        </Button>
      </form>
    </div>
  );
}
