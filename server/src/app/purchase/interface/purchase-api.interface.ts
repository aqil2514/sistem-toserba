import {
  PurchaseAssetsDb,
  PurchaseAssetsDbInsert,
} from './items/purchase-assets.interface';
import {
  PurchaseConsumablesDb,
  PurchaseConsumablesDbInsert,
} from './items/purchase-consumables.interface';
import {
  PurchaseItem,
  PurchaseItemInsert,
} from './items/purchase-items.interface';
import { Purchase, PurchaseType } from './purchase.interface';

export type PurchaseItemTableName =
  | 'purchase_items'
  | 'purchase_consumables'
  | 'purchase_assets';

export type ItemTableInsert =
  | PurchaseAssetsDbInsert
  | PurchaseItemInsert
  | PurchaseConsumablesDbInsert;

export interface TableInsertMap extends Record<
  PurchaseItemTableName,
  ItemTableInsert
> {
  purchase_items: PurchaseItemInsert;
  purchase_consumables: PurchaseConsumablesDbInsert;
  purchase_assets: PurchaseAssetsDbInsert;
}

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
