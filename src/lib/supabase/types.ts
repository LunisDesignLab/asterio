/**
 * Hand-written DB types. Regenerate with the Supabase CLI
 * (`supabase gen types typescript`) once we wire it up, so it can never drift.
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
  preferred_languages: string[];
  created_at: string;
  updated_at: string;
};

export type BrokerProfile = {
  broker_id: string;
  company: string | null;
  rera_number: string | null;
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
          preferred_languages?: string[];
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
          preferred_languages?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      broker_profiles: {
        Row: BrokerProfile;
        Insert: {
          broker_id: string;
          company?: string | null;
          rera_number?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          broker_id?: string;
          company?: string | null;
          rera_number?: string | null;
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
