import { ColumnDef } from "@tanstack/react-table";
import { CashDenomination } from "../../types/types.cash-counter-denomination";
import { Badge } from "@/components/ui/badge";
import { ColumnActionDenomination } from "./column-action.denomination";

export const denominationColumns: ColumnDef<CashDenomination>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "nominal",
    header: "Nilai",
  },
  {
    accessorKey: "type",
    header: "Tipe",
    cell: ({ row }) => (row.original.type === "coin" ? "Koin" : "Kertas"),
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.is_active;

      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Aktif" : "Nonaktif"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => <ColumnActionDenomination row={row} />,
  },
];
