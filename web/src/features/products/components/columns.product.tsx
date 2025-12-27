import { ColumnDef } from "@tanstack/react-table";
import { Product } from "../type";
import { ProductActions } from "./actions.product";

export const productColumns = (
  onEdit: (product: Product) => void,
  onDelete: (product: Product) => void
): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "category",
    header: "Kategori",
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) =>
      `Rp ${row.original.price.toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "unit",
    header: "Satuan",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ProductActions
        onEdit={() => onEdit(row.original)}
        onDelete={() => onDelete(row.original)}
      />
    ),
  },
];
