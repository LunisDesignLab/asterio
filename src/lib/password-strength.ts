export type StrengthScore = 0 | 1 | 2 | 3 | 4; // 0 = empty

export interface PasswordStrength {
  score: StrengthScore;
  label: string;
}

const LABELS = ["", "Weak", "Fair", "Good", "Strong"] as const;

/**
 * Lightweight, advisory password-strength estimate (length + character variety).
 * Not a security gate — the hard rule is min 8 chars; breached-password checks
 * (HIBP) land in Phase B. Swap for zxcvbn-ts later if smarter scoring is wanted.
 */
export function scorePassword(password: string): PasswordStrength {
  if (!password) return { score: 0, label: "" };

  let points = 0;
  if (password.length >= 8) points += 1;
  if (password.length >= 12) points += 1;

  const classes = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((re) =>
    re.test(password),
  ).length;
  if (classes >= 2) points += 1;
  if (classes >= 3 && password.length >= 10) points += 1;

  // Anything under the 8-char minimum can never read above "Weak".
  if (password.length < 8) points = Math.min(points, 1);

  const score = Math.max(1, Math.min(points, 4)) as StrengthScore;
  return { score, label: LABELS[score] };
}
