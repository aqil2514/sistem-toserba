create or replace function get_total_remaining_products () returns table (product_id uuid, remaining_quantity bigint) language sql as $$

select product_id, sum(remaining_quantity) as remaining_quantity
from purchase_items
where deleted_at is null
group by product_id
$$