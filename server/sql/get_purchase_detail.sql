select 
  pi.price as price,
  pu.supplier_name,
  pu.purchase_date,
  pu.purchase_code,
  pu.supplier_type,
  po.name as product_name
    from purchase_items pi
    join purchases pu on pu.id = pi.purchase_id
    join products po on po.id = pi.product_id
    where pi.deleted_at is null
    group by pi.id, pu.supplier_name, pu.purchase_date, pu.purchase_code, pu.supplier_type, po.name
    order by pu.purchase_date desc

    -- Lanjutin nanti