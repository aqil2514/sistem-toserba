CREATE OR REPLACE FUNCTION get_asset_running_global(
  p_start_utc TIMESTAMPTZ,
  p_end_utc   TIMESTAMPTZ
)
RETURNS TABLE(
  date DATE,
  running_total NUMERIC
)
LANGUAGE SQL
STABLE
AS $$
WITH opening_balance AS (
  SELECT
    COALESCE(SUM(
      CASE
        WHEN status_cashflow = 'income' THEN price
        WHEN status_cashflow = 'receivable' AND via = 'Piutang' THEN price
        WHEN status_cashflow = 'expense' THEN -price
        WHEN status_cashflow = 'payable' AND via = 'Utang' THEN -price
        ELSE 0
      END
    ), 0) AS balance
  FROM cashflow
  WHERE transaction_at < p_start_utc
    AND deleted_at IS NULL
),

daily AS (
  SELECT 
    DATE(transaction_at) AS date,
    SUM(
      CASE
        WHEN status_cashflow = 'income' THEN price
        WHEN status_cashflow = 'receivable' AND via = 'Piutang' THEN price
        WHEN status_cashflow = 'expense' THEN -price
        WHEN status_cashflow = 'payable' AND via = 'Utang' THEN -price
        ELSE 0
      END
    ) AS daily_total
  FROM cashflow
  WHERE transaction_at >= p_start_utc
    AND transaction_at <= p_end_utc
    AND deleted_at IS NULL
  GROUP BY DATE(transaction_at)
)

SELECT
  d.date,
  ob.balance +
  SUM(d.daily_total) OVER (
    ORDER BY d.date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM daily d
CROSS JOIN opening_balance ob
ORDER BY d.date DESC;
$$;