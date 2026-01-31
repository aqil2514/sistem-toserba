CREATE OR REPLACE FUNCTION get_purchase_report_per_category(
    p_start_utc TIMESTAMPTZ,
    p_end_utc TIMESTAMPTZ
)
RETURNS TABLE (
  category TEXT,
  price NUMERIC
)
LANGUAGE sql
AS $$
SELECT 
  p.category,
  SUM(pi.price) AS price
FROM purchase_items pi
JOIN products p ON p.id = pi.product_id
JOIN purchases pur on pur.id = pi.purchase_id
WHERE pur.purchase_date >= p_start_utc
  AND pur.purchase_date < p_end_utc
  AND pur.deleted_at IS NULL
GROUP BY p.category
ORDER BY price DESC;
$$;
