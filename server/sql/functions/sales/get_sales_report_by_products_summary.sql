CREATE OR REPLACE FUNCTION get_sales_report_by_products_summary (
  p_limit NUMERIC,
  p_page NUMERIC,
  p_start_utc TIMESTAMPTZ,
  p_end_utc TIMESTAMPTZ,
  p_filters JSONB DEFAULT '[]'::jsonb,
  p_sortings JSONB DEFAULT '[]'::jsonb
)
RETURNS TABLE (
  product_name TEXT,
  category TEXT,
  subcategory TEXT,
  quantity INT,
  hpp NUMERIC,
  margin NUMERIC,
  subtotal NUMERIC,
  discount NUMERIC,
  tip NUMERIC,
  markup_percent NUMERIC,
  margin_percent NUMERIC,
  total_count BIGINT
)
LANGUAGE plpgsql
STABLE
AS $$
DECLARE 
  sql TEXT;
BEGIN

sql := '
WITH base AS (
  SELECT 
      p.name AS product_name,
      p.category,
      p.subcategory,
      SUM(si.quantity)::INT AS quantity,
      SUM(si.hpp) AS hpp,
      SUM(si.margin) AS margin,
      SUM(si.subtotal) AS subtotal,
      SUM(si.discount) AS discount,
      SUM(si.tip) AS tip,
      COALESCE(SUM(si.margin) / NULLIF(SUM(si.hpp), 0), 0) AS markup_percent,
      COALESCE(SUM(si.margin) / NULLIF(SUM(si.subtotal), 0), 0) AS margin_percent
  FROM sales_items si
  JOIN products p ON p.id = si.product_id
  WHERE si.transaction_date BETWEEN $1 AND $2
  GROUP BY p.id, p.name, p.category, p.subcategory
)

SELECT 
  b.*,
  COUNT(*) OVER() AS total_count
FROM base b
WHERE 1 = 1
';

  -- FILTERS
  sql := sql || generate_jsonb_filters(p_filters);

  -- SORTING
  sql := sql || generate_jsonb_sorting(p_sortings);

  -- PAGINATION
  sql := sql || generate_pagination(p_limit, p_page);

  RETURN QUERY EXECUTE sql USING p_start_utc, p_end_utc;

END;
$$;