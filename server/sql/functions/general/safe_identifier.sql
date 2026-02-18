CREATE OR REPLACE FUNCTION safe_identifier(p_key text)
RETURNS text AS $$
DECLARE
    v_table text;
    v_column text;
BEGIN
    IF position('.' in p_key) > 0 THEN
        v_table := split_part(p_key, '.', 1);
        v_column := split_part(p_key, '.', 2);
        RETURN format('%I.%I', v_table, v_column);
    ELSE
        RETURN format('%I', p_key);
    END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;