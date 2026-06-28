import { createClient } from "@/lib/supabase/client";
import type { UserRole } from "@/lib/supabase/types";

/**
 * Client-side auth helpers. Components call these instead of touching the
 * Supabase client directly. Each returns a typed result the UI can render —
 * never a thrown error or raw Supabase shape.
 */
export type AuthResult =
  | { ok: true }
  | { ok: false; error: string; code?: "already_registered" | "invalid_credentials" };

/** Create an account. The role is stored in user metadata and the DB trigger
 * uses it to set `profiles.role`. Sends the 6-digit confirmation OTP by email.
 * If the email already belongs to a confirmed account, Supabase sends nothing
 * and returns a user with no identities — we surface that so the UI can guide
 * the person to log in instead. */
export async function signUpWithRole(
  email: string,
  password: string,
  role: UserRole,
): Promise<AuthResult> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { role } },
  });
  if (error) return { ok: false, error: error.message };
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return {
      ok: false,
      error: "An account with this email already exists.",
      code: "already_registered",
    };
  }
  return { ok: true };
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

/** Sign in with email + password. Supabase rate-limits this server-side, which
 * is the real brute-force protection; the login UI adds friction on top. */
export async function signInWithPassword(email: string, password: string): Promise<AuthResult> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (!error) return { ok: true };
  // Supabase returns the same "Invalid login credentials" whether the email is
  // unknown or the password is wrong — by design, to avoid email enumeration.
  const invalid = error.status === 400;
  return {
    ok: false,
    error: invalid ? "Incorrect email or password." : error.message,
    code: invalid ? "invalid_credentials" : undefined,
  };
}

/** Send a password-reset email. The link lands on /reset-password where the
 * user sets a new password. */
export async function sendPasswordReset(email: string): Promise<AuthResult> {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
  });
  return error ? { ok: false, error: error.message } : { ok: true };
}

/** Set a new password for the user in the current (recovery) session. */
export async function updatePassword(password: string): Promise<AuthResult> {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password });
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function signOut(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}
