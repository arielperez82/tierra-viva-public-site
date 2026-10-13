export const SITE_TITLE = "Tierra Viva";
export const CONTACT_EMAIL = "info@tierravivainvest.com";

export const NAV_ITEMS: readonly { label: string; href: string }[] = [
  { label: "Our Approach", href: "/approach" },
  { label: "Team", href: "/team" },
];

export const contactHref = (subject: string): string =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
