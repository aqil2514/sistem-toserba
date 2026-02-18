CREATE OR REPLACE FUNCTION generate_jsonb_filters(p_filters jsonb)
RETURNS text AS $$
DECLARE
    f jsonb;
    sql text := '';
    op text;
    key_sql text;
    val text;
BEGIN
    IF p_filters IS NULL OR jsonb_array_length(p_filters) = 0 THEN
        RETURN '';
    END IF;

    FOR f IN SELECT * FROM jsonb_array_elements(p_filters)
    LOOP
        op := COALESCE(f->>'operator', 'ilike');

        IF op NOT IN (
            'eq','neq','gt','gte','lt','lte',
            'ilike','not_ilike',
            'is_null','is_not_null'
        ) THEN
            RAISE EXCEPTION 'Unsupported filter operator: %', op;
        END IF;

        key_sql := safe_identifier(f->>'key');
        val := f->>'value';

        sql := sql || ' AND ' ||
            CASE op
                WHEN 'eq'  THEN key_sql || format(' = %L', val)
                WHEN 'neq' THEN key_sql || format(' <> %L', val)
                WHEN 'gt'  THEN key_sql || format(' > %L', val)
                WHEN 'gte' THEN key_sql || format(' >= %L', val)
                WHEN 'lt'  THEN key_sql || format(' < %L', val)
                WHEN 'lte' THEN key_sql || format(' <= %L', val)

                WHEN 'ilike' THEN key_sql || format(
                    ' ILIKE %L',
                    concat('%', val, '%')
                )

                WHEN 'not_ilike' THEN key_sql || format(
                    ' NOT ILIKE %L',
                    concat('%', val, '%')
                )

                WHEN 'is_null' THEN key_sql || ' IS NULL'
                WHEN 'is_not_null' THEN key_sql || ' IS NOT NULL'
            END;
    END LOOP;

    RETURN sql;
END;
$$ LANGUAGE plpgsql STABLE;