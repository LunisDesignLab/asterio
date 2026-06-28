import { describe, expect, it } from "vitest";
import { WELCOME_VALUE_PROPS } from "@/lib/welcome-content";

describe("WELCOME_VALUE_PROPS", () => {
  it("lists the platform's core value props", () => {
    expect(WELCOME_VALUE_PROPS.length).toBeGreaterThanOrEqual(3);
  });

  it("gives every prop an icon, title, and description", () => {
    for (const prop of WELCOME_VALUE_PROPS) {
      expect(prop.icon).toBeTruthy();
      expect(prop.title.length).toBeGreaterThan(0);
      expect(prop.description.length).toBeGreaterThan(0);
    }
  });
});
