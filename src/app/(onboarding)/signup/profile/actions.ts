"use server";

import { getMyProfile, updateMyProfile } from "@/lib/repositories/profiles";
import { upsertMyBrokerProfile } from "@/lib/repositories/broker-profiles";

/** Persist the onboarding profile for the signed-in user: shared fields on the
 * profile, broker-specific fields only when the account is a broker. */
export async function saveProfile(input: {
  firstName: string;
  lastName: string;
  languages: string[];
  company?: string;
  rera?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const fullName = `${input.firstName.trim()} ${input.lastName.trim()}`.trim();

  const profileResult = await updateMyProfile({
    full_name: fullName || null,
    preferred_languages: input.languages,
  });
  if (!profileResult.ok) return profileResult;

  const profile = await getMyProfile();
  if (profile?.role === "broker") {
    const brokerResult = await upsertMyBrokerProfile({
      company: input.company?.trim() || null,
      rera_number: input.rera?.trim() || null,
    });
    if (!brokerResult.ok) return brokerResult;
  }

  return { ok: true };
}
