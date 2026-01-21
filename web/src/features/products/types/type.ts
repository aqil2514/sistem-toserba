export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  subcategory?: string | null;
  unit: string;
  created_at: string; // ISO string
  updated_at: string; // ISO string
  deleted_at?: string | null;
}

export interface ProductStockRpcResponse {
  count: number;
  data: {
    product_id: string;
    remaining_quantity: number;
  }[];
}