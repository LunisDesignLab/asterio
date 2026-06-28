import type { ReactNode } from "react";
import { Mail } from "lucide-react";
import { AsterioLogo } from "@/components/icons/asterio-logo";

/**
 * Two-column shell for the payment result screens (success / failed): a centered
 * content column on the left with the Asterio chrome, and a full-bleed image
 * panel on the right. Mirrors the Figma "Payment successful / unsuccessful".
 */
export function PaymentResultShell({
  children,
  rightPanel,
}: {
  children: ReactNode;
  rightPanel: ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-primary">
      <div className="relative flex flex-1 flex-col items-center justify-center px-4xl lg:max-w-[640px] lg:min-w-[480px]">
        <header className="absolute left-8 top-8 flex items-center gap-[14px] text-[#0a0d12]">
          <AsterioLogo className="size-[30px]" />
          <span className="text-[23px] font-bold tracking-tight">Asterio</span>
        </header>

        <main className="flex w-full max-w-[390px] flex-col items-center">{children}</main>

        <p className="absolute bottom-8 left-8 text-sm text-tertiary">© Asterio 2026</p>
        <a
          href="mailto:support@asterio.ae"
          className="absolute bottom-8 right-8 flex items-center gap-md text-sm text-tertiary transition-colors hover:text-secondary"
        >
          <Mail className="size-4" aria-hidden="true" />
          support@asterio.ae
        </a>
      </div>

      <div className="relative hidden flex-1 overflow-hidden lg:block">{rightPanel}</div>
    </div>
  );
}
