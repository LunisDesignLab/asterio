/**
 * Hand-written DB types for the first vertical slice (profiles only).
 * Once the Supabase project exists we regenerate this with the Supabase CLI
 * (`supabase gen types typescript`) so it can never drift from the schema.
 */

export type UserRole = "developer" | "broker" | "investor";
export type Plan = "free" | "plus" | "pro";

export type Profile = {
  id: string;
  role: UserRole;
  plan: Plan;
  email: string | null;
  phone: string | null;
  full_name: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          role: UserRole;
          plan?: Plan;
          email?: string | null;
          phone?: string | null;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: UserRole;
          plan?: Plan;
          email?: string | null;
          phone?: string | null;
          full_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: {
      user_role: UserRole;
      plan: Plan;
    };
    CompositeTypes: Record<never, never>;
  };
};
