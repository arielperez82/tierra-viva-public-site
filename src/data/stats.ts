export type Stat = {
  readonly value: string;
  readonly numericValue: number;
  readonly suffix: string;
  readonly prefix: string;
  readonly label: string;
};

export const STATS: readonly Stat[] = [
  {
    value: "$30M",
    numericValue: 30,
    suffix: "M",
    prefix: "$",
    label: "Target Fund",
  },
  {
    value: "150",
    numericValue: 150,
    suffix: "",
    prefix: "",
    label: "Luxury Homes",
  },
  {
    value: "250K sqm",
    numericValue: 250,
    suffix: "K sqm",
    prefix: "",
    label: "Development Site",
  },
  {
    value: "26%",
    numericValue: 26,
    suffix: "%",
    prefix: "",
    label: "Target IRR",
  },
];
