CREATE OR REPLACE FUNCTION get_cash_count_pivot(
  p_start_date timestamptz,
  p_end_date timestamptz
)
RETURNS TABLE (
  date timestamptz,
  denominations jsonb
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH denomination_list AS (
    SELECT id, label
    FROM denominations
  )
  SELECT
    cc.date,
    jsonb_object_agg(d.label, ccd.quantity ORDER BY d.label) AS denominations
  FROM cash_count_details ccd
  JOIN denomination_list d ON ccd.denomination_id = d.id
  JOIN cash_counts cc ON ccd.cash_count_id = cc.id
  WHERE cc.date BETWEEN p_start_date AND p_end_date
  GROUP BY cc.date
  ORDER BY cc.date;
END;
$$;