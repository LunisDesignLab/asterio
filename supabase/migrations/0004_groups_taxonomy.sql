-- Asterio — extend groups to match the Figma create form: a thumbnail and the
-- fixed Units type / Categories taxonomies. Idempotent.

alter table public.groups
  add column if not exists thumbnail_url text,
  add column if not exists units_type    text[] not null default '{}',
  add column if not exists categories     text[] not null default '{}';

notify pgrst, 'reload schema';
