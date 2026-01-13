import { SalesItemApiResponse } from "@/features/sales/types/sales-item-api";
import { formatDate } from "@/utils/format-date.fns";
import { formatPercent } from "@/utils/format-percent";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { ColumnDef } from "@tanstack/react-table";

export const SalesReportColumns: ColumnDef<SalesItemApiResponse>[] = [
  {
    accessorKey: "transaction_date",
    header: "Tanggal",
    cell: ({ row }) =>
      formatDate(
        row.original.transaction_date,
        "Senin, 29 Desember 2025, 09:21"
      ),
  },
  {
    accessorKey: "sales_id.customer_name",
    header: "Pembeli",
  },
  {
    accessorKey: "sales_id.payment_method",
    header: "Metode Pembayaran",
  },
  {
    accessorKey: "product_id.name",
    header: "Produk",
  },
  {
    accessorKey: "product_id.category",
    header: "Kategori",
  },
  {
    accessorKey: "product_id.subcategory",
    header: "Subkategori",
  },
  {
    accessorKey: "quantity",
    header: "Kuantitas",
  },

  {
    accessorKey: "hpp",
    header: "HPP",
    cell: ({ row }) => formatRupiah(row.original.hpp),
  },
  {
    accessorKey: "tip",
    header: "Tip",
    cell: ({ row }) => formatRupiah(row.original.tip),
  },
  {
    accessorKey: "discount",
    header: "Diskon",
    cell: ({ row }) => formatRupiah(row.original.discount),
  },
  {
    accessorKey: "margin",
    header: "Margin",
    cell: ({ row }) => formatRupiah(row.original.margin),
  },
  {
    accessorKey: "margin-percent",
    header: "Margin %",

    cell: ({ row }) =>
      formatPercent(
        (row.original.subtotal - row.original.hpp) / row.original.subtotal
      ),
  },
  {
    accessorKey: "markup-percent",
    header: "Markup %",
    cell: ({ row }) =>
      formatPercent(
        (row.original.subtotal - row.original.hpp) / row.original.hpp
      ),
  },
  {
    accessorKey: "subtotal",
    header: "Total Belanja",
    cell: ({ row }) => formatRupiah(row.original.subtotal),
  },
];