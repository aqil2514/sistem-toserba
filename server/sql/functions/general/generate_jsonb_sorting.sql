CREATE OR REPLACE FUNCTION generate_jsonb_sorting(
    p_sortings JSONB
) RETURNS TEXT AS $$
DECLARE
    f JSONB;
    sql TEXT := '';
    first_sort BOOLEAN := TRUE;
BEGIN
    p_sortings := COALESCE(p_sortings, '[]'::jsonb);

    IF jsonb_array_length(p_sortings) > 0 THEN
        FOR f IN SELECT * FROM jsonb_array_elements(p_sortings) LOOP
            IF first_sort THEN
                sql := sql || ' ORDER BY ';
                first_sort := FALSE;
            ELSE
                sql := sql || ', ';
            END IF;

            sql := sql || (f->>'key')::text || ' ' || UPPER((f->>'value')::text);
        END LOOP;
    END IF;

    RETURN sql;
END;
$$ LANGUAGE plpgsql STABLE;
