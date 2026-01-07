import {
  DropdownActionColumn,
  DropdownActionItems,
} from "@/components/organisms/data-table-columns/dropdown-action-columns";
import { usePurchase } from "../../store/provider.purchase";
import { Row } from "@tanstack/react-table";
import { Purchase } from "../../types/purchase";

interface Props {
  row: Row<Purchase>;
}

export function PurchaseColumnAction({ row }: Props) {
  const { setDetailPurchaseId, setEditPurchaseId, setDeletePurchaseId } =
    usePurchase();

  const items: DropdownActionItems[] = [
    {
      itemLabel: "Detail",
      onClick: () => setDetailPurchaseId(row.original.id),
    },
    {
      itemLabel: "Edit",
      onClick: () => setEditPurchaseId(row.original.id),
    },
    {
      itemLabel: "Hapus",
      onClick: () => setDeletePurchaseId(row.original.id),
    },
  ];

  return (
    <DropdownActionColumn
      menuLabel={`${row.original.purchase_code} (${row.original.supplier_name})`}
      items={items}
    />
  );
}
