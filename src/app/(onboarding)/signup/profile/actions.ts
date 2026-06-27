"use server";

import { updateMyProfile } from "@/lib/repositories/profiles";

/** Persist the onboarding profile details for the signed-in user. Broker-only
 * fields (company, RERA, languages) land in a later slice with their own table. */
export async function saveProfile(input: {
  firstName: string;
  lastName: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const fullName = `${input.firstName.trim()} ${input.lastName.trim()}`.trim();
  return updateMyProfile({ full_name: fullName || null });
}
