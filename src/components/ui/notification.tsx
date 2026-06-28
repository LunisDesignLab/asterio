import type { ReactNode } from "react";
import { AlertCircle, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "error" | "warning";

const STYLES: Record<Variant, string> = {
  error: "border-[#fda29b] bg-[#fef3f2] text-[#b42318]",
  warning: "border-[#fec84b] bg-[#fffaeb] text-[#b54708]",
};

const ICONS: Record<Variant, typeof AlertCircle> = {
  error: AlertCircle,
  warning: AlertTriangle,
};

export function Notification({
  variant = "error",
  children,
  onClose,
}: {
  variant?: Variant;
  children: ReactNode;
  onClose?: () => void;
}) {
  const Icon = ICONS[variant];
  return (
    <div
      role="alert"
      className={cn(
        "flex w-full items-start gap-md rounded-lg border px-lg py-md text-sm font-medium",
        STYLES[variant],
      )}
    >
      <Icon className="mt-[1px] size-[18px] shrink-0" aria-hidden="true" />
      <span className="flex-1 text-left">{children}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="shrink-0 opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
