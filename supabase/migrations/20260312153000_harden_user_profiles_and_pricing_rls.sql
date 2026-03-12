/*
  # Harden RLS for user_profiles and pricing_settings

  - Adds role-based authorization to user_profiles
  - Creates helper functions for current user email and admin check
  - Restricts write access on sensitive tables to admins only
*/

-- 1) user_profiles: add role column and backfill current admins
alter table public.user_profiles
  add column if not exists role text not null default 'user';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'user_profiles_role_check'
      and conrelid = 'public.user_profiles'::regclass
  ) then
    alter table public.user_profiles
      add constraint user_profiles_role_check
      check (role in ('admin', 'user'));
  end if;
end $$;

update public.user_profiles
set role = 'admin'
where lower(email) in ('eltonmoura2015@gmail.com', 'eltonmoura2019@gmail.com')
   or lower(display_name) = 'elton';

-- 2) Helper functions used by policies
create or replace function public.current_user_email()
returns text
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', ''))
$$;

create or replace function public.is_admin()
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_email text;
begin
  v_email := public.current_user_email();

  if v_email = '' then
    return false;
  end if;

  return exists (
    select 1
    from public.user_profiles up
    where lower(up.email) = v_email
      and up.role = 'admin'
  );
end;
$$;

revoke all on function public.is_admin() from public;
revoke all on function public.current_user_email() from public;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.current_user_email() to authenticated;

-- 3) user_profiles policies: only admin writes; users can read own row
alter table public.user_profiles enable row level security;

drop policy if exists "Authenticated users can read user_profiles" on public.user_profiles;
drop policy if exists "Authenticated users can insert user_profiles" on public.user_profiles;
drop policy if exists "Authenticated users can update user_profiles" on public.user_profiles;
drop policy if exists "Authenticated users can delete user_profiles" on public.user_profiles;

create policy "Users can read own profile or admin can read all"
  on public.user_profiles
  for select
  to authenticated
  using (
    public.is_admin()
    or lower(email) = public.current_user_email()
  );

create policy "Admins can insert user_profiles"
  on public.user_profiles
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update user_profiles"
  on public.user_profiles
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete user_profiles"
  on public.user_profiles
  for delete
  to authenticated
  using (public.is_admin());

-- 4) pricing_settings policies: authenticated read; admin write
alter table public.pricing_settings enable row level security;

drop policy if exists "Authenticated users can read pricing settings" on public.pricing_settings;
drop policy if exists "Authenticated users can insert pricing settings" on public.pricing_settings;
drop policy if exists "Authenticated users can update pricing settings" on public.pricing_settings;
drop policy if exists "Authenticated users can delete pricing settings" on public.pricing_settings;

create policy "Authenticated users can read pricing settings"
  on public.pricing_settings
  for select
  to authenticated
  using (true);

create policy "Admins can insert pricing settings"
  on public.pricing_settings
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update pricing settings"
  on public.pricing_settings
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete pricing settings"
  on public.pricing_settings
  for delete
  to authenticated
  using (public.is_admin());
