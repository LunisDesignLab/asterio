export type PlanId = "free" | "plus" | "pro";

export interface Plan {
  id: PlanId;
  name: string;
  priceMonthly: number; // AED
  tagline: string;
  highlights: string[];
  cta: string;
  badge?: string;
  featured?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    tagline: "Explore Asterio and run a small investor portfolio.",
    highlights: [
      "1 investor group",
      "Up to 50 members",
      "Developer & manual posts",
      "Basic deal pipeline",
      "In-app notifications",
    ],
    cta: "Start for free",
  },
  {
    id: "plus",
    name: "Plus",
    priceMonthly: 49,
    tagline:
      "For independent brokers building stronger investor relationships and growing their network.",
    highlights: [
      "Up to 5 groups · 150 members",
      "Discover Investors · 5 requests / mo",
      "AI Today's Plan & Hot Leads",
      "Post & group analytics",
      "90 days analytics history",
    ],
    cta: "Choose Plus",
    badge: "Recommended",
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 199,
    tagline:
      "For brokers who want to move faster, stay ahead of every deal, and scale investor acquisition.",
    highlights: [
      "Up to 25 groups · 1,000 members",
      "Full Discover · 25 requests / mo",
      "Advanced AI insights & alerts",
      "SPA tracker + DocuSign sync",
      "PDF parsing · CSV exports · 12 mo history",
    ],
    cta: "Choose Pro",
    badge: "Most popular",
    featured: true,
  },
];

// 2 months free on annual — placeholder, confirm final discount with Adrian.
export const ANNUAL_MONTHS_CHARGED = 10;

export function annualMonthly(priceMonthly: number): number {
  return Math.round((priceMonthly * ANNUAL_MONTHS_CHARGED) / 12);
}

export type Cell = string | boolean;

export interface ComparisonRow {
  feature: string;
  free: Cell;
  plus: Cell;
  pro: Cell;
}

export interface ComparisonGroup {
  title: string;
  rows: ComparisonRow[];
}

export const COMPARISON: ComparisonGroup[] = [
  {
    title: "Groups & members",
    rows: [
      { feature: "Investor groups", free: "1", plus: "5", pro: "25" },
      { feature: "Members in total", free: "50", plus: "150", pro: "1,000" },
      { feature: "Member management (invite, assign, notes, labels)", free: true, plus: true, pro: true },
    ],
  },
  {
    title: "Posts & distribution",
    rows: [
      { feature: "Developer posts", free: true, plus: true, pro: true },
      { feature: "Manual text, image & video posts", free: true, plus: true, pro: true },
      { feature: "Publish to one or multiple groups", free: true, plus: true, pro: true },
      { feature: "Reuse developer content (within edit permissions)", free: true, plus: true, pro: true },
      { feature: "Availability change alerts", free: false, plus: false, pro: true },
    ],
  },
  {
    title: "Investors & discovery",
    rows: [
      { feature: "Discover Investors", free: false, plus: "Access", pro: "Full" },
      { feature: "Connection requests / month", free: false, plus: "5", pro: "25" },
      { feature: "Investor profile preview", free: false, plus: "Basic", pro: "Full + fit signals" },
      { feature: "Advanced filters & shortlists", free: false, plus: false, pro: true },
      { feature: "Direct messaging to connected investors", free: false, plus: true, pro: true },
    ],
  },
  {
    title: "AI assistance",
    rows: [
      { feature: "AI Today's Plan", free: false, plus: "Top 3", pro: "Expanded" },
      { feature: "AI Hot Leads", free: false, plus: "Top 5", pro: "Top 20" },
      { feature: "Active investors right now", free: true, plus: true, pro: true },
      { feature: "Post distribution fit", free: false, plus: "10 / mo", pro: "30 / mo" },
      { feature: "Group & member AI insights", free: false, plus: "Basic", pro: "Advanced" },
    ],
  },
  {
    title: "Deals, SPA & commission",
    rows: [
      { feature: "Deal pipeline (EOI → Oqood)", free: "Basic", plus: "Basic", pro: "Full" },
      { feature: "SPA tracker", free: false, plus: "Manual", pro: "DocuSign sync" },
      { feature: "Deal risk alerts", free: false, plus: false, pro: true },
      { feature: "Commission tracking", free: false, plus: "Basic", pro: "Advanced" },
    ],
  },
  {
    title: "Analytics, exports & support",
    rows: [
      { feature: "Post analytics", free: false, plus: true, pro: true },
      { feature: "Analytics history", free: "—", plus: "90 days", pro: "12 months" },
      { feature: "Broker PDF parsing", free: false, plus: false, pro: "15 / mo · 50MB" },
      { feature: "CSV exports", free: false, plus: false, pro: true },
      { feature: "Support", free: "Standard", plus: "Standard", pro: "Priority" },
    ],
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "Can I change my plan later?",
    a: "Yes — upgrade or downgrade anytime from your settings. Changes take effect on your next billing cycle.",
  },
  {
    q: "Is there a free trial?",
    a: "There's no time-limited trial. The Free plan lets you explore Asterio within its limits for as long as you like, and you can upgrade whenever you're ready.",
  },
  {
    q: "What's the difference between Plus and Pro?",
    a: "Plus is built for independent brokers organizing a portfolio. Pro adds higher limits, full Discover Investors, advanced AI insights, automatic SPA tracking, PDF parsing and CSV exports for brokers operating at volume.",
  },
  {
    q: "How does annual billing work?",
    a: "Annual plans are billed once a year at a discounted monthly rate. You can switch between monthly and annual at any time.",
  },
  {
    q: "Do investors pay to receive my posts?",
    a: "No. Investors you invite join for free and only see what you share with their groups. Your subscription covers the broker tools.",
  },
];

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Omar Haddad",
    role: "Independent broker, Dubai Marina",
    quote:
      "Asterio replaced three WhatsApp groups and a messy spreadsheet. I finally know which investors are actually warm.",
    avatar: "/onboarding/avatar-1.png",
  },
  {
    name: "Priya Nair",
    role: "Agency owner, Business Bay",
    quote:
      "The developer posts come in clean and consistent. My team sends the right unit to the right group in minutes.",
    avatar: "/onboarding/avatar-3.png",
  },
  {
    name: "Sergei Volkov",
    role: "Senior broker, Downtown",
    quote:
      "Discover Investors and the daily AI plan paid for Pro in the first week. The SPA tracking is a huge time saver.",
    avatar: "/onboarding/avatar-4.png",
  },
];
