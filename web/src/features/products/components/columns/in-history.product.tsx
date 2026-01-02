import { ColumnDef } from "@tanstack/react-table";
import {  ProductInHistory } from "../../types/product-in-history";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { formatDate } from "@/utils/format-date.fns";
import { DataTableColumnHeader } from "@/components/organisms/ori-data-table/data-table-column-header";

export const inHistoryColumns: ColumnDef<ProductInHistory>[] = [
  {
    accessorKey: "purchase.purchase_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Pembelian" />
    ),
    cell: ({ row }) =>
      formatDate(row.original.purchase.purchase_date, "29 Desember 2025"),
  },
  {
    accessorKey: "purchase.purchase_code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode Pembelian" />
    ),
  },
  {
    accessorKey: "purchase.supplier_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Supplier" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Harga Beli" />
    ),
    cell: ({ row }) => formatRupiah(row.original.price),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kuantiti" />
    ),
  },
  {
    accessorKey: "remaining_quantity",
     header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sisa Kuantiti" />
    ),
  },
  {
    accessorKey: "hpp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="HPP" />
    ),
    cell: ({ row }) => formatRupiah(row.original.hpp),
  },
];
