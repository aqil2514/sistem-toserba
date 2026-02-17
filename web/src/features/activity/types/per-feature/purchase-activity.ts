export type PurchaseActivityAction =
  | 'ADD_PURCHASE'
  | 'DELETE_PURCHASE'
  | 'EDIT_PURCHASE';
export type PurchaseActivityType = 'purchase';

export interface PurchaseMetaItem {
  product_name: string;
  quantity: number;
  price:number;
  hpp: number;
}

export interface PurchaseDetailMeta {
  id: string;
  supplier_name: string;
  notes: string;
  purchase_date: string;
  items: PurchaseMetaItem[];
}

export interface PurchaseEditMeta {
  id: string;
  new: Omit<PurchaseDetailMeta, 'id'>;
  old: Omit<PurchaseDetailMeta, 'id'>;
}
