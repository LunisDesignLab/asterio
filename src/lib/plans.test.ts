import { describe, it, expect } from "vitest";
import { annualMonthly, PLANS, COMPARISON } from "./plans";

describe("annualMonthly", () => {
  it("keeps free at 0", () => {
    expect(annualMonthly(0)).toBe(0);
  });

  it("applies the 2-months-free annual rate", () => {
    expect(annualMonthly(49)).toBe(41); // round(490/12)
    expect(annualMonthly(199)).toBe(166); // round(1990/12)
  });

  it("never costs more than the monthly rate", () => {
    for (const plan of PLANS) {
      expect(annualMonthly(plan.priceMonthly)).toBeLessThanOrEqual(plan.priceMonthly);
    }
  });
});

describe("plan data integrity", () => {
  it("has free, plus and pro in ascending price order", () => {
    expect(PLANS.map((p) => p.id)).toEqual(["free", "plus", "pro"]);
    expect(PLANS[0].priceMonthly).toBeLessThan(PLANS[1].priceMonthly);
    expect(PLANS[1].priceMonthly).toBeLessThan(PLANS[2].priceMonthly);
  });

  it("every comparison row covers all three plans", () => {
    for (const group of COMPARISON) {
      for (const row of group.rows) {
        expect(row).toHaveProperty("free");
        expect(row).toHaveProperty("plus");
        expect(row).toHaveProperty("pro");
      }
    }
  });
});
