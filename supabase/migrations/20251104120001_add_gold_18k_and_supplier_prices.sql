/*
  # Add gold_18k and supplier_prices columns

  - Adds a specific column for ouro 18K
  - Adds a JSONB column to persist supplier price tables
  - Keeps default row id as 'global' for singleton usage
*/

alter table pricing_settings
  add column if not exists gold_18k numeric not null default 0,
  add column if not exists supplier_prices jsonb not null default '{}'::jsonb;

comment on column pricing_settings.gold_18k is 'Preço padrão do ouro 18K (R$/g)';
comment on column pricing_settings.supplier_prices is 'Tabela de preços por fornecedor (JSON)';
