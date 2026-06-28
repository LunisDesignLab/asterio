"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once, client-side only (these modules touch `window`).
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

const EASE = "power3.out";

function reduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* --------------------------------------------------------------- Reveal --- */

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** travel distance in px */
  y?: number;
  /** seconds before animating in */
  delay?: number;
}

/** Fade + slide-up the element when it scrolls into view (plays once). */
export function Reveal({ children, className, y = 28, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced()) return;
      gsap.from(ref.current, {
        autoAlpha: 0,
        y,
        duration: 0.8,
        delay,
        ease: EASE,
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ----------------------------------------------------- Stagger container -- */

/** Reveals its `RevealItem` children one after another on scroll. */
export function RevealStagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced()) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal-item]", ref.current);
      if (!items.length) return;
      gsap.from(items, {
        autoAlpha: 0,
        y: 28,
        duration: 0.7,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 84%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-reveal-item className={className}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------ Hero shot --- */

/** Cinematic product shot: rises out of a slight 3D tilt as it scrolls in,
 *  the motion scrubbed directly to scroll position. */
export function HeroShot({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced()) return;
      gsap.fromTo(
        inner.current,
        { rotateX: 16, scale: 0.94, y: 36, transformPerspective: 1200, transformOrigin: "center top" },
        {
          rotateX: 0,
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            end: "top 35%",
            scrub: 1,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <div ref={inner} style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- CountUp --- */

/** Counts from 0 to `value` when scrolled into view. */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced()) {
        el.textContent = `${prefix}${value}${suffix}`;
        return;
      }
      const obj = { v: 0 };
      el.textContent = `${prefix}0${suffix}`;
      gsap.to(obj, {
        v: value,
        duration: 1.4,
        ease: EASE,
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {`${prefix}${value}${suffix}`}
    </span>
  );
}
