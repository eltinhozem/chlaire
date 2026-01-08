/*
  # Create user_profiles (email -> display name)

  Stores a friendly display name for each user email so the app can show
  "Olá, <Nome>" after login and allow adding new mappings.
*/

-- Ensure helper trigger function exists (also used in other migrations)
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language 'plpgsql';

create table if not exists public.user_profiles (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  display_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_profiles enable row level security;

drop policy if exists "Authenticated users can read user_profiles" on public.user_profiles;
create policy "Authenticated users can read user_profiles"
  on public.user_profiles
  for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can insert user_profiles" on public.user_profiles;
create policy "Authenticated users can insert user_profiles"
  on public.user_profiles
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update user_profiles" on public.user_profiles;
create policy "Authenticated users can update user_profiles"
  on public.user_profiles
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete user_profiles" on public.user_profiles;
create policy "Authenticated users can delete user_profiles"
  on public.user_profiles
  for delete
  to authenticated
  using (true);

drop trigger if exists set_user_profiles_updated_at on public.user_profiles;
create trigger set_user_profiles_updated_at
  before update on public.user_profiles
  for each row
  execute function public.update_updated_at_column();

insert into public.user_profiles (email, display_name)
values
  ('hu.abreu@hotmail.com', 'Hugo'),
  ('eltonmoura2015@gmail.com', 'Elton'),
  ('eltonmoura2019@gmail.com', 'Elton'),
  ('heloisemoraes4@gmail.com', 'Heloise'),
  ('chlaire.joias@gmail.com', 'Loja')
on conflict (email) do update
set display_name = excluded.display_name;

