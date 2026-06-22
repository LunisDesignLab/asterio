// Based on the WHATWG HTML5 email validation pattern (what browsers use for
// <input type="email">), tightened to require a dot-separated TLD of 2+ letters.
// Rejects invalid domain characters (e.g. ";") and domains without a real TLD.
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

export function isValidEmail(email: string): boolean {
  const value = email.trim();
  if (value.length === 0 || value.length > 254) return false;
  return EMAIL_RE.test(value);
}

// Common providers — used both as suggestion targets and as "known good" domains
// that should never be flagged as a typo.
const KNOWN_DOMAINS = [
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.uk",
  "hotmail.com",
  "hotmail.co.uk",
  "outlook.com",
  "live.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "msn.com",
  "mail.com",
  "gmx.com",
  "zoho.com",
  "yandex.com",
];

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

/**
 * Suggest a corrected email when the domain is a likely typo of a popular
 * provider (e.g. "adrian@gmai.com" -> "adrian@gmail.com"). Returns the full
 * corrected email, or null when there's nothing confident to suggest.
 * Advisory only — the typed value is still valid; verification is the real gate.
 */
export function suggestEmailDomain(email: string): string | null {
  const trimmed = email.trim();
  const at = trimmed.lastIndexOf("@");
  if (at < 1 || at === trimmed.length - 1) return null;

  const domain = trimmed.slice(at + 1).toLowerCase();
  if (!domain.includes(".") || KNOWN_DOMAINS.includes(domain)) return null;

  let best: string | null = null;
  let bestDistance = Infinity;
  for (const candidate of KNOWN_DOMAINS) {
    const distance = levenshtein(domain, candidate);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = candidate;
    }
  }

  if (best && bestDistance > 0 && bestDistance <= 2) {
    return `${trimmed.slice(0, at)}@${best}`;
  }
  return null;
}
