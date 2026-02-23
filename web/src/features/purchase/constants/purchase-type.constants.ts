import { LabelValue } from "@/@types/general";
import { PurchaseType } from "../types/purchase";

export const purchaseTypeLabel: Record<PurchaseType, string> = {
  assets: "Aset",
  consumable: "Perlengkapan Toko",
  stock: "Stok",
};

export const purchaseTypeClassName: Record<PurchaseType, string> = {
  assets: "bg-violet-100 text-violet-700 border-violet-200",
  consumable: "bg-sky-100 text-sky-700 border-sky-200",
  stock: "bg-orange-100 text-orange-700 border-orange-200",
};

export const purchaseTypeOptions: LabelValue<string>[] = [
  {
    label: "Pilih Kategori",
    value: "unselect",
  },
  ...Object.entries(purchaseTypeLabel).map(([key, value]) => ({
    label: value,
    value: key,
  })),
];
