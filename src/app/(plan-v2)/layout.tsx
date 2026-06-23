import { AsterioLogo } from "@/components/icons/asterio-logo";
import { StepIndicator } from "@/components/onboarding/step-indicator";
import { MarketingPanel } from "@/components/onboarding/marketing-panel";

// V2 of Choose your plan: the classic split layout with the image on the right
// (kept sticky so it stays in view while the plan content scrolls on the left).
export default function PlanV2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-primary">
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-[14px] text-[#0a0d12]">
            <AsterioLogo className="size-[30px]" />
            <span className="text-[23px] font-bold tracking-tight">Asterio</span>
          </div>
          <StepIndicator total={4} />
        </header>
        <main className="mx-auto w-full max-w-[840px] flex-1 px-8 pb-8xl">{children}</main>
      </div>

      <aside className="hidden h-screen w-[40%] shrink-0 self-start lg:sticky lg:top-0 lg:flex">
        <MarketingPanel />
      </aside>
    </div>
  );
}
