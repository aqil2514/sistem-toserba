import {
  DropdownActionColumn,
  DropdownActionItems,
} from "@/components/organisms/data-table-columns/dropdown-action-columns";
import { useCashflow } from "@/features/cashflow/store/provider.cashflow";
import {  CashflowRpcReturn } from "@/features/cashflow/types/cashflow.types";
import { Row } from "@tanstack/react-table";

interface Props {
  row: Row<CashflowRpcReturn>;
}

export function SelectRow({ row }: Props) {
  const { setEditDialog, setDeleteDialog } = useCashflow();
  const items: DropdownActionItems[] = [
    {
      itemLabel: "Detail",
      onClick: () => alert(row.original),
    },
    {
      itemLabel: "Edit",
      onClick: () => setEditDialog(row.original.id),
    },
    {
      itemLabel: "Hapus",
      onClick: () => setDeleteDialog(row.original.id),
      className: "text-red-500",
    },
  ];

  return (
    <DropdownActionColumn
      menuLabel={`${row.original.product_service} (${row.original.status_cashflow})`}
      items={items}
    />
  );
}
