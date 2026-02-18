CREATE OR REPLACE FUNCTION get_per_product_sales(
  p_start_utc TIMESTAMPTZ,
  p_end_utc TIMESTAMPTZ,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  product_id UUID,
  label TEXT,
  total_quantity BIGINT,
  total_revenue NUMERIC,
  total_margin NUMERIC
)
LANGUAGE sql
SECURITY DEFINER
AS $$
SELECT 
  p.id AS product_id,
  p.name AS label,
  SUM(si.quantity) AS total_quantity,
  COALESCE(SUM(si.subtotal), 0) AS total_revenue,
  COALESCE(SUM(si.margin), 0) AS total_margin
FROM sales_items si
JOIN products p ON p.id = si.product_id
WHERE si.deleted_at IS NULL
  AND si.transaction_date IS NOT NULL
  AND si.transaction_date >= p_start_utc
  AND si.transaction_date <= p_end_utc
GROUP BY p.id, p.name
ORDER BY total_revenue DESC
LIMIT GREATEST(p_limit, 1);
$$;