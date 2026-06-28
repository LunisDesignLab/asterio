// Fixed taxonomies for groups (brokers pick from these — no custom values in V1).

export const UNIT_TYPES = [
  "Apartments",
  "Villas",
  "Townhouses",
  "Penthouses",
  "Offices",
  "Retail",
  "Warehouses",
  "Whole Buildings",
] as const;

export const GROUP_CATEGORIES = [
  "Investors",
  "Potentials",
  "Only viewers",
  "VIP buyers",
  "New investors",
] as const;

export type UnitType = (typeof UNIT_TYPES)[number];
export type GroupCategory = (typeof GROUP_CATEGORIES)[number];
