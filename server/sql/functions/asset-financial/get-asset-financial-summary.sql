CREATE OR REPLACE FUNCTION get_asset_financial_summary(
  p_start_utc TIMESTAMPTZ,
  p_end_utc TIMESTAMPTZ
)
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
    SUM(CASE 
          WHEN c.status_cashflow = 'income' THEN c.price 
          WHEN c.status_cashflow = 'receivable' AND cuv.via = 'Piutang' THEN c.price  
          ELSE 0 
        END) AS income,
    SUM(CASE WHEN c.status_cashflow = 'expense' THEN c.price ELSE 0 END) AS expense
  FROM cashflow_unique_via cuv
    JOIN cashflow c ON c.via = cuv.via
  WHERE c.transaction_at >= p_start_utc
    AND c.transaction_at <= p_end_utc
  GROUP BY cuv.via
) t;
$$