import { describe, it, expect } from "vitest";
import { scorePassword } from "./password-strength";

describe("scorePassword", () => {
  it("returns 0 for an empty password", () => {
    expect(scorePassword("")).toEqual({ score: 0, label: "" });
  });

  it("caps sub-8 passwords at Weak even with variety", () => {
    expect(scorePassword("Ab1!").score).toBe(1);
  });

  it("scores an 8-char single-class password as Weak", () => {
    expect(scorePassword("abcdefgh").score).toBe(1);
  });

  it("scores two character classes as Fair", () => {
    expect(scorePassword("abcdefg1").score).toBe(2);
  });

  it("scores 10+ chars with 3 classes as Good", () => {
    expect(scorePassword("Abcdefgh12").score).toBe(3);
  });

  it("scores 12+ chars with 4 classes as Strong", () => {
    const result = scorePassword("Abcdefgh12!@");
    expect(result.score).toBe(4);
    expect(result.label).toBe("Strong");
  });

  it("never exceeds a score of 4", () => {
    expect(scorePassword("A".repeat(40) + "b1!").score).toBeLessThanOrEqual(4);
  });
});
