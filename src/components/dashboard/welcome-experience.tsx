"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { WelcomeModal } from "./welcome-modal";

// Shown once per browser. When the real dashboard exists this moves to a
// server-side flag (profiles.onboarding_seen) so it follows the account.
const STORAGE_KEY = "asterio_welcome_seen";

export function WelcomeExperience({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  // Decide on mount — localStorage is client-only, so this can't run during
  // render. Starts closed, so there's no SSR/hydration mismatch.
  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // localStorage unavailable — just show it.
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!seen) setOpen(true);
  }, []);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-sm rounded-full border border-secondary px-lg py-[8px] text-sm font-semibold text-secondary transition-colors hover:bg-secondary"
      >
        <Sparkles className="size-4 text-brand-secondary" aria-hidden="true" />
        Getting started
      </button>

      {open && (
        // Get started routes to the first activation step once those modules
        // exist; for now it simply dismisses the modal.
        <WelcomeModal name={name} onClose={dismiss} onGetStarted={dismiss} />
      )}
    </>
  );
}
