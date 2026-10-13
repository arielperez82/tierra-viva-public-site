import { describe, expect, it } from "vitest";
import { PATHWAYS } from "./pathways";

describe("contact pathways", () => {
  it("gives each audience its own call to action", () => {
    const labels = PATHWAYS.map((pathway) => pathway.cta);
    expect(new Set(labels).size).toBe(PATHWAYS.length);
  });

  it("keeps each call to action short enough for its card", () => {
    PATHWAYS.forEach((pathway) => {
      expect(pathway.cta.length).toBeLessThanOrEqual(24);
    });
  });
});
