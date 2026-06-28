import { redirect } from "next/navigation";
import { AsterioLogo } from "@/components/icons/asterio-logo";
import { getMyProfile } from "@/lib/repositories/profiles";
import { LogoutButton } from "./logout-button";
import { WelcomeExperience } from "@/components/dashboard/welcome-experience";

// Protected: a session is required. The profile is read through RLS, so this
// page can only ever show the signed-in user's own data. The real broker
// workspace is built next — for now this is an empty shell with the welcome modal.
export default async function DashboardPage() {
  const profile = await getMyProfile();
  if (!profile) redirect("/signup");

  const firstName = profile.full_name?.trim().split(" ")[0] || profile.email?.split("@")[0] || "there";

  return (
    <div className="flex min-h-dvh w-full flex-col bg-secondary">
      <header className="flex items-center justify-between gap-md border-b border-secondary bg-primary px-8 py-lg">
        <div className="flex items-center gap-[10px] text-[#0a0d12]">
          <AsterioLogo className="size-7" />
          <span className="text-lg font-bold tracking-tight">Asterio</span>
        </div>
        <div className="flex items-center gap-md">
          <WelcomeExperience name={firstName} />
          <LogoutButton />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-8 py-4xl">
        <p className="text-md text-tertiary">Your workspace is being built — check back soon.</p>
      </main>
    </div>
  );
}
