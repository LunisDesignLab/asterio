import type { ReactNode } from "react";
import Link from "next/link";
import {
  Bell,
  FolderCheck,
  Headphones,
  Home,
  Megaphone,
  MessageCircle,
  PlusCircle,
  Search,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { AsterioLogo } from "@/components/icons/asterio-logo";
import { cn } from "@/lib/cn";

type NavKey = "home" | "deals" | "groups" | "investors" | "posts" | "members";

const NAV: { key: NavKey; icon: LucideIcon; label: string; href?: string }[] = [
  { key: "home", icon: Home, label: "Home", href: "/dashboard" },
  { key: "deals", icon: FolderCheck, label: "Deals" },
  { key: "groups", icon: MessageCircle, label: "Groups", href: "/groups" },
  { key: "investors", icon: Users, label: "Investors" },
  { key: "posts", icon: Megaphone, label: "Posts" },
  { key: "members", icon: UserPlus, label: "Add member" },
];

/**
 * The broker app shell: a floating icon rail on the left and a top bar, on the
 * branded gradient background. Shared chrome for every signed-in page.
 */
export function AppShell({ active, children }: { active: NavKey; children: ReactNode }) {
  return (
    <div className="min-h-dvh w-full bg-[linear-gradient(180deg,#ededed_10%,#cadcfc_100%)]">
      {/* Left rail */}
      <aside className="fixed left-6 top-6 bottom-6 z-30 flex flex-col items-center justify-between">
        <Rail aria-label="Asterio home" href="/dashboard">
          <AsterioLogo className="size-7" />
        </Rail>

        <nav className="flex flex-col items-center gap-md">
          {NAV.map(({ key, icon: Icon, label, href }) => {
            const isActive = key === active;
            const inner = (
              <span
                className={cn(
                  "flex size-14 items-center justify-center rounded-full shadow-[0px_1px_2px_0px_rgba(10,13,18,0.06)] transition-colors",
                  isActive ? "bg-brand-solid text-white" : "bg-white text-secondary hover:text-primary",
                )}
              >
                <Icon className="size-6" aria-hidden="true" />
              </span>
            );
            return href ? (
              <Link key={key} href={href} aria-label={label} aria-current={isActive ? "page" : undefined}>
                {inner}
              </Link>
            ) : (
              <button key={key} type="button" aria-label={`${label} (coming soon)`} title="Coming soon">
                {inner}
              </button>
            );
          })}
        </nav>

        <Rail aria-label="Support">
          <span className="relative">
            <Headphones className="size-6 text-secondary" aria-hidden="true" />
            <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-white bg-[#17b26a]" />
          </span>
        </Rail>
      </aside>

      {/* Content column */}
      <div className="pl-[112px]">
        <div className="px-8 pb-8 pt-6">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-md pb-2xl">
            <div className="flex h-11 w-full max-w-[320px] items-center gap-md rounded-full bg-white px-[14px] shadow-sm">
              <Search className="size-5 text-quaternary" aria-hidden="true" />
              <span className="flex-1 text-md text-placeholder">Search</span>
              <kbd className="rounded border border-secondary px-xs text-xs font-medium text-quaternary">⌘K</kbd>
            </div>
            <div className="flex items-center gap-md">
              <button type="button" aria-label="Quick create" className="flex size-11 items-center justify-center rounded-full bg-brand-solid text-white shadow-sm">
                <PlusCircle className="size-5" aria-hidden="true" />
              </button>
              <button type="button" aria-label="Notifications" className="flex size-11 items-center justify-center rounded-full bg-white text-secondary shadow-sm">
                <Bell className="size-5" aria-hidden="true" />
              </button>
              <span className="flex size-11 items-center justify-center rounded-full bg-white text-sm font-semibold text-brand-secondary shadow-sm">
                <Users className="size-5" aria-hidden="true" />
              </span>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

function Rail({ children, href, ...props }: { children: ReactNode; href?: string } & React.HTMLAttributes<HTMLElement>) {
  const inner = (
    <span className="flex size-16 items-center justify-center rounded-full bg-white shadow-[0px_1px_3px_0px_rgba(10,13,18,0.1)]">
      {children}
    </span>
  );
  return href ? (
    <Link href={href} {...props}>
      {inner}
    </Link>
  ) : (
    <div {...props}>{inner}</div>
  );
}
