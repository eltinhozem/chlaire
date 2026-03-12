/*
  # Harden storage RLS for jewelry-images bucket

  - Turns bucket private (no anonymous/public read)
  - Restricts storage.objects access to authenticated owner or admin
*/

update storage.buckets
set public = false
where id = 'jewelry-images';

drop policy if exists "Anyone can view jewelry images" on storage.objects;
drop policy if exists "Authenticated users can upload jewelry images" on storage.objects;
drop policy if exists "Authenticated users can update their jewelry images" on storage.objects;
drop policy if exists "Users can read own jewelry images or admin" on storage.objects;
drop policy if exists "Users can upload own jewelry images or admin" on storage.objects;
drop policy if exists "Users can update own jewelry images or admin" on storage.objects;
drop policy if exists "Users can delete own jewelry images or admin" on storage.objects;

create policy "Users can read own jewelry images or admin"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'jewelry-images'
    and (
      owner = auth.uid()
      or public.is_admin()
    )
  );

create policy "Users can upload own jewelry images or admin"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'jewelry-images'
    and (
      owner = auth.uid()
      or public.is_admin()
    )
  );

create policy "Users can update own jewelry images or admin"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'jewelry-images'
    and (
      owner = auth.uid()
      or public.is_admin()
    )
  )
  with check (
    bucket_id = 'jewelry-images'
    and (
      owner = auth.uid()
      or public.is_admin()
    )
  );

create policy "Users can delete own jewelry images or admin"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'jewelry-images'
    and (
      owner = auth.uid()
      or public.is_admin()
    )
  );
