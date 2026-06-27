import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

/**
 * Service-role Supabase client. BYPASSES Row-Level Security entirely, so it is
 * server-only (the `server-only` import makes importing it from the browser a
 * build error) and must be used sparingly — only for privileged work that
 * cannot be expressed as an RLS-scoped query (e.g. admin/developer provisioning,
 * webhook handlers). Never expose its results directly to an untrusted caller.
 */
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
