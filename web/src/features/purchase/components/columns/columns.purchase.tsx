import { ColumnDef } from "@tanstack/react-table";
import { Purchase } from "../../types/purchase";
import { formatDate } from "@/utils/format-date.fns";
import { PurchaseColumnAction } from "./dropdown-cell.purchase";

export const purchaseColumns: ColumnDef<Purchase>[] = [
  {
    accessorKey: "purchase_code",
    header: "Kode",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.purchase_code ?? "—"}</span>
    ),
  },
  {
    accessorKey: "purchase_date",
    header: "Tanggal",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatDate(row.original.purchase_date, "29 Desember 2025")}
      </span>
    ),
  },
  {
    accessorKey: "supplier_name",
    header: "Supplier",
  },
  {
    accessorKey: "supplier_type",
    header: "Jenis Supplier",
  },
  {
    accessorKey:"action",
    header:"Aksi",
    cell:({row}) => <PurchaseColumnAction row={row} />
  }
];
