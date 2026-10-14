import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { NAA_DOWNLOADS, isIndexablePage } from "./naa";

describe("NAA follow-up downloads", () => {
  it("offers the overview and the presentation", () => {
    expect(NAA_DOWNLOADS.map((download) => download.cta)).toEqual([
      "Download the overview",
      "Download the presentation",
    ]);
  });

  it("serves every file from public/downloads", () => {
    NAA_DOWNLOADS.forEach((download) => {
      expect(existsSync(`public${download.href}`)).toBe(true);
    });
  });

  it("uses clean file names without draft markers", () => {
    NAA_DOWNLOADS.forEach((download) => {
      expect(download.href).toMatch(
        /^\/downloads\/tierra-viva-[a-z0-9-]+\.pdf$/
      );
      expect(download.href).not.toMatch(/v\d|print|draft/);
    });
  });
});

describe("isIndexablePage", () => {
  it("keeps public pages in the sitemap", () => {
    expect(isIndexablePage("https://tierravivainvestments.com/approach/")).toBe(
      true
    );
  });

  it("leaves the unlisted NAA page out of the sitemap", () => {
    expect(isIndexablePage("https://tierravivainvestments.com/naa/")).toBe(
      false
    );
    expect(isIndexablePage("https://tierravivainvestments.com/naa")).toBe(
      false
    );
  });
});
