import { ColumnDef } from "@tanstack/react-table";
import { CashDenomination } from "../../types/types.cash-counter-denomination";
import { Switch } from "@/components/ui/switch";
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
    accessorKey:"is_active",
    header:"Aktif?",
    cell:({row}) => <Switch checked={row.original.is_active} />
  },
  {
    accessorKey:"action",
    header:"Aksi",
    cell:({row}) => <ColumnActionDenomination row={row} />
  }
];
