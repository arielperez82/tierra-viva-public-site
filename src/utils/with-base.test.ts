import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { isInternalHref, withBase } from "./with-base";

describe("withBase", () => {
  beforeAll(() => {
    vi.stubEnv("BASE_URL", "/tierra-viva-public-site/");
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it("returns base + '/' when path is '/'", () => {
    expect(withBase("/")).toBe("/tierra-viva-public-site/");
  });

  it("prefixes path that starts with /", () => {
    expect(withBase("/about")).toBe("/tierra-viva-public-site/about");
    expect(withBase("/research/why-education-anchors-community-value")).toBe(
      "/tierra-viva-public-site/research/why-education-anchors-community-value",
    );
  });

  it("prefixes path that does not start with / by adding one", () => {
    expect(withBase("about")).toBe("/tierra-viva-public-site/about");
  });

  it("when BASE_URL is /, returns path unchanged (root deployment)", () => {
    vi.stubEnv("BASE_URL", "/");
    expect(withBase("/")).toBe("/");
    expect(withBase("/about")).toBe("/about");
    vi.unstubAllEnvs();
    vi.stubEnv("BASE_URL", "/tierra-viva-public-site/");
  });
});

describe("isInternalHref", () => {
  it("returns true for path-only hrefs", () => {
    expect(isInternalHref("/")).toBe(true);
    expect(isInternalHref("/about")).toBe(true);
    expect(isInternalHref("/research/slug")).toBe(true);
    expect(isInternalHref("  /about  ")).toBe(true);
  });

  it("returns false for http(s) and protocol-relative URLs", () => {
    expect(isInternalHref("https://example.com")).toBe(false);
    expect(isInternalHref("http://example.com")).toBe(false);
    expect(isInternalHref("//example.com")).toBe(false);
  });

  it("returns false for mailto and tel", () => {
    expect(isInternalHref("mailto:info@example.com")).toBe(false);
    expect(isInternalHref("tel:+1234567890")).toBe(false);
  });

  it("returns false for hash anchors", () => {
    expect(isInternalHref("#section")).toBe(false);
  });
});
