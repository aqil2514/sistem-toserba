CREATE VIEW public.vendor_name AS
SELECT DISTINCT
  meta->>'vendor_name' AS vendor_name
FROM cashflow
WHERE meta ? 'vendor_name'
  AND deleted_at IS NULL;