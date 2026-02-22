CREATE OR REPLACE FUNCTION get_net_worth_history(
  p_from date,
  p_to date
)
RETURNS TABLE(date date, running_total numeric)
LANGUAGE sql
AS $$
  SELECT 
    snapshot_date as date,
    SUM(CASE 
      WHEN asset = 'Utang' THEN -closing_balance 
      ELSE closing_balance 
    END) as running_total
  FROM balance_snapshots
  WHERE snapshot_date BETWEEN p_from AND p_to
  GROUP BY snapshot_date
  ORDER BY snapshot_date DESC;
$$;