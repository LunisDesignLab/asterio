import { describe, expect, it } from "vitest";
import { canCreateGroup, planLimits } from "@/lib/plan-limits";

describe("planLimits", () => {
  it("matches the published per-plan caps", () => {
    expect(planLimits("free")).toEqual({ maxGroups: 1, maxMembers: 50 });
    expect(planLimits("plus")).toEqual({ maxGroups: 5, maxMembers: 150 });
    expect(planLimits("pro")).toEqual({ maxGroups: 25, maxMembers: 1000 });
  });
});

describe("canCreateGroup", () => {
  it("blocks a Free broker at 1 group", () => {
    expect(canCreateGroup("free", 0)).toBe(true);
    expect(canCreateGroup("free", 1)).toBe(false);
  });

  it("lets a Pro broker keep going until 25", () => {
    expect(canCreateGroup("pro", 24)).toBe(true);
    expect(canCreateGroup("pro", 25)).toBe(false);
  });
});
