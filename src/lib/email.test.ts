import { describe, it, expect } from "vitest";
import { isValidEmail } from "./email";

describe("isValidEmail", () => {
  const valid = [
    "name@company.com",
    "a@b.co",
    "first.last@sub.domain.com",
    "user+tag@gmail.com",
    "user_name@example.org",
    "broker@asterio.ae",
    "x@y.io",
    "name@company.co.uk",
    "  trimmed@example.com  ",
  ];

  const invalid = [
    "asdasfas@gmai;.com", // the reported bug: ";" in the domain
    "plainaddress", // no @
    "no-at-sign.com",
    "@no-local.com", // missing local part
    "noatdomain@", // missing domain
    "user@localhost", // no dot / TLD
    "user@domain", // no TLD
    "user@domain.c", // 1-letter TLD
    "spaces in@email.com", // space in local part
    "user@dom ain.com", // space in domain
    "double@@at.com",
    "trailingdot@domain.", // domain ends with a dot
    "user@.com", // empty label before TLD
    "user@-domain.com", // label starts with hyphen
    "",
    "   ",
  ];

  it.each(valid)("accepts %s", (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  it.each(invalid)("rejects %s", (email) => {
    expect(isValidEmail(email)).toBe(false);
  });
});
