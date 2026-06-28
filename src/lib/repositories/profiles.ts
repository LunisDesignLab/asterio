import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";

/**
 * Server-side data access for the current user's profile. Reads/writes go
 * through the RLS-scoped server client, so the database — not this code —
 * guarantees a user can only ever touch their own row.
 */

/** The signed-in user's profile, or null if not authenticated. */
export async function getMyProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return error ? null : data;
}

export type UpdateProfileInput = {
  full_name?: string | null;
  phone?: string | null;
  preferred_languages?: string[];
};

/** Update the signed-in user's profile. RLS blocks updating anyone else's. */
export async function updateMyProfile(
  input: UpdateProfileInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "You need to be signed in." };

  const { error } = await supabase.from("profiles").update(input).eq("id", user.id);
  return error ? { ok: false, error: error.message } : { ok: true };
}
