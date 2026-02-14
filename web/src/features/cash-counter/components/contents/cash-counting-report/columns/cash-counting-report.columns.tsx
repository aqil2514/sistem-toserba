import { CashCountPivotReturn } from "@/features/cash-counter/types/types.cash-counter-report";
import { formatDate } from "@/utils/format-date.fns";
import { ColumnDef } from "@tanstack/react-table";

export function getCashCountingReportColumns(
  data: CashCountPivotReturn[],
): ColumnDef<CashCountPivotReturn>[] {
  const denominationKeys = Array.from(
    new Set(data.flatMap((row) => Object.keys(row.denominations))),
  ).sort((a, b) => {
  const getNumber = (val: string) =>
    Number(val.replace(/\D/g, ""));

    return getNumber(a) - getNumber(b)
  });

  const dynamicColumns: ColumnDef<CashCountPivotReturn>[] =
    denominationKeys.map((key) => {
      return {
        id: key,
        header: key,
        cell: ({ row }) => {
          return `${row.original.denominations[key]} pcs`;
        },
      };
    });

  return [
    {
      accessorKey: "date",
      header: "Tanggal",
      cell: ({ row }) =>
        formatDate(row.original.date, "Senin, 29 Desember 2025, 09:21"),
    },
    ...dynamicColumns,
  ];
}
