/**
 * Marketing site copy & structure, centralised so wording can be edited in one
 * place without touching JSX. Pure data — no React, no side effects. The pricing
 * shown on the marketing site is derived from the canonical PLANS in `plans.ts`,
 * never duplicated, so the landing page can never drift from the product.
 */

export interface NavLink {
  label: string;
  href: string;
}

/** Anchor links in the sticky header. Hrefs map 1:1 to section ids on the page. */
export const NAV_LINKS: NavLink[] = [
  { label: "How it works", href: "#how-it-works" },
  { label: "For developers", href: "#developers" },
  { label: "For brokers", href: "#brokers" },
  { label: "For investors", href: "#investors" },
  { label: "Pricing", href: "#pricing" },
];

/** Developer brand names shown in the trust strip. Aspirational target market,
 *  framed as "built for" — not a claim of partnership or endorsement. */
export const DEVELOPER_NAMES = [
  "Emaar",
  "Binghatti",
  "Ellington",
  "Sobha",
  "DAMAC",
  "Nakheel",
];

export interface ProblemPoint {
  before: string;
  after: string;
}

/** The chaos Asterio kills, paired with what replaces it. */
export const PROBLEM_POINTS: ProblemPoint[] = [
  {
    before: "Developers scatter PDF brochures across WhatsApp, Telegram and email.",
    after: "Developers publish one canonical listing, parsed straight from their brochure.",
  },
  {
    before: "Brokers re-type listings by hand and lose half the detail.",
    after: "Brokers reuse the developer's listing as-is — accurate, complete, consistent.",
  },
  {
    before: "Investors get spammed with mixed units they can't filter.",
    after: "Investors receive only what's relevant, from brokers they're connected to.",
  },
];

export interface RoleSpec {
  id: string;
  /** lucide icon name, resolved in the component */
  icon: "Building2" | "Users" | "TrendingUp";
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
}

/** The three sides of the network — the heart of the story. */
export const ROLES: RoleSpec[] = [
  {
    id: "developers",
    icon: "Building2",
    eyebrow: "For developers",
    title: "Publish once. Stay the source of truth.",
    description:
      "Upload your brochure and Asterio extracts the listing — units, payment plans, permits — into a structured, canonical record. Every broker reuses it, so your data never gets corrupted on the way to an investor.",
    points: [
      "AI extracts ~40 structured fields from your PDFs",
      "Field-level locks keep price, payment plan and RERA data intact",
      "Daily availability updates by CSV — no manual re-entry",
      "Per-listing analytics: pickups, views, conversions",
    ],
  },
  {
    id: "brokers",
    icon: "Users",
    eyebrow: "For brokers",
    title: "Route the right unit to the right investor.",
    description:
      "Pick up developer listings, build investor groups, and post only what's relevant to each one. No more spraying every unit at every contact. AI tells you who's warm and what to do next.",
    points: [
      "Reuse clean developer listings instead of re-typing",
      "Target specific groups — never spam the whole list",
      "Discover Investors and grow your network (Plus & Pro)",
      "A daily AI plan that surfaces your hottest leads",
    ],
  },
  {
    id: "investors",
    icon: "TrendingUp",
    eyebrow: "For investors",
    title: "Only what's relevant. Nothing you didn't ask for.",
    description:
      "See off-plan opportunities that actually match you, in one private place — sent by brokers you're connected to. React, save, or ask a question without your inbox turning into a billboard.",
    points: [
      "A curated feed, not a flood of irrelevant units",
      "React privately — Like, Save, or flag Interested",
      "Async Q&A with your broker on any post",
      "Your visibility is yours to control",
    ],
  },
];

export interface Feature {
  /** lucide icon name */
  icon: "FileCheck2" | "Send" | "Bot" | "ShieldCheck";
  title: string;
  description: string;
}

/** Product pillars — what makes Asterio different. */
export const FEATURES: Feature[] = [
  {
    icon: "FileCheck2",
    title: "PDF → listing, in minutes",
    description:
      "Drop in a brochure — even a scanned, image-only one. Claude vision reads it and fills the listing field by field, with confidence signals. You confirm; nothing is silently trusted.",
  },
  {
    icon: "Send",
    title: "Targeted distribution",
    description:
      "Post a listing into the exact groups it fits — one or many. Members of every other group never see it. Relevance is the default, not an afterthought.",
  },
  {
    icon: "Bot",
    title: "AI that earns its place",
    description:
      "To-do lists, lead scoring and benchmarks are computed locally from your data — instant and free. AI is reserved for reading PDFs and turning cold data into plain language.",
  },
  {
    icon: "ShieldCheck",
    title: "Closed-circuit by design",
    description:
      "Nothing is public. Every view sits behind an account, and tenant isolation is enforced in the database with row-level security — not just hidden in the UI. Brokers never see other brokers.",
  },
];

export interface SiteFaq {
  q: string;
  a: string;
}

/** Marketing-facing FAQ (broader than the in-product pricing FAQ). */
export const SITE_FAQS: SiteFaq[] = [
  {
    q: "Who is Asterio for?",
    a: "Three roles share one platform: developers who publish off-plan listings, brokers who distribute them to the right investors, and investors who receive only what's relevant. It's built for the UAE off-plan market, Dubai first.",
  },
  {
    q: "Is anything public?",
    a: "No. Asterio is a closed circuit — there is no guest access. Every listing and post sits behind an authenticated account, and the database enforces who can see what with row-level security.",
  },
  {
    q: "How do developers join?",
    a: "Developers are vetted directly by our team and provisioned via a one-time invite — there's no public developer signup. This keeps listing authorship trustworthy and prevents impersonation.",
  },
  {
    q: "How do brokers and investors sign up?",
    a: "Brokers self-sign up on Free, Plus or Pro. Investors join Pro on their own, or are invited for free by a broker into specific groups.",
  },
  {
    q: "How does the AI handle my brochures?",
    a: "Asterio uses document-understanding (vision) to extract structured fields from your PDF — including scanned, image-only files. It suggests; a human confirms every field before anything is published.",
  },
  {
    q: "Where is my data stored?",
    a: "On EU infrastructure (Frankfurt), with PDPL consent and a cross-border transfer notice captured at onboarding. We track RERA/Trakheesi advertising rules and revisit data residency as we scale.",
  },
];

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

/** Hero proof points — framed honestly for a pre-launch product (capability,
 *  not inflated traction numbers). Animated count-up on scroll. */
export const STATS: Stat[] = [
  { value: 40, prefix: "~", label: "fields auto-extracted per listing" },
  { value: 3, label: "roles, one source of truth" },
  { value: 0, label: "listings visible across tenants" },
];
