import { scorePassword } from "@/lib/password-strength";

// Weak → Strong
const COLORS = ["", "#f04438", "#f79009", "#84cc16", "#17b26a"];

export function PasswordStrength({ password }: { password: string }) {
  const { score, label } = scorePassword(password);
  if (score === 0) return null;

  return (
    <div className="flex flex-col gap-xs" aria-live="polite">
      <div className="flex gap-xs">
        {[1, 2, 3, 4].map((segment) => (
          <span
            key={segment}
            className="h-1.5 flex-1 rounded-full transition-colors"
            style={{ backgroundColor: segment <= score ? COLORS[score] : "#e9eaeb" }}
          />
        ))}
      </div>
      <span className="text-sm" style={{ color: COLORS[score] }}>
        {label} password
      </span>
    </div>
  );
}
