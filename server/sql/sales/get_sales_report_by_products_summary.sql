-- SELECT *
-- FROM get_sales_report_by_products_summary(
--   1,
--   20,
--   '2026-01-01 00:00:00+00',
--   '2026-01-31 00:00:00+00'
-- );

DROP FUNCTION get_sales_report_by_products_summary(
    p_page INT,
    p_limit INT,
    p_start_utc TIMESTAMPTZ,
    p_end_utc TIMESTAMPTZ,
    p_product_name TEXT ,
    p_product_category TEXT,
    p_product_subcategory TEXT,
    p_sort_by TEXT ,
    p_sort_dir TEXT 
)

CREATE OR REPLACE FUNCTION get_sales_report_by_products_summary (
  p_page INT,
  p_limit INT,
  p_start_utc TIMESTAMPTZ,
  p_end_utc TIMESTAMPTZ,
  p_product_name TEXT DEFAULT NULL,
  p_product_category TEXT DEFAULT NULL,
  p_product_subcategory TEXT DEFAULT NULL,
  p_sort_by TEXT DEFAULT 'product_name',
  p_sort_dir TEXT DEFAULT 'asc'
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
LANGUAGE sql
AS $$
SELECT
  t.product_name,
  t.category,
  t.subcategory,
  t.quantity,
  t.hpp,
  t.margin,
  t.subtotal,
  t.discount,
  t.tip,
  t.markup_percent,
  t.margin_percent,
  COUNT(*) OVER() AS total_count
FROM (
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
    (SUM(si.margin) / NULLIF(SUM(si.hpp), 0)) AS markup_percent,
    (SUM(si.margin) / NULLIF(SUM(si.subtotal), 0)) AS margin_percent
  FROM sales_items si
  JOIN products p ON p.id = si.product_id
  WHERE si.transaction_date >= p_start_utc
    AND si.transaction_date < p_end_utc
    AND (p_product_name IS NULL OR p.name ILIKE '%' || p_product_name || '%')
    AND (p_product_category IS NULL OR p.category ILIKE '%' || p_product_category || '%')
    AND (p_product_subcategory IS NULL OR p.subcategory ILIKE '%' || p_product_subcategory || '%')
  GROUP BY p.id, p.name, p.category, p.subcategory
) t
ORDER BY
  CASE WHEN p_sort_by = 'product_name' AND p_sort_dir = 'asc' THEN t.product_name END ASC,
  CASE WHEN p_sort_by = 'product_name' AND p_sort_dir = 'desc' THEN t.product_name END DESC,

  CASE WHEN p_sort_by = 'product_category' AND p_sort_dir = 'asc' THEN t.category END ASC,
  CASE WHEN p_sort_by = 'product_category' AND p_sort_dir = 'desc' THEN t.category END DESC,

  CASE WHEN p_sort_by = 'product_subcategory' AND p_sort_dir = 'asc' THEN t.subcategory END ASC,
  CASE WHEN p_sort_by = 'product_subcategory' AND p_sort_dir = 'desc' THEN t.subcategory END DESC,

  CASE WHEN p_sort_by = 'quantity' AND p_sort_dir = 'asc' THEN t.quantity END ASC,
  CASE WHEN p_sort_by = 'quantity' AND p_sort_dir = 'desc' THEN t.quantity END DESC,

  CASE WHEN p_sort_by = 'hpp' AND p_sort_dir = 'asc' THEN t.hpp END ASC,
  CASE WHEN p_sort_by = 'hpp' AND p_sort_dir = 'desc' THEN t.hpp END DESC,

  CASE WHEN p_sort_by = 'margin' AND p_sort_dir = 'asc' THEN t.margin END ASC,
  CASE WHEN p_sort_by = 'margin' AND p_sort_dir = 'desc' THEN t.margin END DESC,

  CASE WHEN p_sort_by = 'subtotal' AND p_sort_dir = 'asc' THEN t.subtotal END ASC,
  CASE WHEN p_sort_by = 'subtotal' AND p_sort_dir = 'desc' THEN t.subtotal END DESC,

  CASE WHEN p_sort_by = 'tip' AND p_sort_dir = 'asc' THEN t.tip END ASC,
  CASE WHEN p_sort_by = 'tip' AND p_sort_dir = 'desc' THEN t.tip END DESC,

  CASE WHEN p_sort_by = 'markup_percent' AND p_sort_dir = 'asc' THEN t.markup_percent END ASC,
  CASE WHEN p_sort_by = 'markup_percent' AND p_sort_dir = 'desc' THEN t.markup_percent END DESC,

  CASE WHEN p_sort_by = 'margin_percent' AND p_sort_dir = 'asc' THEN t.margin_percent END ASC,
  CASE WHEN p_sort_by = 'margin_percent' AND p_sort_dir = 'desc' THEN t.margin_percent END DESC

LIMIT GREATEST(p_limit, 1)
OFFSET GREATEST((p_page - 1) * p_limit, 0);
$$;
