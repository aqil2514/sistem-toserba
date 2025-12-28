export interface PurchaseDetailResponse {
  id: string;

  purchase_id: {
    id: string;
    notes: string | null;
    created_at: string;
    deleted_at: string | null;
    purchase_code: string;
    purchase_date: string;
    supplier_name: string;
    supplier_type: string;
  };

  product_id: {
    id: string;
    name: string;
    unit: string;
    price: number;
    category: string;
    created_at: string;
    deleted_at: string | null;
    updated_at: string;
    subcategory: string;
  };

  quantity: number;
  remaining_quantity: number;
  price: number;
  created_at: string;
  hpp: number;
  product_name: string | null;
  deleted_at: string | null;
}
