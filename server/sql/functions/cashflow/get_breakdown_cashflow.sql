CREATE OR REPLACE FUNCTION get_breakdown_cashflow(
  p_limit NUMERIC,
  p_page NUMERIC,
  p_start_utc TIMESTAMPTZ,
  p_end_utc TIMESTAMPTZ,
  p_filters JSONB DEFAULT '[]'::jsonb,
  p_sortings JSONB DEFAULT '[]'::jsonb
)
RETURNS TABLE (
  transaction_at DATE,
  price NUMERIC,
  status_cashflow TEXT,
  via TEXT,
  total_count BIGINT
)
LANGUAGE plpgsql
STABLE 
AS $$
DECLARE 
  sql TEXT;
BEGIN
sql := '
WITH transfer_rows AS (
  SELECT
    DATE(c.transaction_at) AS transaction_at,
    SUM(c.price) AS price,
    CASE
      WHEN c.status_cashflow = ''expense''
       AND c.category = ''d8d34dd6-4010-4e96-a081-288821917620''
      THEN ''transfer_fee''

      WHEN c.status_cashflow = ''expense''
      THEN ''transfer_out''

      WHEN c.status_cashflow = ''income''
      THEN ''transfer_in''

      ELSE c.status_cashflow
    END AS status_cashflow,
    c.via
  FROM cashflow c
  WHERE  
    c.transfer_group_id IS NOT NULL 
    AND c.transaction_at BETWEEN $1 AND $2
  GROUP BY DATE(c.transaction_at), c.status_cashflow, c.category, c.via
),
non_transfer_rows AS (
  SELECT
    DATE(c.transaction_at) AS transaction_at,
    SUM(c.price) AS price,
    c.status_cashflow,
    c.via
  FROM cashflow c
  WHERE 
    c.transfer_group_id IS NULL  
    AND c.transaction_at BETWEEN $1 AND $2
  GROUP BY DATE(c.transaction_at), c.status_cashflow, c.via
)

SELECT 
  *,
  COUNT(*) OVER() AS total_count
FROM (
  SELECT * FROM transfer_rows
  UNION ALL
  SELECT * FROM non_transfer_rows
) t
WHERE 1=1
';

  -- FILTERS
  sql := sql || generate_jsonb_filters(p_filters);

  -- SORTING
  sql := sql || generate_jsonb_sorting(p_sortings);

  -- PAGINATION
  sql := sql || generate_pagination(p_limit, p_page);

  RETURN QUERY EXECUTE sql USING p_start_utc, p_end_utc;
END;
$$