create or replace function get_purchase_product_summary(
  p_start_utc timestamptz,
  p_end_utc timestamptz
)
returns table(
  total_price numeric,
  total_transaction bigint,
  buy_average numeric
)
language sql
stable as
$$
with base as (
  select
    sum(pi.price) as total_price,
    count(distinct pi.purchase_id) as total_transaction
  from purchase_items pi
  join purchases pu on pu.id = pi.purchase_id
  where 
    pi.deleted_at is null
    and pu.purchase_date >= p_start_utc
    and pu.purchase_date < p_end_utc
)
select
  coalesce(total_price, 0),
  total_transaction,
  case
    when total_transaction = 0 then 0
    else total_price / total_transaction
  end
from base;
$$;
