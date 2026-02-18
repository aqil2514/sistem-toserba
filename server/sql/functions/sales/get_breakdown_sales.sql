CREATE OR REPLACE FUNCTION get_breakdown_sales(
  p_start_utc TIMESTAMPTZ,
  p_end_utc TIMESTAMPTZ,
  p_mode TEXT
) 
RETURNS TABLE (
  label TEXT,
  value NUMERIC
)
LANGUAGE sql
AS $$
SELECT 
  date_trunc(p_mode, transaction_date AT TIME ZONE 'Asia/Jakarta')::DATE::TEXT AS label,
  COALESCE(SUM(subtotal), 0)
    + COALESCE(SUM(tip), 0)
    - COALESCE(SUM(discount), 0) AS value
FROM sales_items
WHERE deleted_at IS NULL
  AND transaction_date IS NOT NULL
  AND transaction_date >= p_start_utc
  AND transaction_date <= p_end_utc
GROUP BY date_trunc(p_mode, transaction_date AT TIME ZONE 'Asia/Jakarta')
ORDER BY date_trunc(p_mode, transaction_date AT TIME ZONE 'Asia/Jakarta');
$$;