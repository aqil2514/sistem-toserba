import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Purchase } from "../types/purchase";

export const purchaseColumns = (
  onDelete: (purchase: Purchase) => void
): ColumnDef<Purchase>[] => [
  {
    accessorKey: "purchase_code",
    header: "Kode",
  },
  {
    accessorKey: "purchase_date",
    header: "Tanggal",
  },
  {
    accessorKey: "supplier_name",
    header: "Supplier",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button
        variant="destructive"
        size="sm"
        onClick={() => onDelete(row.original)}
      >
        Hapus
      </Button>
    ),
  },
];
