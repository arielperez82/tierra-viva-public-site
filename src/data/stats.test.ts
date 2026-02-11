import { describe, expect, it } from "vitest";
import { STATS } from "./stats";

describe("STATS", () => {
  it("has exactly 4 entries", () => {
    expect(STATS).toHaveLength(4);
  });

  it("each stat has required fields", () => {
    STATS.forEach((stat) => {
      expect(stat.value).toBeTruthy();
      expect(stat.label).toBeTruthy();
      expect(typeof stat.numericValue).toBe("number");
      expect(typeof stat.prefix).toBe("string");
      expect(typeof stat.suffix).toBe("string");
    });
  });

  it("reconstructed value matches value string", () => {
    STATS.forEach((stat) => {
      const reconstructed = `${stat.prefix}${stat.numericValue}${stat.suffix}`;
      expect(stat.value).toBe(reconstructed);
    });
  });
});
