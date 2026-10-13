import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { NAV_ITEMS } from "./consts";

const PUBLIC_SOURCE_DIRS = [
  "src/pages",
  "src/components",
  "src/data",
  "src/layouts",
];

const PREMATURE_CLAIMS: readonly RegExp[] = [
  /\bIRR\b/,
  /Target Fund/i,
  /\$30M/,
  /Luxury Homes/i,
  /Altos de Gurabo/i,
  /zero-commute/i,
  /approximately 15 minutes/i,
  /world-class/i,
  /infrastructure and amenities first/i,
  /\bIB school\b/i,
  /scholarship seats/i,
  /investment case/i,
  /will be updated with our privacy policy/i,
  /fonts\.googleapis\.com/,
];

const listSourceFiles = (dir: string): readonly string[] =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? listSourceFiles(path) : [path];
  });

const publicSourceFiles = PUBLIC_SOURCE_DIRS.flatMap(listSourceFiles).filter(
  (path) => !path.endsWith(".test.ts")
);

describe("public site content", () => {
  it.each(PREMATURE_CLAIMS.map((claim) => [claim.source, claim]))(
    "makes no premature claim matching %s",
    (_label, claim) => {
      const offenders = publicSourceFiles.filter((path) =>
        claim.test(readFileSync(path, "utf8").replace(/\s+/g, " "))
      );
      expect(offenders).toEqual([]);
    }
  );

  it("navigates by approach, education and team", () => {
    expect(NAV_ITEMS.map((item) => item.label)).toEqual([
      "Our Approach",
      "Education & Impact",
      "Team",
    ]);
  });
});
