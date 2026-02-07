-- DROP FUNCTION get_cashflow_data(
--   p_limit NUMERIC,
--   p_page NUMERIC,
--   p_start_utc TIMESTAMPTZ,
--   p_end_utc TIMESTAMPTZ,
--   p_filters JSONB,
--   p_sortings JSONB
-- )

CREATE OR REPLACE FUNCTION get_cashflow_data(
  p_limit NUMERIC,
  p_page NUMERIC,
  p_start_utc TIMESTAMPTZ,
  p_end_utc TIMESTAMPTZ,
  p_filters JSONB DEFAULT '[]'::jsonb,
  p_sortings JSONB DEFAULT '[]'::jsonb
)
RETURNS TABLE(
  id UUID,
  transaction_at TIMESTAMPTZ,
  product_service TEXT,
  cashflow_category TEXT,
  status_cashflow TEXT,
  via TEXT,
  price NUMERIC,
  transfer_group_id UUID,
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
      SELECT DISTINCT ON (c.transfer_group_id)
          c.id,
          c.transaction_at,
          c.product_service,
          cat.name AS cashflow_category,
          ''transfer'' as status_cashflow,,
          c.via,
          c.price,
          c.transfer_group_id
      FROM cashflow c
      JOIN cashflow_category cat ON cat.id = c.category
      WHERE c.transfer_group_id IS NOT NULL
        AND cat.id <> ''d8d34dd6-4010-4e96-a081-288821917620''
        AND c.transaction_at BETWEEN $1 AND $2
      ORDER BY c.transfer_group_id, c.transaction_at DESC
    ),
    non_transfer_rows AS (
      SELECT
          c.id,
          c.transaction_at,
          c.product_service,
          cat.name AS cashflow_category,
          c.status_cashflow,
          c.via,
          c.price,
          c.transfer_group_id
      FROM cashflow c
      JOIN cashflow_category cat ON cat.id = c.category
      WHERE c.transfer_group_id IS NULL
        AND c.transaction_at BETWEEN $1 AND $2
    )
    SELECT *,
           count(*) OVER() AS total_count
    FROM (
        SELECT * FROM non_transfer_rows
        UNION ALL
        SELECT * FROM transfer_rows
    ) combined 
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
$$;