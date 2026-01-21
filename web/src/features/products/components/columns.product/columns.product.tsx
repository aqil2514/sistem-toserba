import { ColumnDef } from "@tanstack/react-table";
import { Product } from "../../types/type";
import { SelectRow } from "./row/select-row.product";
import { Badge } from "@/components/ui/badge";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => {
      const isDeleted = row.original.deleted_at;
      return (
        <>
          {isDeleted && <Badge variant={"destructive"}>DELETED</Badge>}{" "}
          {row.original.name}
        </>
      );
    },
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
  {
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => <SelectRow row={row} />,
  },
];
