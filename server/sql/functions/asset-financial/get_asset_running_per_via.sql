CREATE OR REPLACE FUNCTION get_asset_running_per_via(
  p_start_utc TIMESTAMPTZ,
  p_end_utc   TIMESTAMPTZ
)
RETURNS TABLE(
  date DATE,
  via TEXT,
  running_total NUMERIC
)
LANGUAGE SQL
STABLE
AS $$
WITH opening_balance AS (
  SELECT
    via,
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
  GROUP BY via
),

daily AS (
  SELECT 
    DATE(transaction_at) AS date,
    via,
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
  GROUP BY DATE(transaction_at), via
)

SELECT
  d.date,
  d.via,
  COALESCE(ob.balance, 0) +
  SUM(d.daily_total) OVER (
    PARTITION BY d.via
    ORDER BY d.date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM daily d
LEFT JOIN opening_balance ob
  ON d.via = ob.via
ORDER BY d.date DESC, d.via;
$$;