CREATE OR REPLACE FUNCTION get_payable_summary()
RETURNS TABLE(
  vendor_name TEXT,
  total NUMERIC,
  paid NUMERIC,
  rest NUMERIC,
  status TEXT,
  type TEXT
)
LANGUAGE SQL
STABLE AS
$$
WITH base AS (
  SELECT
    c.meta->>'vendor_name' AS vendor_name,
    SUM(CASE WHEN c.status_cashflow = 'expense' AND c.via = 'Utang' THEN c.price ELSE 0 END) AS total,
    SUM(CASE WHEN c.status_cashflow = 'income'  AND c.via = 'Utang' THEN c.price ELSE 0 END) AS paid
  FROM cashflow c
  WHERE c.via = 'Utang'
    AND c.meta->>'vendor_name' IS NOT NULL
  GROUP BY c.meta->>'vendor_name'
)
SELECT 
  b.*,
  (b.total - b.paid) AS rest,
  CASE
    WHEN (b.total - b.paid = 0) THEN 'paid'
    ELSE 'unpaid'
  END AS status,
  'payable' AS type
FROM base b;
$$