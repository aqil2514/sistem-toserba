CREATE OR REPLACE FUNCTION get_sales_report_summary(
  p_start_utc TIMESTAMPTZ,
  p_end_utc   TIMESTAMPTZ,
  p_buyer TEXT DEFAULT NULL,
  p_payment_method TEXT DEFAULT NULL,
  p_product_name TEXT DEFAULT NULL,
  p_product_category TEXT DEFAULT NULL,
  p_product_subcategory TEXT DEFAULT NULL
)
RETURNS TABLE (
  omzet numeric,
  hpp numeric,
  margin numeric,
  margin_percent numeric,
  markup_percent numeric,
  total_transaction bigint
)
LANGUAGE sql
STABLE
AS $$
SELECT
  COALESCE(SUM(si.subtotal) + SUM(si.tip) - SUM(si.discount) , 0) AS omzet,
  COALESCE(SUM(si.hpp), 0) AS hpp,
  COALESCE(SUM(si.margin), 0) AS margin,
  COALESCE(SUM(si.margin) / NULLIF(SUM(si.subtotal), 0), 0) AS margin_percent,
  COALESCE(SUM(si.margin) / NULLIF(SUM(si.hpp), 0), 0) AS markup_percent,
  COUNT(DISTINCT si.sales_id) AS total_transaction
FROM sales_items si
JOIN sales s ON s.id = si.sales_id
JOIN products p on p.id = si.product_id
WHERE si.transaction_date >= p_start_utc
  AND si.transaction_date < p_end_utc
  AND (p_buyer IS NULL OR s.customer_name ILIKE '%' || p_buyer || '%')
  AND (p_payment_method IS NULL OR s.payment_method ILIKE '%' || p_payment_method || '%')
  AND (p_product_name IS NULL OR p.name ILIKE '%' || p_product_name || '%')
  AND (p_product_category IS NULL OR p.category ILIKE '%' || p_product_category || '%')
  AND (p_product_subcategory IS NULL OR p.subcategory ILIKE '%' || p_product_subcategory || '%')
  AND si.deleted_at IS NULL
$$;
