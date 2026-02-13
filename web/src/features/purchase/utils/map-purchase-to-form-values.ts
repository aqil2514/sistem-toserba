import { PurchaseFormValues } from "../schema/purchase.schema";
import { MappedResponse } from "../types/mapped-response";
import { Purchase } from "../types/purchase";

export function mapPurchaseToFormValues(
  purchase: Purchase,
  items: MappedResponse[]
): PurchaseFormValues {
  return {
    purchase_date: new Date(purchase.purchase_date).toISOString(),
    purchase_code: purchase.purchase_code ?? "",
    supplier_name: purchase.supplier_name ?? "",
    supplier_type: purchase.supplier_type ?? "",
    notes: purchase.notes ?? "",
    items: items.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: Number(item.price),
    })),
  };
}
