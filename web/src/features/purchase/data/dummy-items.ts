import { PurchaseItem } from "../types/purchase_items";

export const dummyItems: PurchaseItem[] = [
  {
    id: "1",
    purchase_id: "p1",
    product_id: "prd1",
    product_name: "Indomie Goreng",
    quantity: 10,
    remaining_quantity: 6,
    price: 3500,
    hpp: 3300,
    created_at: new Date().toISOString(),
    deleted_at: null,
  },
  {
    id: "2",
    purchase_id: "p1",
    product_id: "prd2",
    product_name: "Teh Botol",
    quantity: 5,
    remaining_quantity: 5,
    price: 4500,
    hpp: 4300,
    created_at: new Date().toISOString(),
    deleted_at: null,
  },
];
