CREATE OR REPLACE FUNCTION generate_pagination(
    p_limit NUMERIC,
    p_page NUMERIC
) RETURNS TEXT AS $$
DECLARE
    sql TEXT := '';
BEGIN
  sql := sql || ' LIMIT ' || GREATEST(p_limit, 1);
  sql := sql || ' OFFSET ' || GREATEST((p_page - 1) * p_limit, 0);
    RETURN sql;
END;
$$ LANGUAGE plpgsql STABLE