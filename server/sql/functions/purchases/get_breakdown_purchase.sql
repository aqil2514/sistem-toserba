CREATE OR REPLACE FUNCTION get_breakdown_purchase(
  p_start_utc TIMESTAMPTZ,
  p_end_utc TIMESTAMPTZ
) 
RETURNS TABLE (
  date TEXT,
  price NUMERIC
)
LANGUAGE sql
AS $$
SELECT 
  DATE(pur.purchase_date)::TEXT AS date,       
  (SUM(pi.price)) AS price
FROM purchase_items pi
JOIN purchases pur on pur.id = pi.purchase_id 
WHERE pi.deleted_at IS NULL
  AND pur.purchase_date IS NOT NULL
  AND pur.purchase_date >= p_start_utc
  AND pur.purchase_date <= p_end_utc
GROUP BY DATE(pur.purchase_date)
ORDER BY DATE(pur.purchase_date);
$$;
