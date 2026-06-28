-- Asterio — vertical slice #2: broker professional profile + shared language pref.
-- Idempotent: safe to re-run.

-- Shared across roles: preferred languages on the base profile.
alter table public.profiles
  add column if not exists preferred_languages text[] not null default '{}';

-- Broker-specific professional details, 1:1 with profiles. Owner-only — a broker
-- can never see another broker's row (visibility invariant #1: brokers never see
-- other brokers). Investor/developer role data gets its own tables later.
create table if not exists public.broker_profiles (
  broker_id   uuid primary key references public.profiles (id) on delete cascade,
  company     text,
  rera_number text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.broker_profiles enable row level security;

-- A broker reads / writes only their own row.
drop policy if exists "broker_profiles_select_own" on public.broker_profiles;
create policy "broker_profiles_select_own"
  on public.broker_profiles for select to authenticated
  using (auth.uid() = broker_id);

drop policy if exists "broker_profiles_insert_own" on public.broker_profiles;
create policy "broker_profiles_insert_own"
  on public.broker_profiles for insert to authenticated
  with check (auth.uid() = broker_id);

drop policy if exists "broker_profiles_update_own" on public.broker_profiles;
create policy "broker_profiles_update_own"
  on public.broker_profiles for update to authenticated
  using (auth.uid() = broker_id)
  with check (auth.uid() = broker_id);

-- Data API grants ("auto-expose new tables" is off — grant explicitly).
grant select, insert, update on public.broker_profiles to authenticated;
grant all on public.broker_profiles to service_role;

-- Reuse the updated_at trigger function from migration 0001.
drop trigger if exists broker_profiles_touch_updated_at on public.broker_profiles;
create trigger broker_profiles_touch_updated_at
  before update on public.broker_profiles
  for each row execute function public.touch_updated_at();

notify pgrst, 'reload schema';
