import type { PlanId } from "@/lib/plans";

/**
 * Per-plan limits. These mirror the enforcement in the database (the
 * `enforce_group_limit` trigger in migration 0003) — the DB is the real
 * boundary; this config is for the UI (counts, disabled states, messaging).
 * Keep the two in sync.
 */
export type PlanLimits = {
  maxGroups: number;
  /** Max members across all of the broker's groups. */
  maxMembers: number;
};

const LIMITS: Record<PlanId, PlanLimits> = {
  free: { maxGroups: 1, maxMembers: 50 },
  plus: { maxGroups: 5, maxMembers: 150 },
  pro: { maxGroups: 25, maxMembers: 1000 },
};

export function planLimits(plan: PlanId): PlanLimits {
  return LIMITS[plan];
}

export function canCreateGroup(plan: PlanId, currentGroupCount: number): boolean {
  return currentGroupCount < LIMITS[plan].maxGroups;
}
