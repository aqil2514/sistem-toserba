import { CashflowCategoryStatus, CashflowDb } from "@/features/cashflow/types/cashflow.types";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { ColumnDef } from "@tanstack/react-table";

export const cashflowDataColumns: ColumnDef<CashflowDb>[] = [
  {
    accessorKey: "transaction_at",
    header: "Tanggal",
    cell: ({ row }) =>
      formatDate(row.original.transaction_at, "Senin, 29 Desember 2025"),
  },
  {
    accessorKey: "product_service",
    header: "Nama Produk / Jasa",
  },
  {
    accessorKey: "category.name",
    header: "Kategori",
  },
  {
    accessorKey: "category.status",
    header: "Status Cashflow",
    cell: ({ row }) => {
      const statusCashflow = row.original.status_cashflow;

      const mappingStatus: Record<CashflowCategoryStatus, string> = {
        expense: "Pengeluaran",
        income: "Pemasukan",
        transfer: "Pindah Aset",
      };

      return mappingStatus[statusCashflow];
    },
  },
  {
    accessorKey: "via",
    header: "Via",
    cell: ({ row }) => {
      const via = row.original.via;

      const mappingStatus: Record<string, string> = {
        digital: "Digital",
        cash: "Tunai",
      };

      return mappingStatus[via];
    },
  },
  {
    accessorKey: "price",
    header: "Nominal",
    cell: ({ row }) => formatRupiah(row.original.price),
  },
];
