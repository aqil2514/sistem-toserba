CREATE OR REPLACE FUNCTION get_cashflow_category_summary(
  p_start_utc TIMESTAMPTZ,
  p_end_utc TIMESTAMPTZ
)
RETURNS TABLE(
  category_name TEXT,
  status_cashflow TEXT,
  total_price NUMERIC,
  total_transactions BIGINT
)
LANGUAGE SQL
STABLE
AS $$
  SELECT 
    cc.name AS category_name,
    c.status_cashflow,
    SUM(c.price) AS total_price,
    COUNT(c.id) AS total_transactions
  FROM cashflow c
  JOIN cashflow_category cc ON cc.id = c.category
  WHERE c.deleted_at IS NULL
    AND cc.deleted_at IS NULL
    AND c.transaction_at BETWEEN p_start_utc AND p_end_utc
    AND (c.transfer_group_id IS NULL OR c.category = 'd8d34dd6-4010-4e96-a081-288821917620')
  GROUP BY c.category, cc.name, c.status_cashflow
  ORDER BY total_price DESC
$$;