CREATE OR REPLACE FUNCTION get_daily_cashflow_summary(
  p_start_utc TIMESTAMPTZ,
  p_end_utc   TIMESTAMPTZ
)
RETURNS TABLE (
  transaction_at DATE,

  income NUMERIC,
  expense NUMERIC,
  payable NUMERIC,
  receivable NUMERIC,

  net_cash NUMERIC,
  total_activity NUMERIC,
  income_count BIGINT,
  non_cash_activity NUMERIC,

  has_payable BOOLEAN,
  has_receivable BOOLEAN,

  total_income_period NUMERIC,
  total_expense_period NUMERIC,
  total_receivable_period NUMERIC,
  total_payable_period NUMERIC
)
LANGUAGE SQL
STABLE
AS $$
SELECT
  DATE(c.transaction_at) AS transaction_at,

  -- daily summary
  SUM(CASE WHEN c.status_cashflow = 'income' THEN c.price ELSE 0 END) AS income,
  SUM(CASE WHEN c.status_cashflow = 'expense' THEN c.price ELSE 0 END) AS expense,
  SUM(CASE WHEN c.status_cashflow = 'payable' THEN c.price ELSE 0 END) AS payable,
  SUM(CASE WHEN c.status_cashflow = 'receivable' THEN c.price ELSE 0 END) AS receivable,

  SUM(
    CASE
      WHEN c.status_cashflow = 'income' THEN c.price
      WHEN c.status_cashflow = 'expense' THEN -c.price
      ELSE 0
    END
  ) AS net_cash,

  SUM(c.price) AS total_activity,

  COUNT(*) FILTER (WHERE c.status_cashflow = 'income') AS income_count,

  SUM(
    CASE
      WHEN c.status_cashflow IN ('payable', 'receivable')
      THEN c.price
      ELSE 0
    END
  ) AS non_cash_activity,

  BOOL_OR(c.status_cashflow = 'payable') AS has_payable,
  BOOL_OR(c.status_cashflow = 'receivable') AS has_receivable,

  -- period totals (window function)
  SUM(SUM(CASE WHEN c.status_cashflow = 'income' THEN c.price ELSE 0 END))
    OVER () AS total_income_period,

  SUM(SUM(CASE WHEN c.status_cashflow = 'expense' THEN c.price ELSE 0 END))
    OVER () AS total_expense_period,

  SUM(SUM(CASE WHEN c.status_cashflow = 'receivable' THEN c.price ELSE 0 END))
    OVER () AS total_receivable_period,

  SUM(SUM(CASE WHEN c.status_cashflow = 'payable' THEN c.price ELSE 0 END))
    OVER () AS total_payable_period

FROM cashflow c
WHERE c.transfer_group_id IS NULL
  AND c.transaction_at >= p_start_utc
  AND c.transaction_at <= p_end_utc
GROUP BY DATE(c.transaction_at)
ORDER BY DATE(c.transaction_at) DESC;
$$;