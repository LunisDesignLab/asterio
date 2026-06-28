import { redirect } from "next/navigation";
import { AppShell } from "@/components/app/app-shell";
import { getMyProfile } from "@/lib/repositories/profiles";
import { listMyGroups } from "@/lib/repositories/groups";
import { GroupsView } from "@/components/groups/groups-view";

// Protected. Groups are read through RLS, so a broker only ever sees their own.
export default async function GroupsPage() {
  const profile = await getMyProfile();
  if (!profile) redirect("/signup");

  const groups = await listMyGroups();
  return (
    <AppShell active="groups">
      <GroupsView groups={groups} plan={profile.plan} />
    </AppShell>
  );
}
