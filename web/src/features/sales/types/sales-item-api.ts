import { Product } from "@/features/products/types/type";
import { SalesHeader } from "./sales-header";

export interface SalesItemApiResponse {
  id: string;
  sales_id: SalesHeader;
  product_id: Product;
  discount: number;
  quantity: number;
  subtotal: number;
  tip: number;
  deleted_at: string;
  margin: number;
  hpp: number;
  transaction_date: string;
}
