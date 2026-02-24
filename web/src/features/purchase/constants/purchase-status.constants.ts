import { LabelValue } from "@/@types/general";
import { PurchaseStatus } from "../types/purchase";

export const purchaseStatusLabel: Record<PurchaseStatus, string> = {
  cancelled: "Dibatalkan",
  ordered: "Dipesan",
  partially_received: "Diterima Sebagian",
  received: "Diterima",
};

export const purchaseStatusClassName: Record<PurchaseStatus, string> = {
  received: "bg-emerald-100 text-emerald-700 border-emerald-200",
  partially_received: "bg-amber-100 text-amber-700 border-amber-200",
  ordered: "bg-blue-100 text-blue-700 border-blue-200",
  cancelled: "bg-red-100 text-red-700 border-red-200",
};

export const purchaseStatusOptions: LabelValue<string>[] = [
  ...Object.entries(purchaseStatusLabel).map(([key, value]) => ({
    label: value,
    value: key,
  })),
];

export const purchaseStatusTitle: Record<PurchaseStatus, string> = {
  cancelled: "Pembelian Dibatalkan",
  ordered: "Pembelian Dipesan",
  partially_received: "Diterima Sebagian",
  received: "Pembelian Diterima",
};

export const purchaseStatusDescription: Record<PurchaseStatus, string> = {
  cancelled: "Pembelian ini telah dibatalkan dan tidak akan diproses lebih lanjut.",
  ordered: "Pembelian telah dipesan dan sedang diproses.",
  partially_received: "Sebagian barang telah diterima, sisanya masih dalam proses pengiriman.",
  received: "Semua barang telah diterima dan pembelian telah selesai.",
};