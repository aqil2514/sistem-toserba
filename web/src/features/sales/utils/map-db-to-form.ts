import { SalesItemSchemaType } from "../schemas/sales-item-schema";
import { SalesSchemaType } from "../schemas/sales-schema";
import { SalesItemApiResponse } from "../types/sales-item-api";

export function mapDbDataToForm(raw: SalesItemApiResponse[]): SalesSchemaType {
  const salesHeader = raw[0].sales_id;
  const items: SalesItemSchemaType[] = raw.map((r) => {
    return {
      discount: r.discount,
      price: r.product_id.price,
      product_id: r.product_id.id,
      quantity: r.quantity,
      subtotal: r.subtotal,
      tip: r.tip,
      transaction_date: r.transaction_date,
    };
  });
  return {
    customer_name: salesHeader.customer_name,
    notes: salesHeader.notes,
    payment_method: salesHeader.payment_method,
    total_amount: salesHeader.total_amount,
    transaction_at: salesHeader.transaction_at,
    items,
  };
}
