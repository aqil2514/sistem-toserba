CREATE OR REPLACE VIEW public.customer_name AS
SELECT DISTINCT
  customer_name
FROM 
  sales
WHERE deleted_at IS NULL;