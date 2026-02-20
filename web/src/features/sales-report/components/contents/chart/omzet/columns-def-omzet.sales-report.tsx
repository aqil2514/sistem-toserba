import { LineChartData } from "@/components/molecules/chart/line-chart/line-chart";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { ColumnDef } from "@tanstack/react-table";

export const columnsDefOmzet: ColumnDef<LineChartData>[] = [
  {
    accessorKey: "label",
    header: "Tanggal",
    cell: ({ row }) =>
      formatDate(row.original.label, "Senin, 29 Desember 2025"),
  },
  {
    accessorKey: "value",
    header: "Omzet",
    cell: ({ row }) => formatRupiah(row.original.value),
    footer: ({ table }) => {
      const rows = table.getFilteredRowModel().rows;

      const total = rows.reduce((sum, row) => sum + row.original.value, 0);

      return formatRupiah(total);
    },
  },
];
