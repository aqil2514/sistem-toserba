import {
  DropdownActionColumn,
  DropdownActionItems,
} from "@/components/organisms/data-table-columns/dropdown-action-columns";
import { Row } from "@tanstack/react-table";
import { useCashCounts } from "../../store/cash-counting.provider";
import { CashCounts } from "../../types/type.cash-counter-cash-counting";
import { formatDate } from "@/utils/format-date.fns";

interface Props {
  row: Row<CashCounts>;
}

export function ColumnActionCashCounting({ row }: Props) {
  const { id, date } = row.original;
  const { setDetailDialog } = useCashCounts();

  const items: DropdownActionItems[] = [
    {
      itemLabel: "Detail",
      onClick: () => setDetailDialog(id),
    },
  ];
  return <DropdownActionColumn menuLabel={`Tanggal (${formatDate(date, "Senin, 29 Desember 2025")})`} items={items} />;
}
