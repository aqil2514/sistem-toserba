CREATE OR REPLACE FUNCTION get_asset_financial_summary()
RETURNS TABLE(
  asset TEXT,
  income NUMERIC,
  expense NUMERIC,
  total NUMERIC
) 
LANGUAGE SQL
STABLE 
AS $$
SELECT
  asset,
  income,
  expense,
  income - expense AS total
FROM (
  SELECT 
    cuv.via AS asset,
    SUM(CASE WHEN c.status_cashflow = 'income' THEN c.price ELSE 0 END) AS income,
    SUM(CASE WHEN c.status_cashflow = 'expense' THEN c.price ELSE 0 END) AS expense
  FROM cashflow_unique_via cuv
  JOIN cashflow c ON c.via = cuv.via
  GROUP BY cuv.via
) t;
$$