import { CashflowBreakdownRpc } from "@/features/cashflow-report/types/api-return.types";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { ColumnDef } from "@tanstack/react-table";

export const breakdownCashflowReportColumns: ColumnDef<CashflowBreakdownRpc>[] =
  [
    {
      accessorKey: "transaction_at",
      header: "Tanggal",
      cell: ({ row }) =>
        formatDate(row.original.transaction_at, "Senin, 29 Desember 2025"),
    },
    {
      accessorKey: "via",
      header: "Via",
    },
    {
      accessorKey: "status_cashflow",
      header: "Status Cashflow",
      cell: ({ row }) => {
        const labelMap: Record<string, string> = {
          expense: "Pengeluaran",
          income: "Pemasukan",
          transfer_out: "Transfer Keluar",
          transfer_in: "Transfer Masuk",
          transfer_fee: "Biaya Transfer",
          payable: "Utang",
          receivable: "Piutang",
        };
        return (
          labelMap[row.original.status_cashflow] ?? row.original.status_cashflow
        );
      },
    },
    {
      accessorKey: "price",
      header: "Nominal",
      cell: ({ row }) => formatRupiah(row.original.price),
    },
  ];
