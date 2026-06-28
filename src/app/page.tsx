import type { Metadata } from "next";
import type { FC } from "react";
import Link from "next/link";
import { ArrowRight, Building07, Users01, TrendUp02, Check } from "@untitledui/icons";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteFaq } from "@/components/site/site-faq";
import { RoleMockup } from "@/components/site/role-mockups";
import { BentoSection } from "@/components/site/bento-section";
import { DashboardPopulate } from "@/components/site/dashboard-populate";
import {
  Reveal,
  RevealStagger,
  RevealItem,
  HeroShot,
  CountUp,
} from "@/components/site/scroll-fx";
import { RecommendedBadge } from "@/components/icons/laurel";
import { DEVELOPER_NAMES, PROBLEM_POINTS, ROLES, STATS } from "@/lib/site-content";
import { PLANS, TESTIMONIALS, type Plan } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Asterio — The closed network for UAE off-plan real estate",
  description:
    "Asterio is the single source of truth between developers, brokers and investors in the UAE off-plan market. Clean listings, targeted distribution, zero spam.",
};

type IconType = FC<{ className?: string }>;

const ROLE_ICONS: Record<string, IconType> = {
  Building2: Building07,
  Users: Users01,
  TrendingUp: TrendUp02,
};

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col">
        <Hero />
        <TrustStrip />
        <ProblemSection />
        <HowItWorks />
        <BentoSection />
        <DashboardPopulate />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}

/* ---------------------------------------------------------------- Hero ---- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Soft brand glow behind the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-200px] mx-auto h-[600px] max-w-[900px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(127,86,217,0.18), rgba(127,86,217,0) 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-container flex-col items-center gap-7xl px-4 pt-8xl pb-7xl md:px-8">
        <RevealStagger className="flex max-w-[820px] flex-col items-center gap-3xl text-center">
          <RevealItem className="inline-flex items-center gap-md rounded-full border border-secondary bg-secondary px-lg py-xs">
            <span className="inline-flex size-2 animate-pulse rounded-full bg-brand-solid" />
            <span className="text-sm font-medium text-secondary">
              Built for the UAE off-plan market — Dubai first
            </span>
          </RevealItem>

          <RevealItem>
            <h1 className="text-display-md font-semibold tracking-[-0.02em] text-primary md:text-display-xl">
              One source of truth for off-plan real estate
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="max-w-[640px] text-lg text-tertiary md:text-xl">
              Asterio connects developers, brokers and investors in one private platform — so the
              right unit reaches the right investor, with clean data and zero spam.
            </p>
          </RevealItem>

          <RevealItem className="flex flex-col items-center gap-md sm:flex-row">
            <Link href="/signup">
              <Button variant="primary" className="px-3xl">
                Get started — it&apos;s free
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="secondary" className="px-3xl">
                See how it works
              </Button>
            </a>
          </RevealItem>

          {/* Social proof */}
          <RevealItem className="mt-md flex items-center gap-lg">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={`/onboarding/avatar-${i}.png`}
                  alt=""
                  className="size-9 rounded-full object-cover ring-[1.5px] ring-white"
                />
              ))}
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-xs">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-[#fec84b] text-[#fec84b]" />
                ))}
              </div>
              <span className="text-sm text-tertiary">Loved by brokers across Dubai</span>
            </div>
          </RevealItem>
        </RevealStagger>

        {/* Product shot — cinematic 3D rise, scrubbed to scroll */}
        <HeroShot className="relative mx-auto w-full max-w-[1040px]">
          <div className="overflow-hidden rounded-2xl border border-secondary bg-secondary shadow-[0px_24px_48px_-12px_rgba(16,24,40,0.18)] md:rounded-4xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/asterio-dashboard.png"
              alt="The Asterio broker dashboard"
              className="w-full object-cover"
            />
          </div>
        </HeroShot>

        {/* Stats — count up on view */}
        <RevealStagger className="grid w-full max-w-[820px] grid-cols-1 gap-xl sm:grid-cols-3">
          {STATS.map((stat) => (
            <RevealItem
              key={stat.label}
              className="flex flex-col items-center gap-xs rounded-2xl border border-secondary bg-secondary px-xl py-3xl text-center"
            >
              <CountUp
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="text-display-sm font-semibold text-brand-secondary"
              />
              <span className="text-sm text-tertiary">{stat.label}</span>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Trust strip ---- */

function TrustStrip() {
  return (
    <section className="border-y border-secondary bg-secondary">
      <div className="mx-auto flex max-w-container flex-col items-center gap-xl px-4 py-6xl md:px-8">
        <span className="text-sm font-medium text-quaternary">
          Built for the developers shaping Dubai&apos;s skyline
        </span>
        <div className="flex flex-wrap items-center justify-center gap-x-7xl gap-y-lg">
          {DEVELOPER_NAMES.map((name) => (
            <span
              key={name}
              className="text-xl font-semibold tracking-[-0.01em] text-quaternary"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ Problem section --- */

function ProblemSection() {
  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-container flex-col gap-5xl px-4 pt-8xl pb-7xl md:px-8">
        <Reveal className="flex max-w-[720px] flex-col gap-xl">
          <SectionEyebrow>The problem we kill</SectionEyebrow>
          <h2 className="text-display-sm font-semibold tracking-[-0.02em] text-primary lg:text-display-md">
            Off-plan deals run on scattered PDFs and noisy group chats
          </h2>
          <p className="text-lg text-tertiary">
            Developers lose control of their data, brokers rebuild low-quality listings, and
            investors drown in units that have nothing to do with them. Asterio replaces the chaos
            with one clean pipeline.
          </p>
        </Reveal>

        <RevealStagger className="flex flex-col gap-xl">
          {PROBLEM_POINTS.map((point) => (
            <RevealItem
              key={point.before}
              className="grid grid-cols-1 gap-lg rounded-3xl border border-secondary bg-secondary p-3xl md:grid-cols-2 md:items-center md:gap-7xl"
            >
              <div className="flex items-start gap-lg">
                <span className="mt-xxs inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-quaternary text-xs font-semibold text-tertiary">
                  ✕
                </span>
                <p className="text-md text-tertiary line-through decoration-border-primary">
                  {point.before}
                </p>
              </div>
              <div className="flex items-start gap-lg">
                <span className="mt-xxs inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-solid text-white">
                  <Check className="size-4" />
                </span>
                <p className="text-md font-medium text-primary">{point.after}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- How it works --- */

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-[72px] bg-secondary">
      <div className="mx-auto flex max-w-container flex-col gap-8xl px-4 pt-8xl pb-8xl md:px-8">
        <Reveal className="flex max-w-[720px] flex-col gap-xl">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="text-display-sm font-semibold tracking-[-0.02em] text-primary lg:text-display-md">
            Three roles, one continuous flow
          </h2>
          <p className="text-lg text-tertiary">
            The developer authors the listing. The broker routes it. The investor receives only
            what fits. Each role sees exactly what it should — and nothing it shouldn&apos;t.
          </p>
        </Reveal>

        <div className="flex flex-col gap-8xl">
          {ROLES.map((role, i) => {
            const Icon = ROLE_ICONS[role.icon];
            return (
              <div
                key={role.id}
                id={role.id}
                className="grid scroll-mt-[88px] grid-cols-1 items-center gap-5xl lg:grid-cols-2 lg:gap-8xl"
              >
                {/* Copy */}
                <Reveal className={i % 2 === 1 ? "lg:order-2" : ""} y={32}>
                  <div className="flex flex-col gap-xl">
                    <FeaturedIcon icon={Icon} color="brand" theme="modern" size="lg" />
                    <SectionEyebrow>{role.eyebrow}</SectionEyebrow>
                    <h3 className="text-display-xs font-semibold tracking-[-0.01em] text-primary lg:text-display-sm">
                      {role.title}
                    </h3>
                    <p className="text-lg text-tertiary">{role.description}</p>
                    <ul className="flex flex-col gap-md">
                      {role.points.map((p) => (
                        <li key={p} className="flex items-start gap-md">
                          <span className="mt-xxs inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                            <Check className="size-3.5" />
                          </span>
                          <span className="text-md text-secondary">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                {/* Visual */}
                <Reveal className={i % 2 === 1 ? "lg:order-1" : ""} delay={0.12} y={32}>
                  <RoleMockup role={role.id} />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Pricing section -- */

function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-[72px] bg-secondary">
      <div className="mx-auto flex max-w-container flex-col gap-6xl px-4 pt-8xl pb-8xl md:px-8">
        <Reveal className="flex flex-col items-center gap-xl text-center">
          <RecommendedBadge text="Recommended by Emaar" />
          <h2 className="text-display-sm font-semibold tracking-[-0.02em] text-primary lg:text-display-md">
            Start free. Upgrade when you&apos;re ready.
          </h2>
          <p className="max-w-[560px] text-lg text-tertiary">
            Broker plans, billed monthly or annually. No trials, no surprises — Free explores within
            limits, paid unlocks scale.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 gap-xl lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((plan) => (
            <RevealItem key={plan.id} className="h-full">
              <PricingCard plan={plan} />
            </RevealItem>
          ))}
        </RevealStagger>

        <p className="text-center text-sm text-tertiary">
          Investors join free by invite, or self-sign up on Pro (AED 49/mo). Developers are always
          free —{" "}
          <Link href="/partner" className="font-semibold text-brand-secondary">
            partner with us
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={
        plan.featured
          ? "relative flex h-full flex-col gap-3xl rounded-4xl border-2 border-brand-600 bg-primary p-4xl shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08)]"
          : "relative flex h-full flex-col gap-3xl rounded-4xl border border-secondary bg-primary p-4xl"
      }
    >
      {plan.badge && (
        <span className="absolute right-4xl top-4xl rounded-full bg-brand-50 px-md py-xxs text-xs font-semibold text-brand-700">
          {plan.badge}
        </span>
      )}

      <div className="flex flex-col gap-md">
        <span className="text-lg font-semibold text-primary">{plan.name}</span>
        <div className="flex items-end gap-xs">
          <span className="text-display-md font-semibold tracking-[-0.02em] text-primary">
            {plan.priceMonthly === 0 ? "Free" : `AED ${plan.priceMonthly}`}
          </span>
          {plan.priceMonthly > 0 && (
            <span className="mb-xs text-md text-tertiary">/mo</span>
          )}
        </div>
        <p className="text-sm text-tertiary">{plan.tagline}</p>
      </div>

      <ul className="flex flex-1 flex-col gap-md">
        {plan.highlights.map((h) => (
          <li key={h} className="flex items-start gap-md">
            <span className="mt-xxs inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <Check className="size-3.5" />
            </span>
            <span className="text-md text-secondary">{h}</span>
          </li>
        ))}
      </ul>

      <Link href="/signup">
        <Button variant={plan.featured ? "primary" : "secondary"} fullWidth>
          {plan.cta}
        </Button>
      </Link>
    </div>
  );
}

/* --------------------------------------------------- Testimonials section - */

function TestimonialsSection() {
  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-container flex-col gap-6xl px-4 pt-8xl pb-7xl md:px-8">
        <Reveal className="flex max-w-[720px] flex-col gap-xl">
          <SectionEyebrow>Wall of love</SectionEyebrow>
          <h2 className="text-display-sm font-semibold tracking-[-0.02em] text-primary lg:text-display-md">
            Brokers who stopped spamming and started closing
          </h2>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 gap-xl md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <RevealItem
              key={t.name}
              className="flex flex-col gap-xl rounded-3xl border border-secondary bg-secondary p-3xl"
            >
              <div className="flex gap-xs">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-[#fec84b] text-[#fec84b]" />
                ))}
              </div>
              <blockquote className="flex-1 text-md text-secondary">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt="" className="size-10 rounded-full object-cover" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-primary">{t.name}</span>
                  <span className="text-sm text-tertiary">{t.role}</span>
                </div>
              </figcaption>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- FAQ section -- */

function FaqSection() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto flex max-w-container flex-col gap-6xl px-4 pt-8xl pb-8xl md:px-8">
        <Reveal className="flex flex-col items-center gap-xl text-center">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="text-display-sm font-semibold tracking-[-0.02em] text-primary lg:text-display-md">
            Questions, answered
          </h2>
        </Reveal>
        <Reveal>
          <SiteFaq />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Final CTA --- */

function FinalCta() {
  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-container px-4 pb-8xl md:px-8">
        <div className="relative overflow-hidden rounded-4xl bg-brand-solid px-4 py-8xl text-center md:px-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15), transparent 40%)",
            }}
          />
          <div className="relative flex flex-col items-center gap-xl">
            <h2 className="max-w-[640px] text-display-sm font-semibold tracking-[-0.02em] text-white lg:text-display-md">
              Bring order to your off-plan pipeline
            </h2>
            <p className="max-w-[520px] text-lg text-white/80">
              Join the closed network where developers, brokers and investors finally work from the
              same clean data.
            </p>
            <div className="flex flex-col items-center gap-md sm:flex-row">
              <Link href="/signup">
                <Button
                  variant="secondary"
                  className="border-transparent bg-white px-3xl text-brand-700 hover:bg-white"
                >
                  Get started — it&apos;s free
                </Button>
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center gap-xs text-md font-semibold text-white"
              >
                View pricing
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Helpers --- */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-secondary">
      {children}
    </span>
  );
}
