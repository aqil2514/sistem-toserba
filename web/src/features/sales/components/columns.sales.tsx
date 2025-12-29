import { ColumnDef } from "@tanstack/react-table";
import { SalesHeader } from "../types/sales-header";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { formatDate } from "@/utils/format-date";

export const salesColumns: ColumnDef<SalesHeader>[] = [
  {
    accessorKey: "sales_code",
    header: "Kode Penjualan",
  },
  {
    accessorKey: "customer_name",
    header: "Pembeli",
  },
  {
    accessorKey: "payment_method",
    header: "Metode Pembayaran",
  },
  {
    accessorKey: "total_amount",
    header: "Total Pembelian",
    cell: ({ row }) => formatRupiah(row.original.total_amount),
  },
  {
    accessorKey: "transaction_at",
    header: "Tanggal Pembelian",
    cell: ({ row }) =>
      formatDate(row.original.transaction_at, { hour:"2-digit", minute:"2-digit" }),
  },
];
