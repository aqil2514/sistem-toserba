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
WITH date_series AS (
  SELECT generate_series(
    DATE(p_start_utc),
    DATE(p_end_utc),
    INTERVAL '1 day'
  )::DATE AS date
),

vias AS (
  SELECT DISTINCT via
  FROM cashflow
  WHERE deleted_at IS NULL
),

opening_balance AS (
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
),

calendar AS (
  SELECT d.date, v.via
  FROM date_series d
  CROSS JOIN vias v
)

SELECT
  c.date,
  c.via,
  COALESCE(ob.balance, 0) +
  SUM(COALESCE(d.daily_total, 0)) OVER (
    PARTITION BY c.via
    ORDER BY c.date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM calendar c
LEFT JOIN daily d
  ON c.date = d.date AND c.via = d.via
LEFT JOIN opening_balance ob
  ON c.via = ob.via
ORDER BY c.date DESC, c.via;
$$;