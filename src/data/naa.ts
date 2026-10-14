export type NaaDownload = {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly details: string;
  readonly cta: string;
};

export type NaaNextStep = {
  readonly title: string;
  readonly when: string;
  readonly subject: string;
};

export const NAA_PATH = "/naa";

export const NAA_DOWNLOADS: readonly NaaDownload[] = [
  {
    title: "Tierra Viva at a glance",
    description:
      "Our two-sided overview: the model, the Santiago community and the team behind it.",
    href: "/downloads/tierra-viva-naa-2026-overview.pdf",
    details: "PDF · 2 pages · 1.7 MB",
    cta: "Download the overview",
  },
  {
    title: "Our NAA presentation",
    description:
      "The deck we shared in Miami, with the platform, Santiago, how the model creates value and where we can work together.",
    href: "/downloads/tierra-viva-naa-2026-presentation.pdf",
    details: "PDF · 10 slides · 1.9 MB",
    cta: "Download the presentation",
  },
];

export const NAA_NEXT_STEPS: readonly NaaNextStep[] = [
  {
    title: "Visit Santiago with us",
    when: "October 22–25",
    subject: "NAA follow-up: Santiago site visit",
  },
  {
    title: "Meet us in New York",
    when: "October 26, 6 pm",
    subject: "NAA follow-up: New York, October 26",
  },
  {
    title: "Join a virtual briefing",
    when: "November 11 or 13",
    subject: "NAA follow-up: Virtual briefing",
  },
];

const UNLISTED_PATHS: readonly string[] = [NAA_PATH];

export const isIndexablePage = (page: string): boolean => {
  const path = new URL(page).pathname.replace(/\/+$/, "");
  return !UNLISTED_PATHS.includes(path);
};
