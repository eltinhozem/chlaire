/*
  # Add margin and dollar_stone columns

  - margin: multiplicador aplicado ao ouro e às pedras
  - dollar_stone: multiplicador aplicado nas pedras antes da margem
*/

alter table pricing_settings
  add column if not exists margin numeric not null default 1,
  add column if not exists dollar_stone numeric not null default 1;

comment on column pricing_settings.margin is 'Multiplicador aplicado ao preço final';
comment on column pricing_settings.dollar_stone is 'Multiplicador em dólar aplicado no cálculo das pedras';
