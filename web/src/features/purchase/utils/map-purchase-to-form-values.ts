import { MappedResponse } from "../components/detail-dialog.purchase";
import { PurchaseFormValues } from "../schema/purchase.schema";
import { Purchase } from "../types/purchase";

export function mapPurchaseToFormValues(
  purchase: Purchase,
  items: MappedResponse[]
): PurchaseFormValues {
  return {
    purchase_date: new Date(purchase.purchase_date),
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
