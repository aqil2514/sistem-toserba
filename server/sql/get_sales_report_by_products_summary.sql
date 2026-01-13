-- SELECT *
-- FROM get_sales_report_by_products_summary(
--   1,
--   20,
--   '2026-01-01 00:00:00+00',
--   '2026-01-31 00:00:00+00'
-- );

DROP FUNCTION get_sales_report_by_products_summary(
    p_page INT,
    p_limit INT,
    p_start_utc TIMESTAMPTZ,
    p_end_utc TIMESTAMPTZ,
    p_product_name TEXT ,
    p_product_category TEXT,
    p_product_subcategory TEXT,
    p_sort_by TEXT ,
    p_sort_dir TEXT 
)

CREATE OR REPLACE FUNCTION get_sales_report_by_products_summary(
    p_page INT,
    p_limit INT,
    p_start_utc TIMESTAMPTZ,
    p_end_utc TIMESTAMPTZ,
    p_product_name TEXT DEFAULT NULL,
    p_product_category TEXT DEFAULT NULL,
    p_product_subcategory TEXT DEFAULT NULL,
    p_sort_by TEXT DEFAULT 'product_name',
    p_sort_dir TEXT DEFAULT 'asc'
)
RETURNS TABLE(
    product_name TEXT,
    category TEXT,
    subcategory TEXT,
    quantity INT,
    hpp NUMERIC,
    margin NUMERIC, 
    subtotal NUMERIC,
    discount NUMERIC,
    tip NUMERIC,
    markup_percent NUMERIC,
    margin_percent NUMERIC
)
LANGUAGE sql
AS $$
SELECT
  p.name,
  p.category,
  p.subcategory,
  SUM(si.quantity) as quantity,
  SUM(si.hpp) as hpp,
  SUM(si.margin) as margin,
  SUM(si.subtotal) as subtotal,
  SUM(si.discount) as discount,
  SUM(si.tip) as tip,
  (SUM(si.margin) / NULLIF(SUM(si.hpp), 0)) AS markup_percent,
  (SUM(si.margin) / NULLIF(SUM(si.subtotal), 0)) AS margin_percent
    FROM sales_items si 
    JOIN products p ON p.id = si.product_id
    WHERE si.transaction_date >= p_start_utc
    AND si.transaction_date < p_end_utc
    AND (
        p_product_name IS NULL
        OR p.name ILIKE '%' || p_product_name || '%'
    )
    AND (
        p_product_category IS NULL
        OR p.category ILIKE '%' || p_product_category || '%'
    )
    AND (
        p_product_subcategory IS NULL
        OR p.subcategory ILIKE '%' || p_product_subcategory || '%'
    )
GROUP BY p.id, p.name
ORDER BY 
    CASE WHEN p_sort_by = 'product_name' AND p_sort_dir = 'asc'
        THEN p.name END ASC,
    CASE WHEN p_sort_by = 'product_name' AND p_sort_dir = 'desc'
        THEN p.name END DESC,

    CASE WHEN p_sort_by = 'product_category' AND p_sort_dir = 'asc'
        THEN p.category END ASC,
    CASE WHEN p_sort_by = 'product_category' AND p_sort_dir = 'desc'
        THEN p.category END DESC,

    CASE WHEN p_sort_by = 'product_subcategory' AND p_sort_dir = 'asc'
        THEN p.subcategory END ASC,
    CASE WHEN p_sort_by = 'product_subcategory' AND p_sort_dir = 'desc'
        THEN p.subcategory END DESC,

    CASE WHEN p_sort_by = 'quantity' AND p_sort_dir = 'asc'
        THEN SUM(si.quantity) END ASC,
    CASE WHEN p_sort_by = 'quantity' AND p_sort_dir = 'desc'
        THEN SUM(si.quantity) END DESC,

    CASE WHEN p_sort_by = 'hpp' AND p_sort_dir = 'asc'
        THEN SUM(si.hpp) END ASC,
    CASE WHEN p_sort_by = 'hpp' AND p_sort_dir = 'desc'
        THEN SUM(si.hpp) END DESC,

    CASE WHEN p_sort_by = 'margin' AND p_sort_dir = 'asc'
        THEN SUM(si.margin) END ASC,
    CASE WHEN p_sort_by = 'margin' AND p_sort_dir = 'desc'
        THEN SUM(si.margin) END DESC,

    CASE WHEN p_sort_by = 'subtotal' AND p_sort_dir = 'asc'
        THEN SUM(si.subtotal) END ASC,
    CASE WHEN p_sort_by = 'subtotal' AND p_sort_dir = 'desc'
        THEN SUM(si.subtotal) END DESC,

    CASE WHEN p_sort_by = 'tip' AND p_sort_dir = 'asc'
        THEN SUM(si.tip) END ASC,
    CASE WHEN p_sort_by = 'tip' AND p_sort_dir = 'desc'
        THEN SUM(si.tip) END DESC,

    CASE WHEN p_sort_by = 'markup_percent' AND p_sort_dir = 'asc'
        THEN (SUM(si.margin) / NULLIF(SUM(si.hpp), 0)) END ASC,
    CASE WHEN p_sort_by = 'markup_percent' AND p_sort_dir = 'desc'
        THEN (SUM(si.margin) / NULLIF(SUM(si.hpp), 0)) END DESC,

    CASE WHEN p_sort_by = 'margin_percent' AND p_sort_dir = 'asc'
         THEN (SUM(si.margin) / NULLIF(SUM(si.subtotal), 0)) END ASC,
    CASE WHEN p_sort_by = 'margin_percent' AND p_sort_dir = 'desc'
         THEN (SUM(si.margin) / NULLIF(SUM(si.subtotal), 0)) END DESC

LIMIT GREATEST(p_limit, 1)
OFFSET GREATEST((p_page - 1) * p_limit, 0)
$$;