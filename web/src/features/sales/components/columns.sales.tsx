import { ColumnDef } from "@tanstack/react-table";
import { SalesHeader } from "../types/sales-header";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { SalesColumnAction } from "./dropdown-cells.sales";
import { formatDate } from "@/utils/format-date.fns";

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
    // TODO Ini jam ga konsisten. Sebelumnya begini berdasarkan WIB. Setelah diupdate, malah berdasarkan UTC
    cell: ({ row }) => formatDate(row.original.transaction_at, "29 Desember 2025, 09:21 WIB"),
  },
  {
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => <SalesColumnAction row={row} />,
  },
];
