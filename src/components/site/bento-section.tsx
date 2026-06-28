"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ShieldTick,
  Lock01,
  FileCheck02,
  Stars02,
  Send01,
  MarkerPin01,
  CheckCircle,
  Building07,
  Users01,
  TrendUp02,
} from "@untitledui/icons";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

// Register once, client-side only.
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/**
 * Cinematic bento grid for the "Why Asterio" section. Every entrance, scrub
 * and looping illustration is driven by a single GSAP context scoped to the
 * section root, so cleanup is automatic. Illustrations are built from the
 * design system — no stock photos — to stay coherent with the product.
 */

function Cell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`bento-cell group relative flex h-full flex-col overflow-hidden rounded-4xl border border-secondary bg-secondary ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function CellText({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col gap-sm p-4xl pt-xl">
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <p className="text-md text-tertiary">{body}</p>
    </div>
  );
}

/* ------------------------------------------------------ Illustrations ---- */

function SecurityArt() {
  return (
    <div className="relative h-full min-h-[260px] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "radial-gradient(120% 90% at 50% 0%, rgba(127,86,217,0.16), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden
            className="bento-ring absolute rounded-full border border-brand-300/50"
            style={{ width: 120 + i * 90, height: 120 + i * 90 }}
          />
        ))}
        <div className="relative z-10 flex size-20 items-center justify-center rounded-3xl border border-secondary bg-primary text-brand-600 shadow-[0px_12px_24px_-6px_rgba(127,86,217,0.4)]">
          <ShieldTick className="size-9" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-md">
        {[
          { icon: Building07, label: "Developer" },
          { icon: Users01, label: "Broker" },
          { icon: TrendUp02, label: "Investor" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-xs rounded-full border border-secondary bg-primary/90 px-md py-xs shadow-xs backdrop-blur-sm"
          >
            <Icon className="size-3.5 text-brand-600" />
            <span className="text-xs font-medium text-secondary">{label}</span>
            <Lock01 className="size-3 text-fg-quaternary" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ExtractionArt() {
  const rows = ["Starting price", "Payment plan", "RERA permit", "Handover"];
  return (
    <div className="bento-extraction relative h-full min-h-[180px] overflow-hidden p-4xl pb-0">
      <div
        aria-hidden
        className="absolute -right-10 -top-10 size-40 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(127,86,217,0.4), transparent)" }}
      />
      <div className="relative mx-auto w-full max-w-[280px] rounded-2xl border border-secondary bg-primary p-lg shadow-sm">
        <div className="mb-md flex items-center gap-md">
          <FeaturedIcon icon={FileCheck02} color="brand" theme="modern" size="sm" />
          <div className="h-2 w-24 rounded-full bg-quaternary" />
        </div>
        <div className="flex flex-col gap-sm">
          {rows.map((label) => (
            <div
              key={label}
              className="bento-row flex items-center gap-sm rounded-lg border border-secondary bg-secondary px-md py-sm"
            >
              <CheckCircle className="size-4 text-fg-success-primary" />
              <span className="text-xs text-tertiary">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AiArt() {
  return (
    <div className="relative h-full min-h-[180px] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          aria-hidden
          className="bento-orb size-28 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, #6141b0, #9e77ed, #b692f6, #7f56d9, #6141b0)",
            filter: "blur(6px)",
          }}
        />
        <div className="absolute flex size-16 items-center justify-center rounded-full border border-secondary bg-primary text-brand-600 shadow-md">
          <Stars02 className="size-7" />
        </div>
        <div className="bento-spark-ring absolute size-40">
          {[0, 120, 240].map((deg) => (
            <span
              key={deg}
              aria-hidden
              className="absolute left-1/2 top-1/2 size-1.5 rounded-full bg-brand-400"
              style={{ transform: `rotate(${deg}deg) translateX(80px)` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DistributionArt() {
  return (
    <div className="bento-dist relative h-full min-h-[180px] overflow-hidden">
      <svg viewBox="0 0 320 180" className="absolute inset-0 size-full" aria-hidden>
        <g stroke="var(--color-border-primary)" strokeWidth="1.5" fill="none">
          <path d="M160 90 L70 45" />
          <path d="M160 90 L70 135" />
          <path d="M160 90 L250 135" />
        </g>
        <path
          className="bento-link"
          d="M160 90 L250 45"
          stroke="var(--color-brand-600)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <Node x={160} y={90} center />
      <Node x={70} y={45} />
      <Node x={70} y={135} />
      <Node x={250} y={135} />
      <Node x={250} y={45} active />
    </div>
  );
}

function Node({ x, y, active, center }: { x: number; y: number; active?: boolean; center?: boolean }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${(x / 320) * 100}%`, top: `${(y / 180) * 100}%` }}
    >
      {center ? (
        <div className="flex size-11 items-center justify-center rounded-full border border-secondary bg-primary text-brand-600 shadow-md">
          <Send01 className="size-5" />
        </div>
      ) : (
        <div
          className={
            active
              ? "flex size-9 items-center justify-center rounded-full bg-brand-solid text-white shadow-md"
              : "flex size-9 items-center justify-center rounded-full border border-secondary bg-primary text-fg-quaternary"
          }
        >
          <Users01 className="size-4" />
        </div>
      )}
    </div>
  );
}

function MapArt() {
  return (
    <div className="relative h-full min-h-[180px] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(16,24,40,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,24,40,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "radial-gradient(80% 60% at 60% 40%, rgba(127,86,217,0.14), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <span className="bento-pin absolute -inset-6 rounded-full bg-brand-400/20" />
          <FeaturedIcon icon={MarkerPin01} color="brand" theme="gradient" size="xl" />
        </div>
      </div>
      <span className="absolute bottom-5 left-5 rounded-full border border-secondary bg-primary/90 px-md py-xs text-xs font-medium text-secondary backdrop-blur-sm">
        Dubai-first · UAE off-plan
      </span>
    </div>
  );
}

/* ---------------------------------------------------------- Section ------ */

function reduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function BentoSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced()) return;

      // Header + cells entrance
      gsap.from(".bento-head", {
        autoAlpha: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".bento-head", start: "top 85%", once: true },
      });
      gsap.from(".bento-cell", {
        autoAlpha: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".bento-grid", start: "top 80%", once: true },
      });

      // Looping illustrations
      gsap.to(".bento-ring", {
        scale: 1.08,
        opacity: 0.85,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });
      gsap.to(".bento-orb", { rotate: 360, duration: 14, ease: "none", repeat: -1 });
      gsap.to(".bento-spark-ring", { rotate: 360, duration: 9, ease: "none", repeat: -1 });
      gsap.fromTo(
        ".bento-pin",
        { scale: 0.7, opacity: 0.5 },
        { scale: 1.4, opacity: 0, duration: 2.4, ease: "power1.out", repeat: -1 },
      );

      // Extraction rows fill in on scroll
      gsap.from(".bento-row", {
        autoAlpha: 0,
        x: -12,
        duration: 0.5,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: { trigger: ".bento-extraction", start: "top 80%", once: true },
      });

      // Targeted-distribution link draws itself
      const link = root.current?.querySelector<SVGPathElement>(".bento-link");
      if (link) {
        const len = link.getTotalLength();
        gsap.set(link, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(link, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power2.inOut",
          scrollTrigger: { trigger: ".bento-dist", start: "top 80%", once: true },
        });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-primary">
      <div className="mx-auto flex max-w-container flex-col gap-6xl px-4 pt-8xl pb-7xl md:px-8">
        <div className="bento-head flex max-w-[720px] flex-col gap-xl">
          <span className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-secondary">
            Why Asterio
          </span>
          <h2 className="text-display-sm font-semibold tracking-[-0.02em] text-primary lg:text-display-md">
            Clean data, the right audience, real security
          </h2>
          <p className="text-lg text-tertiary">
            Every decision in Asterio protects two things: the accuracy of your listings and the
            privacy of your network.
          </p>
        </div>

        <div className="bento-grid grid grid-cols-1 gap-xl lg:grid-cols-6">
          <Cell className="lg:col-span-4">
            <SecurityArt />
            <CellText
              title="Closed-circuit by design"
              body="Nothing is public. Every view sits behind an account, and tenant isolation is enforced in the database with row-level security — not just hidden in the UI. Brokers never see other brokers."
            />
          </Cell>

          <Cell className="lg:col-span-2">
            <AiArt />
            <CellText
              title="AI that earns its place"
              body="To-do lists, lead scoring and benchmarks are computed locally — instant and free. AI is reserved for reading PDFs and turning cold data into plain language."
            />
          </Cell>

          <Cell className="lg:col-span-2">
            <ExtractionArt />
            <CellText
              title="PDF → listing, in minutes"
              body="Drop in a brochure — even a scanned one. Claude vision fills the listing field by field, with confidence signals. You confirm; nothing is silently trusted."
            />
          </Cell>

          <Cell className="lg:col-span-2">
            <DistributionArt />
            <CellText
              title="Targeted distribution"
              body="Post a listing into the exact groups it fits — one or many. Members of every other group never see it. Relevance is the default."
            />
          </Cell>

          <Cell className="lg:col-span-2">
            <MapArt />
            <CellText
              title="Built for the UAE market"
              body="Dubai-first, English-only, PDPL-aware. Tuned to off-plan workflows — EOI to Oqood — and the developers shaping the skyline."
            />
          </Cell>
        </div>
      </div>
    </section>
  );
}
