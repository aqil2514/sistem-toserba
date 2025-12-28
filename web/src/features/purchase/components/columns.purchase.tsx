import { ColumnDef } from "@tanstack/react-table";
import { Purchase } from "../types/purchase";
import { formatDate } from "@/utils/format-date";
import { PurchaseActions } from "./action.purchase";

type PurchaseColumnActions = {
  onDelete: (purchase: Purchase) => void;
  onDetail: (purchase: Purchase) => void;
};

export const purchaseColumns = ({
  onDelete,
  onDetail,
}: PurchaseColumnActions): ColumnDef<Purchase>[] => [
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
        {formatDate(row.original.purchase_date)}
      </span>
    ),
  },
  {
    accessorKey: "supplier_name",
    header: "Supplier",
    cell: ({ row }) =>
      row.original.supplier_name ? (
        row.original.supplier_name
      ) : (
        <span className="italic text-muted-foreground">Tanpa supplier</span>
      ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <PurchaseActions
          purchase={row.original}
          onDelete={onDelete}
          onDetail={onDetail}
        />
      </div>
    ),
  },
];
