import {
  CashflowCategoryStatus,
  CashflowDb,
} from "@/features/cashflow/types/cashflow.types";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { ColumnDef } from "@tanstack/react-table";
import { SelectRow } from "./rows/select-row.cashflow";

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
  },
  {
    accessorKey: "price",
    header: "Nominal",
    cell: ({ row }) => {
      const value = formatRupiah(row.original.price);

      const isTransfer = Boolean(row.original.transfer_group_id);
      const isExpense =
        row.original.status_cashflow === "expense" && !isTransfer;
      const isIncome = row.original.status_cashflow === "income" && !isTransfer;

      return (
        <p
          className={cn(
            "font-semibold text-sm",
            isTransfer && "text-blue-500",
            isExpense && "text-red-500",
            isIncome && "text-green-500",
          )}
        >
          {value}
        </p>
      );
    },
  },
  {
    accessorKey:"action",
    header:"Aksi",
    cell:({row}) => <SelectRow row={row} />
  }
];
