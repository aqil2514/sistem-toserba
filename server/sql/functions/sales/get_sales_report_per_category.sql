CREATE OR REPLACE FUNCTION get_sales_report_per_category(
    p_start_utc TIMESTAMPTZ,
    p_end_utc TIMESTAMPTZ
)
RETURNS TABLE (
  category TEXT,
  omzet NUMERIC
)
LANGUAGE sql
AS $$
SELECT 
  p.category,
  SUM(
    si.subtotal
    + COALESCE(si.tip, 0)
    - COALESCE(si.discount, 0)
  ) AS omzet
FROM sales_items si
JOIN products p ON p.id = si.product_id
WHERE si.transaction_date >= p_start_utc
  AND si.transaction_date < p_end_utc
  AND si.deleted_at IS NULL
GROUP BY p.category
ORDER BY omzet DESC;
$$;
