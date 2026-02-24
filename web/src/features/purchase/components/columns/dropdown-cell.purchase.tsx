import {
  DropdownActionColumn,
  DropdownActionItems,
} from "@/components/organisms/data-table-columns/dropdown-action-columns";
import { Row } from "@tanstack/react-table";
import { Purchase } from "../../types/purchase";
import { useQueryParams } from "@/hooks/use-query-params";

interface Props {
  row: Row<Purchase>;
}

export function PurchaseColumnAction({ row }: Props) {
  const { update } = useQueryParams();

  const items: DropdownActionItems[] = [
    {
      itemLabel: "Detail",
      onClick: () =>
        update({
          action: "detail",
          id: row.original.id,
        }),
    },
    {
      itemLabel: "Edit",
      onClick: () =>
        update({
          action: "edit",
          id: row.original.id,
        }),
    },
    {
      itemLabel: "Hapus",
      onClick: () =>
        update({
          action: "delete",
          id: row.original.id,
          purchase_type: row.original.purchase_type,
        }),
    },
  ];

  return (
    <DropdownActionColumn
      menuLabel={`${row.original.purchase_code} (${row.original.supplier_name})`}
      items={items}
    />
  );
}
