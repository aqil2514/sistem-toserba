import { Product } from "../type";

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "demo-1",
    name: "Indomie Goreng",
    price: 3500,
    category: "Makanan",
    subcategory: "Mie Instan",
    unit: "pcs",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "demo-2",
    name: "Aqua 600ml",
    price: 4000,
    category: "Minuman",
    subcategory: "Air Mineral",
    unit: "botol",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
