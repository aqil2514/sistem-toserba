export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory?: string | null;
  unit: string;
  created_at: string; // ISO string
  updated_at: string; // ISO string
  deleted_at?: string | null;
}