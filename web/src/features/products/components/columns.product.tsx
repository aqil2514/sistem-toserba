import { ColumnDef } from "@tanstack/react-table";
import { Product } from "../type";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "category",
    header: "Kategori",
  },
  {
    accessorKey: "subcategory",
    header: "Sub Kategori",
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => `Rp ${row.original.price.toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "stock",
    header: "Kuantiti",
    cell: ({ row }) => `${row.original.stock} ${row.original.unit}`,
  },
  {
    accessorKey: "unit",
    header: "Satuan",
  },
];
