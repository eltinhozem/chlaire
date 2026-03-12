/*
  # Enforce secure RLS and server-side data constraints

  - Removes permissive/duplicated policies
  - Recreates least-privilege policies (owner/admin where possible)
  - Hardens storage access for private buckets
  - Adds defensive constraints for sensitive fields
*/

-- Ensure role metadata exists for admin checks
alter table if exists public.user_profiles
  add column if not exists role text not null default 'user';

do $$
begin
  if exists (
    select 1
    from information_schema.tables
    where table_schema = 'public'
      and table_name = 'user_profiles'
  ) and not exists (
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

-- Remove all policies from targeted public tables to avoid OR-bypass
do $$
declare
  t text;
  p record;
begin
  foreach t in array array['clientes','collections','jewelry','pedidos','pricing_settings','user_profiles']
  loop
    if exists (
      select 1
      from pg_tables
      where schemaname = 'public'
        and tablename = t
    ) then
      execute format('alter table public.%I enable row level security', t);
      execute format('alter table public.%I force row level security', t);

      for p in
        select policyname
        from pg_policies
        where schemaname = 'public'
          and tablename = t
      loop
        execute format('drop policy if exists %I on public.%I', p.policyname, t);
      end loop;
    end if;
  end loop;
end $$;

-- jewelry: owner-only access
create policy "jewelry_select_own"
  on public.jewelry
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "jewelry_insert_own"
  on public.jewelry
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "jewelry_update_own"
  on public.jewelry
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "jewelry_delete_own"
  on public.jewelry
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- pedidos: owner-only access
create policy "pedidos_select_own"
  on public.pedidos
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "pedidos_insert_own"
  on public.pedidos
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "pedidos_update_own"
  on public.pedidos
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "pedidos_delete_own"
  on public.pedidos
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- clientes / collections: owner-only if user_id exists, fallback to authenticated
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'clientes' and column_name = 'user_id'
  ) then
    execute $q$
      create policy "clientes_select_own"
      on public.clientes for select to authenticated
      using (auth.uid() = user_id)
    $q$;
    execute $q$
      create policy "clientes_insert_own"
      on public.clientes for insert to authenticated
      with check (auth.uid() = user_id)
    $q$;
    execute $q$
      create policy "clientes_update_own"
      on public.clientes for update to authenticated
      using (auth.uid() = user_id) with check (auth.uid() = user_id)
    $q$;
    execute $q$
      create policy "clientes_delete_own"
      on public.clientes for delete to authenticated
      using (auth.uid() = user_id)
    $q$;
  else
    execute $q$
      create policy "clientes_select_authenticated"
      on public.clientes for select to authenticated using (true)
    $q$;
    execute $q$
      create policy "clientes_insert_authenticated"
      on public.clientes for insert to authenticated with check (true)
    $q$;
    execute $q$
      create policy "clientes_update_authenticated"
      on public.clientes for update to authenticated using (true) with check (true)
    $q$;
    execute $q$
      create policy "clientes_delete_authenticated"
      on public.clientes for delete to authenticated using (true)
    $q$;
  end if;
end $$;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'collections' and column_name = 'user_id'
  ) then
    execute $q$
      create policy "collections_select_own"
      on public.collections for select to authenticated
      using (auth.uid() = user_id)
    $q$;
    execute $q$
      create policy "collections_insert_own"
      on public.collections for insert to authenticated
      with check (auth.uid() = user_id)
    $q$;
    execute $q$
      create policy "collections_update_own"
      on public.collections for update to authenticated
      using (auth.uid() = user_id) with check (auth.uid() = user_id)
    $q$;
    execute $q$
      create policy "collections_delete_own"
      on public.collections for delete to authenticated
      using (auth.uid() = user_id)
    $q$;
  else
    execute $q$
      create policy "collections_select_authenticated"
      on public.collections for select to authenticated using (true)
    $q$;
    execute $q$
      create policy "collections_insert_authenticated"
      on public.collections for insert to authenticated with check (true)
    $q$;
    execute $q$
      create policy "collections_update_authenticated"
      on public.collections for update to authenticated using (true) with check (true)
    $q$;
    execute $q$
      create policy "collections_delete_authenticated"
      on public.collections for delete to authenticated using (true)
    $q$;
  end if;
end $$;

-- pricing_settings: authenticated read, admin write
create policy "pricing_settings_select_authenticated"
  on public.pricing_settings
  for select
  to authenticated
  using (true);

create policy "pricing_settings_insert_admin"
  on public.pricing_settings
  for insert
  to authenticated
  with check (public.is_admin());

create policy "pricing_settings_update_admin"
  on public.pricing_settings
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "pricing_settings_delete_admin"
  on public.pricing_settings
  for delete
  to authenticated
  using (public.is_admin());

-- user_profiles: self-read or admin-read, admin write
create policy "user_profiles_select_self_or_admin"
  on public.user_profiles
  for select
  to authenticated
  using (public.is_admin() or lower(email) = public.current_user_email());

create policy "user_profiles_insert_admin"
  on public.user_profiles
  for insert
  to authenticated
  with check (public.is_admin());

create policy "user_profiles_update_admin"
  on public.user_profiles
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "user_profiles_delete_admin"
  on public.user_profiles
  for delete
  to authenticated
  using (public.is_admin());

-- storage hardening for private buckets
update storage.buckets
set public = false
where id in ('jewelry-images', 'pedidos-images');

drop policy if exists "Anyone can view jewelry images" on storage.objects;
drop policy if exists "Anyone can view pedidos images" on storage.objects;
drop policy if exists "Authenticated users can upload jewelry images" on storage.objects;
drop policy if exists "Authenticated users can upload pedidos images" on storage.objects;
drop policy if exists "Authenticated users can update their jewelry images" on storage.objects;
drop policy if exists "Authenticated users can update their pedidos images" on storage.objects;
drop policy if exists "auth_storage_select" on storage.objects;
drop policy if exists "auth_storage_insert" on storage.objects;
drop policy if exists "auth_storage_update" on storage.objects;
drop policy if exists "auth_storage_delete" on storage.objects;
drop policy if exists "Users can read own jewelry images or admin" on storage.objects;
drop policy if exists "Users can upload own jewelry images or admin" on storage.objects;
drop policy if exists "Users can update own jewelry images or admin" on storage.objects;
drop policy if exists "Users can delete own jewelry images or admin" on storage.objects;

create policy "storage_select_owner_or_admin"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id in ('jewelry-images', 'pedidos-images')
    and (owner = auth.uid() or public.is_admin())
  );

create policy "storage_insert_owner_or_admin"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id in ('jewelry-images', 'pedidos-images')
    and (owner = auth.uid() or public.is_admin())
  );

create policy "storage_update_owner_or_admin"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id in ('jewelry-images', 'pedidos-images')
    and (owner = auth.uid() or public.is_admin())
  )
  with check (
    bucket_id in ('jewelry-images', 'pedidos-images')
    and (owner = auth.uid() or public.is_admin())
  );

create policy "storage_delete_owner_or_admin"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id in ('jewelry-images', 'pedidos-images')
    and (owner = auth.uid() or public.is_admin())
  );

-- Server-side constraints (NOT VALID to avoid breaking existing historical rows)
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='jewelry' and column_name='rota'
  ) and not exists (
    select 1 from pg_constraint
    where conname='jewelry_rota_format_check'
      and conrelid='public.jewelry'::regclass
  ) then
    alter table public.jewelry
      add constraint jewelry_rota_format_check
      check (rota is null or rota ~ '^[0-9]{2}-[0-9]{2}$') not valid;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='pedidos' and column_name='prioridade'
  ) and not exists (
    select 1 from pg_constraint
    where conname='pedidos_prioridade_positive_check'
      and conrelid='public.pedidos'::regclass
  ) then
    alter table public.pedidos
      add constraint pedidos_prioridade_positive_check
      check (prioridade is null or prioridade >= 1) not valid;
  end if;
end $$;
