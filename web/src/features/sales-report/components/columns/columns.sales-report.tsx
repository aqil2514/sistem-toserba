import { SalesItemApiResponse } from "@/features/sales/types/sales-item-api";
import { formatDate } from "@/utils/format-date.fns";
import { formatPercent } from "@/utils/format-percent";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { ColumnDef } from "@tanstack/react-table";
import { ProductSummaryApiResponse } from "../../types/summary-columns.report-sales";

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

export const SummarizedReportColumns: ColumnDef<ProductSummaryApiResponse>[] =
  [
    {
      accessorKey: "product_name",
      header: "Nama Produk",
    },
    {
      accessorKey: "quantity",
      header: "Kuantitas",
    },
    {
      accessorKey: "hpp",
      header: "Total HPP",
      cell: ({ row }) => formatRupiah(row.original.hpp),
    },
    {
      accessorKey: "margin",
      header: "Total Margin",
      cell: ({ row }) => formatRupiah(row.original.margin),
    },
    {
      accessorKey: "subtotal",
      header: "Total Belanja",
      cell: ({ row }) => formatRupiah(row.original.subtotal),
    },
    {
      accessorKey: "discount",
      header: "Total Diskon",
      cell: ({ row }) => formatRupiah(row.original.discount),
    },
    {
      accessorKey: "tip",
      header: "Total Tip",
      cell:({row}) => formatRupiah(row.original.tip)
    },
    {
      accessorKey: "markup_percent",
      header: "Markup %",
      cell:({row}) => formatPercent(row.original.markup_percent)
    },
    {
      accessorKey: "margin_percent",
      header: "Margin %",
      cell:({row}) => formatPercent(row.original.margin_percent)
    },
  ];
