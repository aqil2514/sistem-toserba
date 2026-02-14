import {
  DropdownActionColumn,
  DropdownActionItems,
} from "@/components/organisms/data-table-columns/dropdown-action-columns";
import { Row } from "@tanstack/react-table";
import { CashCounts } from "../../../../types/type.cash-counter-cash-counting";
import { formatDate } from "@/utils/format-date.fns";
import { useQueryParams } from "@/hooks/use-query-params";

interface Props {
  row: Row<CashCounts>;
}

export function ColumnActionCashCounting({ row }: Props) {
  const { id, date } = row.original;
  const { update } = useQueryParams();

  const items: DropdownActionItems[] = [
    {
      itemLabel: "Detail",
      onClick: () => {
        update({
          action: "detail",
          id,
        });
      },
    },
    {
      itemLabel: "Edit",
      onClick: () => {
        update({
          action: "edit",
          id,
        });
      },
    },
    {
      itemLabel: "Duplikat",
      onClick: () => {
        update({
          action: "copy",
          id,
        });
      },
    },
    {
      itemLabel: "Hapus",
      onClick: () => {
        update({
          action: "delete",
          id,
        });
      },
    },
  ];
  return (
    <DropdownActionColumn
      menuLabel={`Tanggal (${formatDate(date, "Senin, 29 Desember 2025")})`}
      items={items}
    />
  );
}
