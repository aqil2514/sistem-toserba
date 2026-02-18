CREATE OR REPLACE FUNCTION get_receivable_summary()
RETURNS TABLE(
  customer_name TEXT,
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
    c.meta->>'customer_name' AS customer_name,
    SUM(CASE 
            WHEN c.status_cashflow = 'receivable' THEN c.price 
            WHEN c.transfer_group_id IS NOT NULL 
              AND c.status_cashflow = 'income' 
            THEN c.price
            ELSE 0 
        END) AS total,
    SUM(CASE WHEN c.status_cashflow = 'expense' THEN c.price ELSE 0 END) AS paid
  FROM cashflow c
  WHERE c.via = 'Piutang'
    AND c.meta->>'customer_name' IS NOT NULL
  GROUP BY c.meta->>'customer_name'
)
SELECT 
  b.*,
  (b.total - b.paid) AS rest,
  CASE
    WHEN (b.total - b.paid = 0) THEN 'paid'
    ELSE 'unpaid'
  END AS status,
  'receivable' AS type
FROM base b;
$$