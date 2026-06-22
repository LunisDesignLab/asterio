import { Star } from "lucide-react";

const AVATARS = [1, 2, 3, 4, 5];

/** Right-hand marketing panel shared across the onboarding flow. */
export function MarketingPanel() {
  return (
    <div className="relative hidden w-[42%] shrink-0 flex-col overflow-hidden pt-6xl pl-7xl pb-4xl lg:flex">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/onboarding/panel-bg.png"
        alt=""
        className="absolute inset-0 size-full object-cover"
      />

      {/* Social proof */}
      <div className="relative z-10 flex items-center gap-xl">
        <div className="flex -space-x-3">
          {AVATARS.map((i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={`/onboarding/avatar-${i}.png`}
              alt=""
              className="size-10 rounded-full object-cover ring-[1.5px] ring-white"
            />
          ))}
        </div>
        <div className="flex flex-col gap-xs">
          <div className="flex items-center gap-md">
            <div className="flex gap-xs">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-[#fec84b] text-[#fec84b]" />
              ))}
            </div>
            <span className="text-md font-semibold text-white">5.0</span>
          </div>
          <span className="text-md font-medium text-white">from 200+ reviews</span>
        </div>
      </div>

      {/* Dashboard preview */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/onboarding/dashboard-preview.png"
        alt="Asterio broker dashboard preview"
        className="absolute right-0 top-1/2 w-[712px] max-w-none -translate-y-1/2 rounded-l-[20px] shadow-[0px_4px_35px_10px_rgba(255,255,255,0.25)]"
      />
    </div>
  );
}
