import { describe, it, expect } from "vitest";
import {
  NAV_LINKS,
  ROLES,
  FEATURES,
  PROBLEM_POINTS,
  SITE_FAQS,
  DEVELOPER_NAMES,
  STATS,
} from "./site-content";

describe("site-content", () => {
  it("exposes every role as an in-page anchor in the nav", () => {
    const anchorIds = NAV_LINKS.filter((l) => l.href.startsWith("#")).map((l) =>
      l.href.slice(1),
    );
    for (const role of ROLES) {
      expect(anchorIds).toContain(role.id);
    }
  });

  it("keeps the core nav anchors (how-it-works, pricing) present", () => {
    const hrefs = NAV_LINKS.map((l) => l.href);
    expect(hrefs).toContain("#how-it-works");
    expect(hrefs).toContain("#pricing");
  });

  it("has no empty content sections", () => {
    expect(ROLES.length).toBeGreaterThan(0);
    expect(FEATURES.length).toBeGreaterThan(0);
    expect(PROBLEM_POINTS.length).toBeGreaterThan(0);
    expect(SITE_FAQS.length).toBeGreaterThan(0);
    expect(DEVELOPER_NAMES.length).toBeGreaterThan(0);
    expect(STATS.length).toBe(3);
  });

  it("gives every role at least one bullet point", () => {
    for (const role of ROLES) {
      expect(role.points.length).toBeGreaterThan(0);
      expect(role.title.length).toBeGreaterThan(0);
    }
  });

  it("uses unique role ids", () => {
    const ids = ROLES.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
