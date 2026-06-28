import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Group } from "@/lib/supabase/types";

/**
 * Investor groups for the signed-in broker. RLS scopes every query to the
 * broker's own rows, and the DB trigger caps how many they can create.
 */

export async function listMyGroups(): Promise<Group[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .order("created_at", { ascending: false });
  return error ? [] : (data ?? []);
}

export async function countMyGroups(): Promise<number> {
  const supabase = await createClient();
  const { count } = await supabase.from("groups").select("*", { count: "exact", head: true });
  return count ?? 0;
}

export type CreateGroupResult =
  | { ok: true; group: Group }
  | { ok: false; error: string; code?: "limit_reached" };

export async function createGroup(input: {
  name: string;
  description?: string | null;
  private_mode?: boolean;
  units_type?: string[];
  categories?: string[];
}): Promise<CreateGroupResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "You need to be signed in." };

  const { data, error } = await supabase
    .from("groups")
    .insert({
      broker_id: user.id,
      name: input.name.trim(),
      description: input.description?.trim() || null,
      private_mode: input.private_mode ?? false,
      units_type: input.units_type ?? [],
      categories: input.categories ?? [],
    })
    .select("*")
    .single();

  if (error) {
    // The DB trigger raises this when the plan's group cap is hit.
    if (error.message.includes("group_limit_reached")) {
      return {
        ok: false,
        error: "You've reached your plan's group limit. Upgrade to create more.",
        code: "limit_reached",
      };
    }
    return { ok: false, error: error.message };
  }
  return { ok: true, group: data };
}

/** Delete one or more of the broker's own groups (RLS blocks others'). */
export async function deleteGroups(ids: string[]): Promise<{ ok: true } | { ok: false; error: string }> {
  if (ids.length === 0) return { ok: true };
  const supabase = await createClient();
  const { error } = await supabase.from("groups").delete().in("id", ids);
  return error ? { ok: false, error: error.message } : { ok: true };
}
