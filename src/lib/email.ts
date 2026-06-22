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
