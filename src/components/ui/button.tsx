import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
}

// shadow-xs + UntitledUI skeuomorphic inner border/highlight
const skeuomorphic =
  "shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05)]";

export function Button({
  variant = "primary",
  fullWidth,
  leftIcon,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-sm rounded-full px-[18px] py-lg text-md font-semibold whitespace-nowrap transition-[filter,background-color] disabled:cursor-not-allowed disabled:opacity-60",
        skeuomorphic,
        fullWidth && "w-full",
        variant === "primary" &&
          "border-2 border-white/[0.12] bg-[linear-gradient(90deg,#6141b0_0%,#7f56d9_100%)] text-white hover:brightness-[0.96]",
        variant === "secondary" &&
          "border border-primary bg-primary text-secondary hover:bg-secondary",
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children}
    </button>
  );
}
