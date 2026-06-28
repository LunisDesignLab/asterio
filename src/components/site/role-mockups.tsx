import {
  File02,
  Lock01,
  CheckCircle,
  Stars02,
  Heart,
  Bookmark,
  MarkerPin01,
  Phone,
} from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";

/**
 * Product-style mock cards used as the role visuals on the marketing site.
 * Built entirely from the design system (FeaturedIcon, Badge, Avatar, tokens)
 * so they read as authentic product UI, not stock illustration. Static and
 * decorative — no live data.
 */

/** Shared frame: a soft, framed surface with a subtle brand glow. */
function MockFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-secondary bg-secondary p-xl shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08)] md:p-3xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(127,86,217,0.35), transparent)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ----------------------------------------------------- Developers ---- */

const FIELDS: { label: string; value: string; locked?: boolean }[] = [
  { label: "Starting price", value: "AED 1.8M", locked: true },
  { label: "Payment plan", value: "60 / 40", locked: true },
  { label: "RERA permit", value: "7129-…", locked: true },
  { label: "Handover", value: "Q4 2027" },
];

export function DeveloperMockup() {
  return (
    <MockFrame>
      <div className="flex flex-col gap-xl rounded-2xl border border-secondary bg-primary p-xl">
        <div className="flex items-center gap-md">
          <FeaturedIcon icon={File02} color="brand" theme="modern" size="md" />
          <div className="flex flex-1 flex-col">
            <span className="text-sm font-semibold text-primary">Marina Vista — Tower B</span>
            <span className="text-xs text-tertiary">Brochure.pdf · parsed</span>
          </div>
          <Badge type="pill-color" color="success" size="sm">
            38 / 40 fields
          </Badge>
        </div>

        {/* Progress */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-quaternary">
          <div className="h-full w-[95%] rounded-full bg-brand-solid" />
        </div>

        {/* Extracted fields */}
        <div className="flex flex-col gap-sm">
          {FIELDS.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-md rounded-lg border border-secondary bg-secondary px-md py-sm"
            >
              <CheckCircle className="size-4 shrink-0 text-fg-success-primary" />
              <span className="flex-1 text-xs text-tertiary">{f.label}</span>
              <span className="text-xs font-semibold text-primary">{f.value}</span>
              {f.locked && <Lock01 className="size-3.5 shrink-0 text-fg-quaternary" />}
            </div>
          ))}
        </div>
      </div>
    </MockFrame>
  );
}

/* -------------------------------------------------------- Brokers ---- */

const LEADS: { name: string; src: string; note: string; heat: "Very hot" | "Hot" }[] = [
  { name: "Sarah Jenkins", src: "/onboarding/avatar-2.png", note: "Viewed 3× in 24h", heat: "Very hot" },
  { name: "Emily Carter", src: "/onboarding/avatar-1.png", note: "Interested · 3 listings", heat: "Very hot" },
  { name: "Zahir Mays", src: "/onboarding/avatar-4.png", note: "Saved the brochure", heat: "Hot" },
];

export function BrokerMockup() {
  return (
    <MockFrame>
      <div className="flex flex-col gap-lg rounded-2xl border border-secondary bg-primary p-xl">
        <div className="flex items-center gap-md">
          <FeaturedIcon icon={Stars02} color="brand" theme="gradient" size="md" />
          <span className="flex-1 text-sm font-semibold text-primary">Hot leads today</span>
          <span className="text-xs font-medium text-brand-secondary">View all</span>
        </div>

        <div className="flex flex-col gap-sm">
          {LEADS.map((lead) => (
            <div
              key={lead.name}
              className="flex items-center gap-md rounded-xl border border-secondary bg-secondary px-md py-md"
            >
              <Avatar size="sm" src={lead.src} alt="" />
              <div className="flex flex-1 flex-col">
                <span className="text-xs font-semibold text-primary">{lead.name}</span>
                <span className="text-xs text-tertiary">{lead.note}</span>
              </div>
              <Badge type="pill-color" color={lead.heat === "Very hot" ? "error" : "warning"} size="sm">
                {lead.heat}
              </Badge>
              <span className="flex items-center gap-xxs text-xs font-semibold text-brand-secondary">
                <Phone className="size-3.5" />
                Call
              </span>
            </div>
          ))}
        </div>
      </div>
    </MockFrame>
  );
}

/* ------------------------------------------------------ Investors ---- */

export function InvestorMockup() {
  return (
    <MockFrame>
      <div className="flex flex-col gap-lg rounded-2xl border border-secondary bg-primary p-xl">
        {/* Post header */}
        <div className="flex items-center gap-md">
          <Avatar size="sm" src="/onboarding/avatar-3.png" alt="" />
          <div className="flex flex-1 flex-col">
            <span className="text-xs font-semibold text-primary">Omar — your broker</span>
            <span className="text-xs text-tertiary">Shared to · Downtown investors</span>
          </div>
          <Badge type="pill-color" color="brand" size="sm">
            Relevant
          </Badge>
        </div>

        {/* Listing card */}
        <div className="overflow-hidden rounded-xl border border-secondary">
          <div
            className="h-24 w-full"
            style={{ background: "linear-gradient(120deg, #6141b0 0%, #7f56d9 60%, #9e77ed 100%)" }}
          />
          <div className="flex items-center justify-between gap-md bg-secondary px-md py-md">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-primary">Binghatti Mercedes · 2BR</span>
              <span className="flex items-center gap-xxs text-xs text-tertiary">
                <MarkerPin01 className="size-3" />
                Business Bay
              </span>
            </div>
            <span className="text-sm font-semibold text-brand-secondary">AED 2.4M</span>
          </div>
        </div>

        {/* Reactions */}
        <div className="flex items-center gap-sm">
          <span className="inline-flex items-center gap-xxs rounded-full border border-secondary bg-secondary px-md py-xs text-xs font-medium text-secondary">
            <Heart className="size-3.5" /> Like
          </span>
          <span className="inline-flex items-center gap-xxs rounded-full border border-secondary bg-secondary px-md py-xs text-xs font-medium text-secondary">
            <Bookmark className="size-3.5" /> Save
          </span>
          <span className="inline-flex items-center gap-xxs rounded-full bg-brand-solid px-md py-xs text-xs font-semibold text-white">
            Interested
          </span>
        </div>
      </div>
    </MockFrame>
  );
}

/** Resolve a role id to its mock visual. */
export function RoleMockup({ role }: { role: string }) {
  if (role === "developers") return <DeveloperMockup />;
  if (role === "brokers") return <BrokerMockup />;
  return <InvestorMockup />;
}
