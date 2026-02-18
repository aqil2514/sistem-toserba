CREATE OR REPLACE FUNCTION get_sales_report_summary(
  p_start_utc TIMESTAMPTZ,
  p_end_utc TIMESTAMPTZ,
  p_filters JSONB DEFAULT '[]'::jsonb
)
RETURNS TABLE (
  omzet numeric,
  hpp numeric,
  margin numeric,
  margin_percent numeric,
  markup_percent numeric,
  total_transaction bigint
)
LANGUAGE plpgsql
VOLATILE
AS $$
DECLARE sql TEXT;
BEGIN
  sql := '
    SELECT
      COALESCE(SUM(si.subtotal) + SUM(si.tip) - SUM(si.discount), 0) AS omzet,
      COALESCE(SUM(si.hpp), 0) AS hpp,
      COALESCE(SUM(si.margin), 0) AS margin,
      COALESCE(SUM(si.margin) / NULLIF(SUM(si.subtotal), 0), 0) AS margin_percent,
      COALESCE(SUM(si.margin) / NULLIF(SUM(si.hpp), 0), 0) AS markup_percent,
      COUNT(DISTINCT si.sales_id) AS total_transaction
    FROM sales_items si
    JOIN sales s ON s.id = si.sales_id
    JOIN products p ON p.id = si.product_id
    WHERE si.transaction_date BETWEEN $1 AND $2
  ';

  sql := sql || generate_jsonb_filters(p_filters);

  RETURN QUERY EXECUTE sql USING p_start_utc, p_end_utc;
END;
$$;