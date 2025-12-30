import { Product } from '../../../app/products/interface/products.interface';
import { SalesDb } from './sales.interface';

export interface SalesItemDb {
  id: string;
  sales_id: string;
  product_id: string;
  discount: number;
  quantity: number;
  subtotal: number;
  tip: number;
  deleted_at: string;
  margin: number;
  hpp: number;
  transaction_date: string;
}

export type SalesItemInsert = Omit<SalesItemDb, 'id' | 'deleted_at'>;

export interface SalesItemApiResponse {
  id: string;
  sales_id: SalesDb;
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
