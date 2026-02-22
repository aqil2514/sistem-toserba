CREATE OR REPLACE FUNCTION get_current_balance()
RETURNS NUMERIC
LANGUAGE SQL
STABLE
AS $$
WITH last_snapshot AS (
  SELECT snapshot_date, closing_balance
  FROM balance_snapshots
  ORDER BY snapshot_date DESC
  LIMIT 1
),
today_delta AS (
  SELECT COALESCE(SUM(
    CASE
      WHEN status_cashflow = 'income' THEN price
      WHEN status_cashflow = 'receivable' AND via = 'Piutang' THEN price
      WHEN status_cashflow = 'expense' THEN -price
      WHEN status_cashflow = 'payable' AND via = 'Utang' THEN -price
      ELSE 0
    END
  ), 0) AS delta
  FROM cashflow, last_snapshot
  WHERE transaction_at > last_snapshot.snapshot_date
    AND deleted_at IS NULL
)
SELECT last_snapshot.closing_balance + today_delta.delta
FROM last_snapshot, today_delta;
$$;