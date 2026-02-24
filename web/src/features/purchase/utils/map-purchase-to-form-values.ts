import { PurchaseAssetsSchemaType } from "../schema/items/purchase-assets.schema";
import { PurchaseConsumablesSchemaType } from "../schema/items/purchase-consumables.schema";
import { PurchaseItemFormValues } from "../schema/items/purchase-items.schema";
import { PurchaseFormValues } from "../schema/purchase.schema";
import { PurchaseAssetsDb } from "../types/items/purchase-assets.interface";
import { PurchaseConsumablesDb } from "../types/items/purchase-consumables.interface";
import { PurchaseDetailReturn } from "../types/purchase-api.types";
import { PurchaseItem } from "../types/purchase_items";

export function mapPurchaseToFormValues(
  raw: PurchaseDetailReturn,
): PurchaseFormValues {
  const header = mapToHeader(raw);
  let items: PurchaseFormValues["items"] = [];
  switch (raw.header.purchase_type) {
    case "assets":
      items = (raw.items as PurchaseAssetsDb[]).map(mapItemsToAssetsType);
      break;
    case "consumable":
      items = (raw.items as PurchaseConsumablesDb[]).map(
        mapItemsToConsumableType,
      );
      break;
    case "stock":
      items = (raw.items as PurchaseItem[]).map(mapItemsToStockType);
      break;
    default:
      console.warn(`Unknown purchase_type: ${raw.header.purchase_type}`);
      break;
  }
  return { ...header, items: items };
}

const mapToHeader = (raw: PurchaseDetailReturn) => ({
  purchase_date: new Date(raw.header.created_at).toISOString(),
  purchase_status: raw.header.purchase_status,
  purchase_type: raw.header.purchase_type,
  supplier_name: raw.header.supplier_name,
  supplier_type: raw.header.supplier_type,
  notes: raw.header?.notes ?? "",
  purchase_code: raw.header.purchase_code,
});

const mapItemsToStockType = (item: PurchaseItem): PurchaseItemFormValues => ({
  price: item.price,
  product_id: item.product_id,
  quantity: item.quantity,
});

const mapItemsToAssetsType = (
  item: PurchaseAssetsDb,
): PurchaseAssetsSchemaType => ({
  asset_name: item.asset_name,
  condition: item.condition,
  unit_count: item.unit_count,
  unit_price: item.unit_price,
});

const mapItemsToConsumableType = (
  item: PurchaseConsumablesDb,
): PurchaseConsumablesSchemaType => ({
  consumable_name: item.consumable_name,
  quantity: item.quantity,
  unit_price: item.total_price,
});
