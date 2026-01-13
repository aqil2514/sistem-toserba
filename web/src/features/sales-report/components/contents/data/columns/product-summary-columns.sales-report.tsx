import { formatPercent } from "@/utils/format-percent";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { ColumnDef } from "@tanstack/react-table";
import { ProductSummaryApiResponse } from "../../../../types/summary-columns.report-sales";

export const SummarizedReportColumns: ColumnDef<ProductSummaryApiResponse>[] = [
  {
    accessorKey: "product_name",
    header: "Nama Produk",
  },
  {
    accessorKey: "category",
    header: "Kategori Produk",
  },
  {
    accessorKey: "subcategory",
    header: "Subkategori Produk",
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
    cell: ({ row }) => formatRupiah(row.original.tip),
  },
  {
    accessorKey: "markup_percent",
    header: "Markup %",
    cell: ({ row }) => formatPercent(row.original.markup_percent),
  },
  {
    accessorKey: "margin_percent",
    header: "Margin %",
    cell: ({ row }) => formatPercent(row.original.margin_percent),
  },
];
