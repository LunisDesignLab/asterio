import { describe, it, expect } from "vitest";
import { filterOptions } from "./filter-options";

const OPTIONS = ["English", "Arabic", "Hindi", "Urdu", "Russian", "French"];

describe("filterOptions", () => {
  it("returns all options alphabetically when query is empty", () => {
    expect(filterOptions(OPTIONS, "", [])).toEqual([
      "Arabic",
      "English",
      "French",
      "Hindi",
      "Russian",
      "Urdu",
    ]);
  });

  it("filters case-insensitively by substring", () => {
    expect(filterOptions(OPTIONS, "ar", [])).toEqual(["Arabic"]);
    expect(filterOptions(OPTIONS, "IN", [])).toEqual(["Hindi"]);
  });

  it("excludes already-selected values", () => {
    expect(filterOptions(OPTIONS, "", ["English", "Arabic"])).toEqual([
      "French",
      "Hindi",
      "Russian",
      "Urdu",
    ]);
  });

  it("returns empty when nothing matches", () => {
    expect(filterOptions(OPTIONS, "zzz", [])).toEqual([]);
  });

  it("trims the query", () => {
    expect(filterOptions(OPTIONS, "  french  ", [])).toEqual(["French"]);
  });
});
