export type Pillar = {
  readonly title: string;
  readonly description: string;
  readonly icon: "learning" | "homes" | "enterprise" | "stewardship";
};

export const PILLARS: readonly Pillar[] = [
  {
    title: "Learning",
    description:
      "An internationally oriented school planned alongside the community, with a focus on educational quality, teacher development and wider access.",
    icon: "learning",
  },
  {
    title: "Homes",
    description:
      "Well-designed residences with shared spaces, walkable green areas and everyday services that support family life.",
    icon: "homes",
  },
  {
    title: "Enterprise",
    description:
      "Neighborhood businesses, health services and workspace that create room for local employment and entrepreneurship.",
    icon: "enterprise",
  },
  {
    title: "Stewardship",
    description:
      "Responsible land use, resilient shared infrastructure and clear arrangements for caring for common places.",
    icon: "stewardship",
  },
];
