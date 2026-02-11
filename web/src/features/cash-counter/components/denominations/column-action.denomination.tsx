import {
  DropdownActionColumn,
  DropdownActionItems,
} from "@/components/organisms/data-table-columns/dropdown-action-columns";
import { Row } from "@tanstack/react-table";
import { CashDenomination } from "../../types/types.cash-counter-denomination";
import { useDenomination } from "../../store/denomination.provider";

interface Props {
  row: Row<CashDenomination>;
}

export function ColumnActionDenomination({ row }: Props) {
  const { id, label } = row.original;
  const { setEditDialog } = useDenomination();

  const items: DropdownActionItems[] = [
    {
      itemLabel: "Edit",
      onClick: () => setEditDialog(id),
    },
  ];
  return <DropdownActionColumn menuLabel={`Menu (${label})`} items={items} />;
}
