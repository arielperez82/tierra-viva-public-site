/**
 * Prefix an internal path with the configured base URL so links work on GitHub Pages
 * (and any deployment that uses a base path). Use for all same-origin links.
 */
export function withBase(path: string): string {
  const b = import.meta.env.BASE_URL ?? "/";
  const base = b.endsWith("/") ? b.slice(0, -1) : b;
  if (path === "/") return `${base}/`;
  const pathSegment = path.startsWith("/") ? path : "/" + path;
  return base + pathSegment;
}

/**
 * True when href is an internal path (same-origin) that should get the base path prefix.
 * False for external URLs, mailto:, tel:, or hash anchors.
 */
export function isInternalHref(href: string): boolean {
  const trimmed = href.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("//")) return false;
  if (trimmed.startsWith("mailto:") || trimmed.startsWith("tel:") || trimmed.startsWith("#")) return false;
  return true;
}
