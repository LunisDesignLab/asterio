"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AsterioLogo } from "@/components/icons/asterio-logo";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/site-content";
import { cn } from "@/lib/cn";

/** Sticky marketing header with a collapsible mobile menu. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-secondary bg-primary/80 backdrop-blur-md">
      <nav className="mx-auto flex h-[72px] max-w-container items-center justify-between px-4 md:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-md" aria-label="Asterio home">
          <span className="text-brand-secondary">
            <AsterioLogo className="h-7 w-auto" />
          </span>
          <span className="text-xl font-semibold tracking-[-0.01em] text-primary">Asterio</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-xl lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-md font-medium text-tertiary transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-md lg:flex">
          <Link
            href="/login"
            className="px-md py-sm text-md font-semibold text-secondary transition-colors hover:text-primary"
          >
            Log in
          </Link>
          <Link href="/signup">
            <Button variant="primary" className="px-lg py-md text-sm">
              Get started
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-secondary lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-secondary bg-primary lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="flex flex-col gap-xs px-4 py-xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-md py-md text-lg font-medium text-secondary hover:bg-secondary"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-md flex flex-col gap-md border-t border-secondary pt-xl">
            <Link
              href="/login"
              className="px-md text-lg font-semibold text-secondary"
            >
              Log in
            </Link>
            <Link href="/signup">
              <Button variant="primary" fullWidth>
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
