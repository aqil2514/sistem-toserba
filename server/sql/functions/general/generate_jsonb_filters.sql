CREATE OR REPLACE FUNCTION generate_jsonb_filters(p_filters jsonb)
RETURNS text AS $$
DECLARE
    f jsonb;
    sql text := '';
BEGIN
    IF jsonb_array_length(p_filters) > 0 THEN
        FOR f IN SELECT * FROM jsonb_array_elements(p_filters) LOOP
            sql := sql || ' AND ' ||
                CASE COALESCE(f->>'operator', 'ilike')
                    WHEN 'eq' THEN f->>'key' || ' = ' || quote_literal(f->>'value')
                    WHEN 'ilike' THEN f->>'key' || ' ILIKE ' || quote_literal(concat('%', f->>'value', '%'))
                    WHEN 'gte' THEN f->>'key' || ' >= ' || quote_literal(f->>'value')
                    WHEN 'lte' THEN f->>'key' || ' <= ' || quote_literal(f->>'value')
                    ELSE f->>'key' || ' ILIKE ' || quote_literal(concat('%', f->>'value', '%'))
                END;
        END LOOP;
    END IF;
    RETURN sql;
END;
$$ LANGUAGE plpgsql STABLE;
