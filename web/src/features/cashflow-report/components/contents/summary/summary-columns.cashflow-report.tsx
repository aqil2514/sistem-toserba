import { ColumnDef } from "@tanstack/react-table";
import { DailyCashflowSummaryRow } from "@/features/cashflow-report/types/cashflow-report-api-return.types";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { cn } from "@/lib/utils";

export const cashflowReportColumns: ColumnDef<DailyCashflowSummaryRow>[] = [
  {
    accessorKey: "transaction_at",
    header: "Tanggal",
    cell: ({ row }) =>
      formatDate(
        row.original.transaction_at,
        "Senin, 29 Desember 2025"
      ),
  },
  {
    accessorKey: "income",
    header: "Pemasukan",
    cell: ({ row }) => (
      <p className="font-semibold text-green-600">
        {formatRupiah(row.original.income)}
      </p>
    ),
  },
  {
    accessorKey: "expense",
    header: "Pengeluaran",
    cell: ({ row }) => (
      <p className="font-semibold text-red-600">
        {formatRupiah(row.original.expense)}
      </p>
    ),
  },
  {
    accessorKey: "net_cash",
    header: "Net Kas",
    cell: ({ row }) => {
      const value = row.original.net_cash;
      return (
        <p
          className={cn(
            "font-semibold",
            value >= 0 ? "text-green-600" : "text-red-600"
          )}
        >
          {formatRupiah(value)}
        </p>
      );
    },
  },
  {
    accessorKey: "payable",
    header: "Utang",
    cell: ({ row }) => (
      <p className="text-pink-600">
        {formatRupiah(row.original.payable)}
      </p>
    ),
  },
  {
    accessorKey: "receivable",
    header: "Piutang",
    cell: ({ row }) => (
      <p className="text-orange-600">
        {formatRupiah(row.original.receivable)}
      </p>
    ),
  },
  {
    accessorKey: "income_count",
    header: "Jumlah Pemasukan",
    cell: ({ row }) => (
      <p className="text-center">
        {row.original.income_count}
      </p>
    ),
  },
  {
    accessorKey: "non_cash_activity",
    header: "Non-Kas",
    cell: ({ row }) => (
      <p className="text-gray-700">
        {formatRupiah(row.original.non_cash_activity)}
      </p>
    ),
  },
];