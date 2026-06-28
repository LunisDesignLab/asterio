"use server";

import { revalidatePath } from "next/cache";
import { createGroup, deleteGroups, type CreateGroupResult } from "@/lib/repositories/groups";

export async function createGroupAction(input: {
  name: string;
  description?: string;
  private_mode?: boolean;
  units_type?: string[];
  categories?: string[];
}): Promise<CreateGroupResult> {
  const result = await createGroup(input);
  if (result.ok) revalidatePath("/groups");
  return result;
}

export async function deleteGroupsAction(
  ids: string[],
): Promise<{ ok: true } | { ok: false; error: string }> {
  const result = await deleteGroups(ids);
  if (result.ok) revalidatePath("/groups");
  return result;
}
