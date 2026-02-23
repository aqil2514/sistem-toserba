import { ColumnDef } from "@tanstack/react-table";
import { Purchase } from "../../types/purchase";
import { formatDate } from "@/utils/format-date.fns";
import { PurchaseColumnAction } from "./dropdown-cell.purchase";
import {
  purchaseTypeClassName,
  purchaseTypeLabel,
} from "../../constants/purchase-type.constants";
import {
  purchaseStatusClassName,
  purchaseStatusLabel,
} from "../../constants/purchase-status.constants";
import { Badge } from "@/components/ui/badge";

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
    accessorKey: "purchase_type",
    header: "Tipe Pembelian",
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className={purchaseTypeClassName[row.original.purchase_type]}
      >
        {purchaseTypeLabel[row.original.purchase_type]}
      </Badge>
    ),
  },
  {
    accessorKey: "purchase_status",
    header: "Status Pembelian",
    cell: ({ row }) => {
      return (
        <Badge
          variant="outline"
          className={purchaseStatusClassName[row.original.purchase_status]}
        >
          {purchaseStatusLabel[row.original.purchase_status]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => <PurchaseColumnAction row={row} />,
  },
];
