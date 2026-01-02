import { ColumnDef } from "@tanstack/react-table";
import { ProductOutHistory } from "../../types/product-out-history";
import { DataTableColumnHeader } from "@/components/organisms/ori-data-table/data-table-column-header";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { formatNumber } from "@/utils/format-number";
import { formatPercent } from "@/utils/format-percent";

export const outHistoryColumns: ColumnDef<ProductOutHistory>[] = [
  {
    accessorKey: "sales.transaction_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Keluar" />
    ),
    cell: ({ row }) =>
      formatDate(row.original.sales.transaction_at, "29-12-2025 09:21"),
  },
  {
    accessorKey: "sales.sales_code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode Rujukan" />
    ),
  },
  {
    accessorKey: "sales.customer_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Pembeli" />
    ),
  },
  {
    accessorKey: "subtotal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nominal" />
    ),
    cell: ({ row }) => formatRupiah(row.original.subtotal),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kuantiti" />
    ),
    cell: ({ row }) => formatNumber(row.original.quantity),
  },
  {
    accessorKey: "margin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Margin" />
    ),
    cell: ({ row }) =>
      `${formatRupiah(row.original.margin, 2)} (${formatPercent(
        row.original.margin / row.original.subtotal,
        { maximumFractionDigits: 2 }
      )})`,
  },
];
