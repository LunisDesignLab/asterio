"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  SearchLg,
  Bell01,
  Plus,
  LayoutAlt01,
  Home02,
  Users01,
  MessageChatCircle,
  BarChartSquare02,
  Lock01,
  Stars02,
  Zap,
  CheckCircle,
  Building07,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";

// Register once, client-side only.
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/**
 * Cinematic "the dashboard populates as you scroll" showcase. The dashboard is
 * rebuilt in code (crisp at any size). On scroll the section pins and a single
 * scrubbed GSAP timeline flies each widget up from below into its slot, fading
 * out the empty-state underneath. Plus / Pro widgets arrive blurred + locked,
 * then unlock — making tier-gating tangible.
 */

type Tier = "free" | "plus" | "pro";

const TIER_LABEL: Record<Tier, string> = { free: "Free", plus: "Plus", pro: "Pro" };

function reduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* ------------------------------------------------------- Small pieces ---- */

function TierTag({ tier }: { tier: Tier }) {
  const styles: Record<Tier, string> = {
    free: "bg-utility-green-50 text-utility-green-700 ring-utility-green-200",
    plus: "bg-utility-brand-50 text-utility-brand-700 ring-utility-brand-200",
    pro: "bg-[#1f1147] text-white ring-transparent",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-[2px] text-[10px] font-semibold ring-1 ring-inset ${styles[tier]}`}
    >
      {TIER_LABEL[tier]}
    </span>
  );
}

/** Dashed empty-state shown in a slot before its widget arrives. */
function EmptySlot({ tier, label }: { tier: Tier; label: string }) {
  const locked = tier !== "free";
  return (
    <div className="dp-empty absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-primary/70 bg-secondary/60">
      <div className="flex size-8 items-center justify-center rounded-full bg-primary text-fg-quaternary shadow-xs">
        {locked ? <Lock01 className="size-4" /> : <Plus className="size-4" />}
      </div>
      <span className="text-[11px] font-medium text-quaternary">{label}</span>
      <TierTag tier={tier} />
    </div>
  );
}

/** Lock overlay shown over a Plus/Pro widget while it's "locked". */
function LockOverlay({ tier }: { tier: Tier }) {
  return (
    <div className="dp-lock pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-2xl bg-primary/55 backdrop-blur-[3px]">
      <div className="flex size-9 items-center justify-center rounded-full bg-brand-solid text-white shadow-md">
        <Lock01 className="size-4" />
      </div>
      <span className="text-[11px] font-semibold text-secondary">
        Unlock with {TIER_LABEL[tier]}
      </span>
    </div>
  );
}

/** A populated widget wrapper: positioned to its slot, layered above empties. */
function Widget({
  id,
  tier,
  style,
  children,
}: {
  id: string;
  tier: Tier;
  style: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      data-widget={id}
      data-tier={tier}
      className="dp-widget absolute z-10 flex flex-col overflow-hidden rounded-2xl border border-secondary bg-primary shadow-[0px_12px_28px_-8px_rgba(16,24,40,0.22)]"
      style={style}
    >
      {/* header */}
      <div className="flex items-center justify-between gap-2 border-b border-secondary px-3 py-2">
        <span className="truncate text-[11px] font-semibold text-primary">{idTitle(id)}</span>
        <TierTag tier={tier} />
      </div>
      {/* content (blurred while locked for plus/pro) */}
      <div className={`dp-content flex-1 p-2.5 ${tier !== "free" ? "dp-lockable" : ""}`}>
        {children}
      </div>
      {tier !== "free" && <LockOverlay tier={tier} />}
    </div>
  );
}

function idTitle(id: string) {
  return (
    {
      discover: "Discover new investors",
      hot: "Hot leads",
      plan: "AI daily action plan",
      groups: "My groups",
    } as Record<string, string>
  )[id];
}

/* ----------------------------------------------------- Widget contents --- */

function Row({
  src,
  name,
  meta,
  right,
}: {
  src: string;
  name: string;
  meta: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-secondary bg-secondary px-2 py-1.5">
      <Avatar size="xs" src={src} alt="" />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[10px] font-semibold text-primary">{name}</span>
        <span className="truncate text-[9px] text-tertiary">{meta}</span>
      </div>
      {right}
    </div>
  );
}

function DiscoverContent() {
  return (
    <div className="flex flex-col gap-1.5">
      <Row
        src="/onboarding/avatar-2.png"
        name="Sarah Jenkins"
        meta="95% match · Active now"
        right={<span className="text-[9px] font-semibold text-brand-secondary">Send request</span>}
      />
      <Row
        src="/onboarding/avatar-5.png"
        name="Orlando Diggs"
        meta="91% match · 6 saves this week"
        right={<span className="text-[9px] font-semibold text-brand-secondary">Send request</span>}
      />
    </div>
  );
}

function HotContent() {
  const heat = (label: string, color: string) => (
    <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-[1px] text-[8px] font-semibold ${color}`}>
      <Zap className="size-2.5" />
      {label}
    </span>
  );
  return (
    <div className="flex flex-col gap-1.5">
      <Row
        src="/onboarding/avatar-1.png"
        name="Emily Carter"
        meta="Interested · 3 listings"
        right={heat("Very hot", "bg-utility-red-50 text-utility-red-700")}
      />
      <Row
        src="/onboarding/avatar-4.png"
        name="Zahir Mays"
        meta="Viewed 5× in 24h"
        right={heat("Hot", "bg-utility-yellow-50 text-utility-yellow-700")}
      />
    </div>
  );
}

function PlanContent() {
  const task = (label: string, prio: string, color: string) => (
    <div className="flex items-center gap-2 rounded-lg border border-secondary bg-secondary px-2 py-1.5">
      <CheckCircle className="size-3.5 text-fg-quaternary" />
      <span className="flex-1 truncate text-[10px] text-secondary">{label}</span>
      <span className={`rounded-full px-1.5 py-[1px] text-[8px] font-semibold ${color}`}>{prio}</span>
    </div>
  );
  return (
    <div className="flex flex-col gap-1.5">
      {task("Call Andrei Popescu — viewed Dubai Hills 3×", "High", "bg-utility-red-50 text-utility-red-700")}
      {task("Promote Nakheel project to Waterfront group", "Medium", "bg-utility-yellow-50 text-utility-yellow-700")}
    </div>
  );
}

function GroupsContent() {
  const group = (name: string, members: string) => (
    <div className="flex items-center gap-2 rounded-lg border border-secondary bg-secondary px-2 py-1.5">
      <div className="flex size-6 items-center justify-center rounded-md bg-brand-50 text-brand-600">
        <Users01 className="size-3.5" />
      </div>
      <span className="flex-1 truncate text-[10px] font-semibold text-primary">{name}</span>
      <span className="text-[9px] text-tertiary">{members}</span>
    </div>
  );
  return (
    <div className="flex flex-col gap-1.5">
      {group("Downtown investors", "48")}
      {group("Marina · high budget", "21")}
    </div>
  );
}

/* ------------------------------------------------------- Slot geometry -- */

interface Slot {
  id: string;
  tier: Tier;
  emptyLabel: string;
  style: React.CSSProperties;
  content: React.ReactNode;
}

// Positions are % of the dashboard content canvas (which sits right of the rail).
const SLOTS: Slot[] = [
  {
    id: "discover",
    tier: "plus",
    emptyLabel: "Investor discovery",
    style: { left: "2%", top: "2%", width: "56%", height: "52%" },
    content: <DiscoverContent />,
  },
  {
    id: "hot",
    tier: "pro",
    emptyLabel: "AI hot leads",
    style: { left: "60%", top: "2%", width: "38%", height: "52%" },
    content: <HotContent />,
  },
  {
    id: "plan",
    tier: "plus",
    emptyLabel: "AI daily plan",
    style: { left: "2%", top: "56%", width: "56%", height: "42%" },
    content: <PlanContent />,
  },
  {
    id: "groups",
    tier: "free",
    emptyLabel: "Your groups",
    style: { left: "60%", top: "56%", width: "38%", height: "42%" },
    content: <GroupsContent />,
  },
];

/* ----------------------------------------------------------- Section ----- */

export function DashboardPopulate() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root_ = root.current;
      if (!root_) return;
      const q = (s: string) => Array.from(root_.querySelectorAll<HTMLElement>(s));
      const widget = (id: string) => root_.querySelector<HTMLElement>(`[data-widget="${id}"]`);
      const emptyFor = (id: string) => root_.querySelector<HTMLElement>(`[data-empty="${id}"]`);

      // Resting (fully-populated) state used for reduced-motion + mobile.
      const settle = () => {
        gsap.set(q(".dp-widget"), { autoAlpha: 1, y: 0 });
        gsap.set(q(".dp-content"), { filter: "blur(0px)" });
        gsap.set(q(".dp-lock"), { autoAlpha: 0 });
        gsap.set(q(".dp-empty"), { autoAlpha: 0 });
      };

      if (reduced()) {
        settle();
        return;
      }

      const mm = gsap.matchMedia(root);

      // Desktop: pinned, scrubbed population.
      mm.add("(min-width: 1024px)", () => {
        // Initial state
        gsap.set(q(".dp-widget"), { autoAlpha: 0, y: 230 });
        gsap.set(q(".dp-lockable"), { filter: "blur(7px)" });
        gsap.set(q(".dp-lock"), { autoAlpha: 1 });
        gsap.set(q(".dp-empty"), { autoAlpha: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: ".dp-stage",
            start: "top top",
            end: "+=2600",
            pin: ".dp-stage",
            scrub: 1,
          },
        });

        const enter = (id: string, at: number) => {
          const w = widget(id);
          const e = emptyFor(id);
          if (e) tl.to(e, { autoAlpha: 0, duration: 0.4 }, at);
          if (w) tl.to(w, { autoAlpha: 1, y: 0, duration: 1.1 }, at);
        };
        const unlock = (id: string, at: number) => {
          const w = widget(id);
          if (!w) return;
          const lock = w.querySelector(".dp-lock");
          const content = w.querySelector(".dp-lockable");
          if (lock) tl.to(lock, { autoAlpha: 0, duration: 0.5 }, at);
          if (content) tl.to(content, { filter: "blur(0px)", duration: 0.6 }, at);
        };

        // Wave 1 — Free shell fills first
        enter("groups", 0.2);
        // Wave 2 — Plus widgets arrive locked, then unlock
        enter("discover", 1.0);
        enter("plan", 1.5);
        unlock("discover", 2.2);
        unlock("plan", 2.5);
        // Wave 3 — Pro widget last, unlocks at the end
        enter("hot", 2.9);
        unlock("hot", 3.9);
        tl.to({}, { duration: 0.4 }); // tail so the finished state holds
      });

      // Mobile / tablet: no pin — just present the populated dashboard.
      mm.add("(max-width: 1023px)", () => {
        settle();
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-secondary">
      <div className="mx-auto flex max-w-container flex-col gap-6xl px-4 pt-8xl pb-7xl md:px-8">
        <div className="flex max-w-[720px] flex-col gap-xl">
          <span className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-secondary">
            Your dashboard, live
          </span>
          <h2 className="text-display-sm font-semibold tracking-[-0.02em] text-primary lg:text-display-md">
            Scroll, and watch it come to life
          </h2>
          <p className="text-lg text-tertiary">
            Start with the essentials on Free. As you upgrade, the AI widgets light up — investor
            discovery and your daily plan on Plus, hot-lead intelligence on Pro.
          </p>
          <div className="flex flex-wrap items-center gap-md">
            <LegendDot tier="free" text="Included on Free" />
            <LegendDot tier="plus" text="Unlocks with Plus" />
            <LegendDot tier="pro" text="Unlocks with Pro" />
          </div>
        </div>

        {/* Pinned stage */}
        <div className="dp-stage flex items-center justify-center py-6">
          <DashboardCanvas />
        </div>
      </div>
    </section>
  );
}

function LegendDot({ tier, text }: { tier: Tier; text: string }) {
  const dot: Record<Tier, string> = {
    free: "bg-utility-green-500",
    plus: "bg-brand-solid",
    pro: "bg-[#1f1147]",
  };
  return (
    <span className="inline-flex items-center gap-xs text-sm text-tertiary">
      <span className={`size-2.5 rounded-full ${dot[tier]}`} />
      {text}
    </span>
  );
}

/* --------------------------------------------------- Dashboard chrome ---- */

function DashboardCanvas() {
  return (
    <div className="w-full max-w-[1040px]">
      <div className="relative overflow-hidden rounded-3xl border border-secondary bg-secondary shadow-[0px_24px_48px_-12px_rgba(16,24,40,0.2)]">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 border-b border-secondary bg-primary px-4 py-2.5">
          <div className="flex items-center gap-2 rounded-full border border-secondary bg-secondary px-3 py-1.5">
            <SearchLg className="size-3.5 text-fg-quaternary" />
            <span className="text-[11px] text-placeholder">Search investors, listings, groups…</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-secondary px-2.5 py-1 text-[10px] font-medium text-tertiary sm:flex">
              <span className="size-2 rounded-full bg-utility-yellow-400" />
              73% profile
            </span>
            <div className="flex size-7 items-center justify-center rounded-full bg-brand-solid text-white">
              <Plus className="size-3.5" />
            </div>
            <div className="flex size-7 items-center justify-center rounded-full border border-secondary text-fg-quaternary">
              <Bell01 className="size-3.5" />
            </div>
            <Avatar size="xs" src="/onboarding/avatar-3.png" alt="" />
          </div>
        </div>

        <div className="flex">
          {/* Rail */}
          <div className="flex shrink-0 flex-col items-center gap-3 border-r border-secondary bg-primary px-2.5 py-4">
            <div className="flex size-8 items-center justify-center rounded-lg bg-brand-solid text-white">
              <Home02 className="size-4" />
            </div>
            {[LayoutAlt01, Users01, MessageChatCircle, BarChartSquare02, Building07].map((Icon, i) => (
              <div
                key={i}
                className="flex size-8 items-center justify-center rounded-lg text-fg-quaternary"
              >
                <Icon className="size-4" />
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 p-3 md:p-4">
            {/* Welcome */}
            <div className="mb-3 flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-primary">Welcome back, Alex</span>
              <span className="flex items-center gap-1 text-[10px] text-tertiary">
                <Stars02 className="size-3 text-brand-600" />
                Price update: units at Binghatti Mercedes changed
              </span>
            </div>

            {/* Canvas with slots */}
            <div className="relative aspect-[16/9] w-full">
              {SLOTS.map((slot) => (
                <div key={slot.id} className="absolute" style={slot.style}>
                  {/* empty state */}
                  <div data-empty={slot.id} className="absolute inset-0">
                    <EmptySlot tier={slot.tier} label={slot.emptyLabel} />
                  </div>
                  {/* populated widget */}
                  <Widget id={slot.id} tier={slot.tier} style={{ inset: 0, position: "absolute" }}>
                    {slot.content}
                  </Widget>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
