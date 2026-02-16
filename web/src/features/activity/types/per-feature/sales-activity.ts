export type SalesActivityAction = "ADD_SALES" | "DELETE_SALES" | "EDIT_SALES";
export type SalesActivityType = "sales";

export interface SalesProduct {
  product_name: string;
  quantity: number;
}

export interface SalesLogMetaDetail {
  customer_name: string;
  products: SalesProduct[];
  total_amount: number;
  sales_id: string;
}

export interface SalesLogMetaEdit {
  sales_id: string;
  customer_name: {
    old: string;
    new: string;
  };
  products: {
    old: SalesProduct[];
    new: SalesProduct[];
  };
  total_amount: {
    old: number;
    new: number;
  };
}
