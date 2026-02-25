import {
  PurchaseAssetsCondition,
  PurchaseAssetsDbPopulated,
} from "@/features/purchase/types/items/purchase-assets.interface";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

const conditionConfig: Record<
  PurchaseAssetsCondition,
  { label: string; variant: "default" | "secondary" | "destructive" }
> = {
  new: { label: "Baru", variant: "default" },
  second: { label: "Bekas", variant: "secondary" },
  damaged: { label: "Rusak", variant: "destructive" },
};

export const assetsColumnDef: ColumnDef<PurchaseAssetsDbPopulated>[] = [
  {
    accessorKey: "purchase.purchase_date",
    header: "Tanggal Dibeli",
    cell: ({ getValue }) =>
      formatDate(getValue<string>(), "Senin, 29 Desember 2025"),
  },
  {
    accessorKey: "purchase.purchase_code",
    header: "Kode Pembelian",
  },
  { accessorKey: "asset_name", header: "Nama Aset" },
  {
    accessorKey: "purchase.supplier_name",
    header: "Nama Supplier",
  },
  {
    accessorKey: "purchase.supplier_type",
    header: "Tipe Supplier",
  },
  { accessorKey: "unit_count", header: "Jumlah Unit" },
  {
    accessorKey: "unit_price",
    header: "Harga Satuan",
    cell: ({ getValue }) => formatRupiah(getValue<number>()),
  },
  {
    accessorKey: "total_price",
    header: "Total Harga",
    cell: ({ getValue }) => formatRupiah(getValue<number>()),
  },
  {
    accessorKey: "condition",
    header: "Kondisi",
    cell: ({ getValue }) => {
      const condition = getValue<PurchaseAssetsCondition>();
      const { label, variant } = conditionConfig[condition];
      return <Badge variant={variant}>{label}</Badge>;
    },
  },
];
