-- Asterio — vertical slice #1: accounts foundation.
-- A `profiles` row per authenticated user, created automatically on signup,
-- isolated by Row-Level Security. RLS is the security boundary, not the UI.
--
-- Idempotent: safe to re-run. The project has "Automatically expose new tables"
-- OFF, so Data API privileges are NOT auto-granted — we grant them explicitly to
-- the roles that need them (authenticated under RLS, service_role for admin),
-- and never to anon.

-- ── Enums ────────────────────────────────────────────────────────────────────
do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('developer', 'broker', 'investor');
  end if;
  if not exists (select 1 from pg_type where typname = 'plan') then
    create type public.plan as enum ('free', 'plus', 'pro');
  end if;
end $$;

-- ── profiles ─────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  role       public.user_role not null,
  plan       public.plan      not null default 'free',
  email      text,
  phone      text,
  full_name  text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS reads `id` (the primary key, already indexed). `role` is indexed now
-- because broker/investor discovery will filter on it in later slices.
create index if not exists profiles_role_idx on public.profiles (role);

-- ── Row-Level Security ───────────────────────────────────────────────────────
alter table public.profiles enable row level security;

-- A user can read only their own profile.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

-- A user can update only their own profile. (Role/plan are changed by the
-- server with the service role or via Stripe webhooks, never by the client —
-- a later migration will lock those columns down with a trigger.)
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- No INSERT/DELETE policy on purpose: inserts happen through the signup trigger
-- below (SECURITY DEFINER), and account removal is a soft-delete handled
-- server-side. Without a permissive policy, clients cannot insert or delete.

-- ── Data API grants ──────────────────────────────────────────────────────────
-- "Automatically expose new tables" is OFF, so grant explicitly:
--   authenticated → SELECT/UPDATE (RLS narrows it to the user's own row)
--   service_role  → full access for privileged server-side work
--   anon          → nothing (profiles are never readable signed-out)
grant select, update on public.profiles to authenticated;
grant all on public.profiles to service_role;

-- ── Auto-create a profile on signup ──────────────────────────────────────────
-- The role is taken from the signUp metadata (raw_user_meta_data.role) and
-- defaults to 'broker'. SECURITY DEFINER lets the trigger bypass RLS to insert.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, role, email)
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'role', '')::public.user_role,
      'broker'
    ),
    new.email
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ── Keep updated_at honest ───────────────────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row
  execute function public.touch_updated_at();

-- Make PostgREST pick up the new table/grants immediately.
notify pgrst, 'reload schema';
