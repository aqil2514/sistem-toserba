import {
  DropdownActionColumn,
  DropdownActionItems,
} from "@/components/organisms/data-table-columns/dropdown-action-columns";
import { useCashflow } from "@/features/cashflow/store/provider.cashflow";
import { CashflowDb } from "@/features/cashflow/types/cashflow.types";
import { Row } from "@tanstack/react-table";

interface Props {
  row: Row<CashflowDb>;
}

export function SelectRow({ row }: Props) {
  const { setEditDialog } = useCashflow();
  const items: DropdownActionItems[] = [
    {
      itemLabel: "Detail",
      onClick: () => alert(row.original),
    },
    {
      itemLabel: "Edit",
      onClick: () => setEditDialog(row.original),
    },
  ];

  return (
    <DropdownActionColumn
      menuLabel={`${row.original.product_service} (${row.original.category.name})`}
      items={items}
    />
  );
}
