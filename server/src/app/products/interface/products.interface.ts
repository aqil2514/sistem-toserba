export interface Product {
  id: string; // uuid

  name: string;

  price: string; // numeric(12,2) → string (pg default)

  category: string;

  stock?: number;

  unit: string;

  created_at: string | null; // timestamp with time zone

  updated_at: string | null; // timestamp with time zone

  deleted_at: string | null; // timestamp with time zone

  subcategory: string | null;
}
