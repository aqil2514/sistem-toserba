CREATE OR REPLACE FUNCTION get_sales_summary_range(
  p_start_utc TIMESTAMPTZ,
  p_end_utc   TIMESTAMPTZ
)
RETURNS TABLE (
  total_transaction bigint,
  total_amount numeric,
  total_hpp numeric,
  margin numeric,
  margin_percent numeric,
  markdown_percent numeric
)
LANGUAGE sql
STABLE
AS $$
WITH sales_data AS (
  SELECT
    COUNT(*) AS total_transaction,
    COALESCE(SUM(total_amount), 0) AS total_amount
  FROM sales
  WHERE transaction_at >= p_start_utc
    AND transaction_at <= p_end_utc
    AND deleted_at IS NULL
),
hpp_data AS (
  SELECT
    COALESCE(SUM(hpp), 0) AS total_hpp
  FROM sales_items
  WHERE transaction_date >= p_start_utc
    AND transaction_date <= p_end_utc
    AND deleted_at IS NULL
)
SELECT
  s.total_transaction,
  s.total_amount,
  h.total_hpp,
  (s.total_amount - h.total_hpp) AS margin,
  CASE
    WHEN s.total_amount = 0 THEN 0
    ELSE ROUND(((s.total_amount - h.total_hpp) / s.total_amount) * 100, 2)
  END AS margin_percent,
  CASE
    WHEN s.total_amount = 0 THEN 0
    ELSE ROUND((h.total_hpp / s.total_amount) * 100, 2)
  END AS markdown_percent
FROM sales_data s
CROSS JOIN hpp_data h;
$$;
