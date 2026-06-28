import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { BrokerProfile } from "@/lib/supabase/types";

/**
 * Broker-specific professional data, isolated owner-only by RLS. A broker can
 * only ever read/write their own row — the database enforces that brokers never
 * see other brokers.
 */

export async function getMyBrokerProfile(): Promise<BrokerProfile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("broker_profiles")
    .select("*")
    .eq("broker_id", user.id)
    .single();

  return error ? null : data;
}

export async function upsertMyBrokerProfile(input: {
  company?: string | null;
  rera_number?: string | null;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "You need to be signed in." };

  const { error } = await supabase
    .from("broker_profiles")
    .upsert({ broker_id: user.id, ...input }, { onConflict: "broker_id" });

  return error ? { ok: false, error: error.message } : { ok: true };
}
