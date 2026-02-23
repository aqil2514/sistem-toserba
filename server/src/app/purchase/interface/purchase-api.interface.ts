import { PurchaseAssetsDb } from './items/purchase-assets.interface';
import { PurchaseConsumablesDb } from './items/purchase-consumables.interface';
import { PurchaseItem } from './items/purchase-items.interface';
import { Purchase, PurchaseType } from './purchase.interface';

export type AnyItemTypes =
  | PurchaseItem
  | PurchaseAssetsDb
  | PurchaseConsumablesDb;

export interface PurchaseTypeItemMap extends Record<
  PurchaseType,
  AnyItemTypes[]
> {
  stock: PurchaseItem[];
  assets: PurchaseAssetsDb[];
  consumable: PurchaseConsumablesDb[];
}

export interface PurchaseDetailReturn<K extends keyof PurchaseTypeItemMap> {
  type: K;
  header: Purchase;
  items: PurchaseTypeItemMap[K];
}
