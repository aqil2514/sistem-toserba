import { ColumnDef } from "@tanstack/react-table";
import { CashCounts } from "../../types/type.cash-counter-cash-counting";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { ColumnActionCashCounting } from "./column-action.cash-couting";

export const cashCountsColumns: ColumnDef<CashCounts>[] = [
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) => formatDate(row.original.date, "Senin, 29 Desember 2025"),
  },
  {
    accessorKey: "system_cash",
    header: "Kas Sistem",
    cell: ({ row }) => formatRupiah(row.original.system_cash),
  },
  {
    accessorKey: "net_store_cash",
    header: "Kas Bersih",
    cell: ({ row }) => formatRupiah(row.original.net_store_cash),
  },
  {
    accessorKey: "third_party_cash",
    header: "Uang Orang Lain",
    cell: ({ row }) => formatRupiah(row.original.third_party_cash),
  },
  {
    accessorKey: "difference",
    header: "Selisih",
    cell: ({ row }) => formatRupiah(row.original.difference),
  },
    {
      accessorKey: "action",
      header: "Aksi",
      cell: ({ row }) => <ColumnActionCashCounting row={row} />,
    },
];
