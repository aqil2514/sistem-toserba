select *
from get_purchase_report_detail(
  10,
  1,
  '2026-01-01',
  '2026-02-01'
);


CREATE OR REPLACE FUNCTION get_purchase_report_detail(
  -- PAGINATION
  p_limit NUMERIC,
  p_page NUMERIC,

  -- TIME
  p_start_utc TIMESTAMPTZ,
  p_end_utc TIMESTAMPTZ,

  -- FILTERS
  p_filters JSONB DEFAULT '[]'::jsonb,
  p_sortings JSONB DEFAULT '[]'::jsonb
)
RETURNS TABLE(
  purchase_date TIMESTAMP,
  purchase_code TEXT,
  supplier_name TEXT,
  supplier_type TEXT,
  product_name TEXT,
  product_category TEXT,
  product_subcategory TEXT,
  quantity BIGINT,
  remaining_quantity BIGINT,
  price NUMERIC,
  hpp NUMERIC,
  total_count BIGINT
)
LANGUAGE plpgsql
STABLE AS
$$
DECLARE
  sql TEXT := '
select 
  pur.purchase_date,
  pur.purchase_code,
  pur.supplier_name,
  pur.supplier_type,
  prod.name as product_name,
  prod.category as product_category,
  prod.subcategory as product_subcategory,
  pi.quantity::bigint as quantity,
  pi.remaining_quantity::bigint as remaining_quantity,
  pi.price,
  pi.hpp,
  count(*) over() as total_count
  from purchase_items pi
  join purchases pur on pur.id = pi.purchase_id 
  join products prod on prod.id = pi.product_id
  where 
  pi.deleted_at is null
  and pur.purchase_date >= $1
  and pur.purchase_date < $2
';
BEGIN

-- FILTERS
  sql := sql || generate_jsonb_filters(p_filters);

-- SORTING
  sql := sql || generate_jsonb_sorting(p_sortings);

-- PAGINATION
  sql := sql || generate_pagination(p_limit, p_page);

-- EKSEKUSI
  RETURN QUERY EXECUTE sql USING p_start_utc, p_end_utc;
END;
$$