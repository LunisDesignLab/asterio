import { Mail } from "lucide-react";
import { MarketingPanel } from "@/components/onboarding/marketing-panel";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import { AsterioLogo } from "@/components/icons/asterio-logo";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-primary">
      {/* Left: form column */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-4xl">
        <header className="absolute left-8 right-8 top-8 flex items-center justify-between">
          <div className="flex items-center gap-[14px] text-[#0a0d12]">
            <AsterioLogo className="size-[30px]" />
            <span className="text-[23px] font-bold tracking-tight">Asterio</span>
          </div>
          <StepIndicator total={4} />
        </header>

        <main className="flex w-full flex-col items-center">{children}</main>

        <p className="absolute bottom-8 left-8 text-sm text-tertiary">© Asterio 2026</p>
        <a
          href="mailto:support@asterio.ae"
          className="absolute bottom-8 right-8 flex items-center gap-md text-sm text-tertiary transition-colors hover:text-secondary"
        >
          <Mail className="size-4" aria-hidden="true" />
          support@asterio.ae
        </a>
      </div>

      {/* Right: marketing panel */}
      <MarketingPanel />
    </div>
  );
}
