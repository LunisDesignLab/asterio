"use client";

import { useState } from "react";
import { ListChecks, Maximize2, Pause, Play, Send, Sparkles, type LucideIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WELCOME_VALUE_PROPS, type ValuePropIcon } from "@/lib/welcome-content";

const VIDEO_DURATION = "2:30";

const ICONS: Record<ValuePropIcon, LucideIcon> = {
  listings: FileText,
  targeting: Send,
  ai: Sparkles,
  pipeline: ListChecks,
};

export function WelcomeModal({
  name,
  onClose,
  onGetStarted,
}: {
  name: string;
  onClose: () => void;
  onGetStarted: () => void;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0d12]/60 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        className="flex max-h-[92vh] w-full max-w-[560px] flex-col overflow-hidden rounded-2xl bg-primary shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-md px-3xl pt-3xl pb-lg">
          <div className="flex flex-col gap-xxs">
            <h2 id="welcome-title" className="text-xl font-semibold text-primary">
              Welcome to Asterio, {name}
            </h2>
            <p className="text-sm text-tertiary">
              A quick {VIDEO_DURATION} tour to get you up and running.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-xs -mt-xs shrink-0 rounded-md p-xs text-quaternary transition-colors hover:bg-secondary hover:text-tertiary"
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-2xl overflow-y-auto px-3xl pb-3xl">
          {/* Video — hero */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#0a0d12]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/asterio-dashboard.png"
              alt="Asterio product tour"
              className={`size-full object-cover transition-all ${playing ? "scale-105 brightness-[0.85]" : ""}`}
            />
            {!playing ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play product tour"
                className="group absolute inset-0 flex items-center justify-center bg-[#0a0d12]/10 transition-colors hover:bg-[#0a0d12]/20"
              >
                <span className="flex size-[72px] items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform group-hover:scale-105">
                  <Play className="size-7 translate-x-[2px] fill-current text-primary" aria-hidden="true" />
                </span>
                <span className="absolute bottom-3 right-3 rounded-md bg-[#0a0d12]/80 px-2 py-0.5 text-xs font-medium text-white">
                  {VIDEO_DURATION}
                </span>
              </button>
            ) : (
              <div className="absolute inset-0 flex flex-col justify-end">
                <div className="flex items-center gap-md bg-gradient-to-t from-[#0a0d12]/90 to-transparent px-4 pb-3 pt-10 text-white">
                  <button type="button" onClick={() => setPlaying(false)} aria-label="Pause" className="shrink-0">
                    <Pause className="size-5 fill-current" aria-hidden="true" />
                  </button>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
                    <div className="h-full w-[18%] rounded-full bg-white" />
                  </div>
                  <span className="shrink-0 text-xs tabular-nums">0:27 / {VIDEO_DURATION}</span>
                  <Maximize2 className="size-4 shrink-0" aria-hidden="true" />
                </div>
              </div>
            )}
          </div>

          {/* Value propositions — what Asterio does for you */}
          <ul className="flex flex-col gap-xl">
            {WELCOME_VALUE_PROPS.map((prop) => {
              const Icon = ICONS[prop.icon];
              return (
                <li key={prop.title} className="flex items-start gap-lg">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[#f4f0ff] text-brand-secondary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-xxs">
                    <p className="text-sm font-semibold text-primary">{prop.title}</p>
                    <p className="text-sm text-tertiary">{prop.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-md border-t border-secondary px-3xl py-xl">
          <button
            type="button"
            onClick={onClose}
            className="px-lg py-[10px] text-sm font-semibold text-tertiary transition-colors hover:text-secondary"
          >
            Watch later
          </button>
          <Button variant="primary" onClick={onGetStarted}>
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
}
