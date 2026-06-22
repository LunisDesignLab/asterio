import { scorePassword } from "@/lib/password-strength";

// Weak → Strong
const COLORS = ["", "#f04438", "#f79009", "#84cc16", "#17b26a"];

export function PasswordStrength({ password }: { password: string }) {
  const { score, label } = scorePassword(password);

  return (
    <div className="flex flex-col gap-sm">
      <div className="flex gap-xs">
        {[1, 2, 3, 4].map((segment) => (
          <span
            key={segment}
            className="h-1.5 flex-1 rounded-full transition-colors"
            style={{ backgroundColor: segment <= score ? COLORS[score] : "#e9eaeb" }}
          />
        ))}
      </div>
      {/* Fixed row so the strength word never shifts content */}
      <div className="flex items-center justify-between gap-md">
        <span className="text-sm text-tertiary">Minimum 8 characters required.</span>
        <span
          className="text-sm font-medium"
          style={{ color: score > 0 ? COLORS[score] : undefined }}
          aria-live="polite"
        >
          {score > 0 ? label : ""}
        </span>
      </div>
    </div>
  );
}
