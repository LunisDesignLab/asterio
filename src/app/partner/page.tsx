import Link from "next/link";

// Placeholder — the developer "Partner with Asterio" page is built later.
// Developers are onboarded manually (no self-signup).
export default function PartnerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-xl bg-secondary px-4xl text-center">
      <div className="flex flex-col gap-sm">
        <h1 className="text-display-md font-semibold tracking-[-0.72px] text-primary">
          Partner with Asterio
        </h1>
        <p className="max-w-[480px] text-md text-tertiary">
          Developer onboarding is handled directly by our team. This page is coming soon.
        </p>
      </div>
      <Link href="/signup" className="text-sm font-semibold text-brand-secondary">
        ← Back to sign up
      </Link>
    </main>
  );
}
