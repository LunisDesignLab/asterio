import { AsterioLogo } from "@/components/icons/asterio-logo";
import { StepIndicator } from "@/components/onboarding/step-indicator";

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-secondary">
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-[14px] text-[#0a0d12]">
          <AsterioLogo className="size-[30px]" />
          <span className="text-[23px] font-bold tracking-tight">Asterio</span>
        </div>
        <StepIndicator total={4} />
      </header>
      <main className="mx-auto w-full max-w-[1140px] px-8 pb-8xl">{children}</main>
    </div>
  );
}
