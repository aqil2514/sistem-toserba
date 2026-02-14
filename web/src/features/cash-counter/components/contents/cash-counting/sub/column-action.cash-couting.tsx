import {
  DropdownActionColumn,
  DropdownActionItems,
} from "@/components/organisms/data-table-columns/dropdown-action-columns";
import { Row } from "@tanstack/react-table";
import { useCashCounts } from "../../../../store/cash-counting.provider";
import { CashCounts } from "../../../../types/type.cash-counter-cash-counting";
import { formatDate } from "@/utils/format-date.fns";

interface Props {
  row: Row<CashCounts>;
}

export function ColumnActionCashCounting({ row }: Props) {
  const { id, date } = row.original;
  const { setOpenDialog } = useCashCounts();

  const items: DropdownActionItems[] = [
    {
      itemLabel: "Detail",
      onClick: () => setOpenDialog({ type: "detail", id }),
    },
    {
      itemLabel: "Edit",
      onClick: () => setOpenDialog({ type: "edit", id }),
    },
    {
      itemLabel: "Duplikat",
      onClick: () => setOpenDialog({ type: "copy", id }),
    },
    {
      itemLabel: "Hapus",
      onClick: () => setOpenDialog({ type: "delete", id }),
    },
  ];
  return (
    <DropdownActionColumn
      menuLabel={`Tanggal (${formatDate(date, "Senin, 29 Desember 2025")})`}
      items={items}
    />
  );
}
