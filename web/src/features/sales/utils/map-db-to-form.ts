import { SalesItemSchemaType } from "../schemas/sales-item-schema";
import { SalesSchemaType } from "../schemas/sales-schema";
import { SalesItemApiResponse } from "../types/sales-item-api";

export function mapDbDataToForm(raw: SalesItemApiResponse[]): SalesSchemaType {
  if (raw.length === 0) {
    throw new Error("Sales data kosong");
  }

  const salesHeader = raw[0].sales_id;

  if (typeof salesHeader === "string") {
    throw new Error("Sales Header bukan object");
  }

  const items: SalesItemSchemaType[] = raw.map((r) => {
    if (typeof r.product_id === "string") {
      throw new Error(`Data bukan berupa produk: ${r.product_id}`);
    }

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
