export type Pathway = {
  readonly audience: string;
  readonly who: string;
  readonly invitation: string;
  readonly subject: string;
  readonly cta: string;
};

export const PATHWAYS: readonly Pathway[] = [
  {
    audience: "Capital partners",
    who: "Family offices, institutional investors and lenders",
    invitation:
      "Learn about the platform, our first community and how we work with capital partners.",
    subject: "Capital partnership",
    cta: "Introduce your firm",
  },
  {
    audience: "Development & operating partners",
    who: "Co-developers, builders and school operators",
    invitation: "Shape delivery, cost certainty and operating performance.",
    subject: "Development or operating partnership",
    cta: "Explore a collaboration",
  },
  {
    audience: "Education & community partners",
    who: "Educators, employers, researchers and community organizations",
    invitation:
      "Help build education access, local enterprise and community learning.",
    subject: "Education or community partnership",
    cta: "Get involved",
  },
];
