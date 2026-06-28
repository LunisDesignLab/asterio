export type ValuePropIcon = "listings" | "targeting" | "ai" | "pipeline";

export type ValueProp = {
  icon: ValuePropIcon;
  title: string;
  description: string;
};

/** The platform's core value for a broker — shown in the welcome modal instead
 * of any upsell. Plan-agnostic on purpose: the goal is to orient a brand-new
 * user, not to sell them an upgrade before they've used anything. */
export const WELCOME_VALUE_PROPS: ValueProp[] = [
  {
    icon: "listings",
    title: "Listings without the re-typing",
    description:
      "Pick up a developer's unit exactly as published — accurate, complete, ready to post in minutes.",
  },
  {
    icon: "targeting",
    title: "The right unit to the right group",
    description: "Send each listing only to the investors it actually fits. No noise, no spam.",
  },
  {
    icon: "ai",
    title: "Know who to call next",
    description:
      "AI surfaces your hottest leads and a daily plan, so you act on the warmest deals first.",
  },
  {
    icon: "pipeline",
    title: "Every deal in one pipeline",
    description: "Track each investor from first interest to Oqood, with reactions and notes in one place.",
  },
];
