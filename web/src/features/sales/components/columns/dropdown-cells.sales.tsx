import { Row } from "@tanstack/react-table";
import { SalesHeader } from "../../types/sales-header";
import {
  DropdownActionColumn,
  DropdownActionItems,
} from "@/components/organisms/data-table-columns/dropdown-action-columns";
import { useQueryParams } from "@/hooks/use-query-params";

interface Props {
  row: Row<SalesHeader>;
}
export function SalesColumnAction({ row }: Props) {
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
        }),
      className: "text-red-500",
    },
  ];

  return (
    <DropdownActionColumn
      menuLabel={`${row.original.sales_code} (${row.original.customer_name})`}
      items={items}
    />
  );
}
