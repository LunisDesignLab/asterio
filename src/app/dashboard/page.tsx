import { redirect } from "next/navigation";
import { getMyProfile } from "@/lib/repositories/profiles";

// Protected: a session is required. The profile is read through RLS, so this
// page can only ever show the signed-in user's own data.
export default async function DashboardPage() {
  const profile = await getMyProfile();
  if (!profile) redirect("/signup");

  const name = profile.full_name?.trim() || profile.email || "there";

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[640px] flex-col justify-center gap-3xl px-8 py-4xl">
      <div className="flex flex-col gap-sm">
        <h1 className="text-display-sm font-semibold tracking-[-0.02em] text-primary">
          Welcome, {name}
        </h1>
        <p className="text-md text-tertiary">
          You&apos;re signed in. This is a placeholder dashboard — the real broker
          workspace comes next.
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-xl rounded-2xl bg-secondary p-xl">
        <div className="flex flex-col gap-xxs">
          <dt className="text-sm text-tertiary">Role</dt>
          <dd className="text-md font-medium text-primary capitalize">{profile.role}</dd>
        </div>
        <div className="flex flex-col gap-xxs">
          <dt className="text-sm text-tertiary">Plan</dt>
          <dd className="text-md font-medium text-primary capitalize">{profile.plan}</dd>
        </div>
        <div className="col-span-2 flex flex-col gap-xxs">
          <dt className="text-sm text-tertiary">Email</dt>
          <dd className="text-md font-medium text-primary">{profile.email}</dd>
        </div>
      </dl>
    </main>
  );
}
