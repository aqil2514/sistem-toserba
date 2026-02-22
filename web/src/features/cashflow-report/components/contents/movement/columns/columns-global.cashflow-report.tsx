import { MovementAssetSummary } from "@/features/cashflow-report/types/api-return.types";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { ColumnDef } from "@tanstack/react-table";

export const movementGlobalColumns: ColumnDef<MovementAssetSummary['data'][number]>[] = [
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) => formatDate(row.original.date, "Senin, 29 Desember 2025"),
  },
  {
    accessorKey: "running_total",
    header: "Pergerakan",
    cell: ({ row }) => formatRupiah(row.original.running_total),
  },
];
