import { MappedResponse } from "../components/detail-dialog.purchase";

export function getDemoPurchaseItems(purchaseId: string): MappedResponse[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem("toserba-demo-purchase-items");
  if (!raw) return [];

  try {
    const allItems = JSON.parse(raw) as (MappedResponse & {
      purchase_id: string;
    })[];

    return allItems.filter((i) => i.purchase_id === purchaseId);
  } catch {
    return [];
  }
}
