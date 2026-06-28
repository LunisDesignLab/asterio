"use client";

import { Plus } from "lucide-react";
import { AsterioLogo } from "@/components/icons/asterio-logo";

// Literal class strings so Tailwind's JIT picks up the arbitrary rotations.
const CARDS = [
  { src: "/groups/fan-2.jpg", transform: "-rotate-[16deg] group-hover:-rotate-[30deg] group-hover:-translate-x-6", z: "z-10" },
  { src: "/groups/fan-4.jpg", transform: "-rotate-[8deg] group-hover:-rotate-[15deg] group-hover:-translate-x-2", z: "z-20" },
  { src: "/groups/fan-1.jpg", transform: "rotate-0 group-hover:-translate-y-3 group-hover:scale-[1.04]", z: "z-30" },
  { src: "/groups/fan-3.jpg", transform: "rotate-[8deg] group-hover:rotate-[15deg] group-hover:translate-x-2", z: "z-20" },
  { src: "/groups/fan-5.jpg", transform: "rotate-[16deg] group-hover:rotate-[30deg] group-hover:translate-x-6", z: "z-10" },
];

export function GroupEmptyState({ maxGroups, onCreate }: { maxGroups: number; onCreate: () => void }) {
  const limit =
    maxGroups === 1 ? (
      <>
        Your Free plan includes <strong className="font-semibold text-secondary">1 group</strong>, make
        it count.
      </>
    ) : (
      <>
        Your plan includes up to{" "}
        <strong className="font-semibold text-secondary">{maxGroups} groups</strong>.
      </>
    );

  return (
    <div className="flex min-h-[calc(100dvh-220px)] flex-col items-center justify-center gap-6xl text-center">
      {/* Fanned cards */}
      <div className="group relative mx-auto h-[300px] w-[340px]">
        <span className="absolute left-1/2 top-2 z-40 flex size-9 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-[#0000000d]">
          <AsterioLogo className="size-5" />
        </span>
        {CARDS.map((card) => (
          <div
            key={card.src}
            className={`absolute bottom-0 left-1/2 ml-[-78px] h-[212px] w-[156px] origin-bottom overflow-hidden rounded-2xl shadow-xl ring-4 ring-white transition-transform duration-500 ease-out ${card.transform} ${card.z}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.src} alt="" className="size-full object-cover" draggable={false} />
          </div>
        ))}
      </div>

      {/* Task + CTA */}
      <div className="flex max-w-[420px] flex-col items-center gap-xl">
        <div className="flex flex-col gap-sm">
          <span className="mx-auto rounded-full bg-secondary px-md py-[3px] text-xs font-medium text-tertiary">
            0 of {maxGroups} groups created
          </span>
          <h2 className="text-display-sm font-semibold tracking-[-0.02em] text-primary">
            When, if not today?
          </h2>
          <p className="text-md text-tertiary">You haven&apos;t created any group yet. {limit}</p>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="flex h-12 items-center gap-sm rounded-full bg-brand-solid px-2xl text-md font-semibold text-white shadow-md transition-transform hover:scale-[1.02]"
        >
          <Plus className="size-5" aria-hidden="true" /> Create your first group
        </button>
      </div>
    </div>
  );
}
