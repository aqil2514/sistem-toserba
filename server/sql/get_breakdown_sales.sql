CREATE OR REPLACE FUNCTION get_breakdown_sales(
  p_start_utc TIMESTAMPTZ,
  p_end_utc TIMESTAMPTZ
) 
RETURNS TABLE (
  date TEXT,
  omzet NUMERIC
)
LANGUAGE sql
AS $$
SELECT 
  DATE(transaction_date)::TEXT AS date,       
  (SUM(subtotal) + SUM(TIP) - SUM(discount)) AS omzet
FROM sales_items
WHERE deleted_at IS NULL
  AND transaction_date IS NOT NULL
  AND transaction_date >= p_start_utc
  AND transaction_date <= p_end_utc
GROUP BY DATE(transaction_date)
ORDER BY DATE(transaction_date);
$$;
