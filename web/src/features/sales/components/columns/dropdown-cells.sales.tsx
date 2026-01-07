import { Row } from "@tanstack/react-table";
import { SalesHeader } from "../../types/sales-header";
import { useSales } from "../../store/sales.provider";
import {
  DropdownActionColumn,
  DropdownActionItems,
} from "@/components/organisms/data-table-columns/dropdown-action-columns";

interface Props {
  row: Row<SalesHeader>;
}
export function SalesColumnAction({ row }: Props) {
  const { setDetailSalesId, setEditSalesId, setDeleteSalesId } = useSales();

  const items: DropdownActionItems[] = [
    {
      itemLabel: "Detail",
      onClick: () => setDetailSalesId(row.original.id),
    },
    {
      itemLabel: "Edit",
      onClick: () => setEditSalesId(row.original.id),
    },
    {
      itemLabel: "Hapus",
      onClick: () => setDeleteSalesId(row.original.id),
    },
  ];

  return (
    <DropdownActionColumn
      menuLabel={`${row.original.sales_code} (${row.original.customer_name})`}
      items={items}
    />
  );
}
