CREATE OR REPLACE FUNCTION get_log_sales_detail(p_sales_id uuid)
RETURNS TABLE (
  customer_name text,
  product_name text,
  quantity integer,
  total_amount numeric
)
LANGUAGE sql
AS $$
  SELECT 
    s.customer_name,
    p.name AS product_name,
    si.quantity,
    s.total_amount
  FROM sales s
  JOIN sales_items si ON s.id = si.sales_id
  JOIN products p ON si.product_id = p.id
  WHERE s.id = p_sales_id;
$$;