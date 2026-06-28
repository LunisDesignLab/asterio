-- Asterio — vertical slice: investor groups.
-- Owner-only by RLS (a broker never sees another broker's groups, invariant #1).
-- The per-plan group cap is enforced at the DB layer — the UI cap is convenience.
-- Idempotent: safe to re-run.

create table if not exists public.groups (
  id           uuid primary key default gen_random_uuid(),
  broker_id    uuid not null references public.profiles (id) on delete cascade,
  name         text not null,
  description  text,
  private_mode boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists groups_broker_id_idx on public.groups (broker_id);

alter table public.groups enable row level security;

drop policy if exists "groups_select_own" on public.groups;
create policy "groups_select_own"
  on public.groups for select to authenticated
  using (auth.uid() = broker_id);

drop policy if exists "groups_insert_own" on public.groups;
create policy "groups_insert_own"
  on public.groups for insert to authenticated
  with check (auth.uid() = broker_id);

drop policy if exists "groups_update_own" on public.groups;
create policy "groups_update_own"
  on public.groups for update to authenticated
  using (auth.uid() = broker_id)
  with check (auth.uid() = broker_id);

drop policy if exists "groups_delete_own" on public.groups;
create policy "groups_delete_own"
  on public.groups for delete to authenticated
  using (auth.uid() = broker_id);

grant select, insert, update, delete on public.groups to authenticated;
grant all on public.groups to service_role;

-- Enforce the per-plan group cap at insert time. SECURITY DEFINER so it can read
-- the owner's plan regardless of RLS. Keep these caps in sync with
-- src/lib/plan-limits.ts.
create or replace function public.enforce_group_limit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  user_plan     public.plan;
  max_groups    integer;
  current_count integer;
begin
  select plan into user_plan from public.profiles where id = new.broker_id;
  max_groups := case user_plan
    when 'free' then 1
    when 'plus' then 5
    when 'pro'  then 25
    else 1
  end;

  select count(*) into current_count from public.groups where broker_id = new.broker_id;
  if current_count >= max_groups then
    raise exception 'group_limit_reached'
      using errcode = 'check_violation', hint = 'Upgrade your plan to create more groups.';
  end if;

  return new;
end;
$$;

drop trigger if exists enforce_group_limit on public.groups;
create trigger enforce_group_limit
  before insert on public.groups
  for each row execute function public.enforce_group_limit();

drop trigger if exists groups_touch_updated_at on public.groups;
create trigger groups_touch_updated_at
  before update on public.groups
  for each row execute function public.touch_updated_at();

notify pgrst, 'reload schema';
