import Link from "next/link";
import { AsterioLogo } from "@/components/icons/asterio-logo";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const COLUMNS: FooterColumn[] = [
  {
    title: "Platform",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "For developers", href: "#developers" },
      { label: "For brokers", href: "#brokers" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Create an account", href: "/signup" },
      { label: "Log in", href: "/login" },
      { label: "Partner with us", href: "/partner" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy (PDPL)", href: "#" },
      { label: "Terms", href: "#" },
      { label: "RERA advertising", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-secondary bg-secondary">
      <div className="mx-auto max-w-container px-4 py-8xl md:px-8">
        <div className="flex flex-col gap-7xl lg:flex-row lg:justify-between">
          {/* Brand + mission */}
          <div className="flex max-w-[320px] flex-col gap-xl">
            <Link href="/" className="flex items-center gap-md" aria-label="Asterio home">
              <span className="text-brand-secondary">
                <AsterioLogo className="h-7 w-auto" />
              </span>
              <span className="text-xl font-semibold tracking-[-0.01em] text-primary">Asterio</span>
            </Link>
            <p className="text-md text-tertiary">
              The closed network for the UAE off-plan market. One source of truth between
              developers, brokers and investors.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-7xl sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-lg">
                <span className="text-sm font-semibold text-quaternary">{col.title}</span>
                <ul className="flex flex-col gap-md">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-md font-medium text-tertiary transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8xl flex flex-col gap-md border-t border-secondary pt-xl text-sm text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Asterio. All rights reserved.</span>
          <span>Dubai, United Arab Emirates · Data hosted in the EU</span>
        </div>
      </div>
    </footer>
  );
}
