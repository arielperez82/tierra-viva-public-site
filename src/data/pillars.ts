export type Pillar = {
  readonly title: string;
  readonly description: string;
  readonly icon: "learning" | "homes" | "enterprise" | "stewardship";
};

export const PILLARS: readonly Pillar[] = [
  {
    title: "Learning as the Catalyst",
    description:
      "A high-quality school with an international curriculum anchors each community—attracting families, cultivating talent, and supporting long-term social mobility.",
    icon: "learning",
  },
  {
    title: "Homes that Regenerate Place",
    description:
      "Thoughtfully designed residences aligned with global sustainability standards, resilient infrastructure, and long-term stewardship of land and resources.",
    icon: "homes",
  },
  {
    title: "Enterprise that Multiplies Opportunity",
    description:
      "Mixed-use and commercial spaces that support entrepreneurship, local businesses, and returning diaspora professionals.",
    icon: "enterprise",
  },
  {
    title: "Stewardship for the Long Term",
    description:
      "Transparent governance, local hiring pathways, and regenerative land management practices that strengthen communities and protect value over time.",
    icon: "stewardship",
  },
];
