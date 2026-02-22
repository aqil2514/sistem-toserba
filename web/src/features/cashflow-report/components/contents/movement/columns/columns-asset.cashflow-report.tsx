import { MovementAssetViaSummary } from "@/features/cashflow-report/types/cashflow-report-api-return.types";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { ColumnDef } from "@tanstack/react-table";

export const movementAssetColumns: ColumnDef<MovementAssetViaSummary['data'][number]>[] = [
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) => formatDate(row.original.date, "Senin, 29 Desember 2025"),
  },
  {
    accessorKey: "via",
    header: "Aset",
  },
  {
    accessorKey: "running_total",
    header: "Pergerakan",
    cell: ({ row }) => formatRupiah(row.original.running_total),
  },
];
