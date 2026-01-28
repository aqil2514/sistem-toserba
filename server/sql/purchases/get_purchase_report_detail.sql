select *
from get_purchase_report_detail(
  10,
  1,
  '2026-01-01',
  '2026-02-01'
);


create or replace function get_purchase_report_detail(
  -- PAGINATION
  p_limit numeric,
  p_page numeric,

  -- FILTER
  p_start_utc timestamptz,
  p_end_utc timestamptz
)
returns table(
  purchase_date timestamptz,
  purchase_code text,
  supplier_name text,
  supplier_type text,
  product_name text,
  product_category text,
  product_subcategory text,
  quantity bigint,
  remaining_quantity bigint,
  price numeric,
  hpp numeric,
  total_count bigint
)
language sql
stable as
$$
select 
  pur.purchase_date,
  pur.purchase_code,
  pur.supplier_name,
  pur.supplier_type,
  prod.name as product_name,
  prod.category as product_category,
  prod.subcategory as product_subcategory,
  pi.quantity,
  pi.remaining_quantity,
  pi.price,
  pi.hpp,
  count(*) over() as total_count
from purchase_items pi
join purchases pur on pur.id = pi.purchase_id 
join products prod on prod.id = pi.product_id
where 
  pi.deleted_at is null
  and pur.purchase_date >= p_start_utc
  and pur.purchase_date < p_end_utc
limit greatest(p_limit, 1)
offset greatest((p_page - 1) * p_limit, 0)  
$$