import { createClient } from "@/lib/supabase/client";
import type { UserRole } from "@/lib/supabase/types";

/**
 * Client-side auth helpers. Components call these instead of touching the
 * Supabase client directly. Each returns a typed result the UI can render —
 * never a thrown error or raw Supabase shape.
 */
export type AuthResult = { ok: true } | { ok: false; error: string };

/** Create an account. The role is stored in user metadata and the DB trigger
 * uses it to set `profiles.role`. Sends the 6-digit confirmation OTP by email. */
export async function signUpWithRole(
  email: string,
  password: string,
  role: UserRole,
): Promise<AuthResult> {
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { role } },
  });
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Confirm the signup with the 6-digit code from the email. On success the
 * session is established and persisted to cookies for the server to read. */
export async function verifyEmailOtp(email: string, token: string): Promise<AuthResult> {
  const supabase = createClient();
  const { error } = await supabase.auth.verifyOtp({ email, token, type: "signup" });
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Re-send the signup confirmation code. */
export async function resendSignupOtp(email: string): Promise<AuthResult> {
  const supabase = createClient();
  const { error } = await supabase.auth.resend({ type: "signup", email });
  return error ? { ok: false, error: error.message } : { ok: true };
}
