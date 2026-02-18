CREATE OR REPLACE FUNCTION generate_jsonb_filters(p_filters jsonb)
RETURNS text AS $$
DECLARE
    f jsonb;
    sql text := '';
    op text;
BEGIN
    IF jsonb_array_length(p_filters) > 0 THEN
      FOR f IN SELECT * FROM jsonb_array_elements(p_filters) LOOP
        op := COALESCE(f->>'operator', 'ilike');

        IF op NOT IN (
            'eq','neq','gt','gte','lt','lte',
            'ilike','not_ilike',
            'is_null','is_not_null'
        ) THEN
            RAISE EXCEPTION 'Unsupported filter operator: %', op;
        END IF;

        sql := sql || ' AND ' ||
            CASE op
                WHEN 'eq'  THEN format('%I = %L', f->>'key', f->>'value')
                WHEN 'neq' THEN format('%I <> %L', f->>'key', f->>'value')
                WHEN 'gt'  THEN format('%I > %L', f->>'key', f->>'value')
                WHEN 'gte' THEN format('%I >= %L', f->>'key', f->>'value')
                WHEN 'lt'  THEN format('%I < %L', f->>'key', f->>'value')
                WHEN 'lte' THEN format('%I <= %L', f->>'key', f->>'value')

                WHEN 'ilike' THEN format('%I ILIKE %L', f->>'key', concat('%', f->>'value', '%'))
                WHEN 'not_ilike' THEN format('%I NOT ILIKE %L', f->>'key', concat('%', f->>'value', '%'))

                WHEN 'is_null' THEN format('%I IS NULL', f->>'key')
                WHEN 'is_not_null' THEN format('%I IS NOT NULL', f->>'key')
            END;
      END LOOP;
    END IF;
    RETURN sql;
END;
$$ LANGUAGE plpgsql STABLE;