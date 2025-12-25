/*
  # Create pricing settings table

  1. New Table
    - `pricing_settings` for storing gold prices and stone price tiers
    - Tracks who updated the values and when

  2. Security
    - Enable RLS
    - Policies allow authenticated users to read and manage pricing settings

  3. Triggers
    - Keep `updated_at` in sync on every update
*/

create table if not exists pricing_settings (
  id text primary key default 'global',
  gold_yellow numeric not null default 0,
  gold_white numeric not null default 0,
  gold_rose numeric not null default 0,
  stone_tier1 numeric not null default 0,
  stone_tier2 numeric not null default 0,
  stone_tier3 numeric not null default 0,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users,
  created_at timestamptz not null default now()
);

alter table pricing_settings enable row level security;

create policy "Authenticated users can read pricing settings"
  on pricing_settings
  for select
  to authenticated
  using (true);

create policy "Authenticated users can insert pricing settings"
  on pricing_settings
  for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update pricing settings"
  on pricing_settings
  for update
  to authenticated
  using (true)
  with check (true);

create trigger set_pricing_settings_updated_at
  before update on pricing_settings
  for each row
  execute function update_updated_at_column();
