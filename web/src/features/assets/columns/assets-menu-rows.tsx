import {
  DropdownActionColumn,
  DropdownActionItems,
} from "@/components/organisms/data-table-columns/dropdown-action-columns";
import { PurchaseAssetsDbPopulated } from "@/features/purchase/types/items/purchase-assets.interface";
import { useWindow } from "@/hooks/use-window";
import { Row } from "@tanstack/react-table";

interface Props {
  row: Row<PurchaseAssetsDbPopulated>;
}
const params = new URLSearchParams();

export function AssetMenuRow({ row }: Props) {
  const { asset_name, purchase, purchase_id } = row.original;
  const { openNewWindow } = useWindow();

  const editHandler = () => {
    params.set("action", "edit");
    params.set("id", purchase_id);
    openNewWindow(`/purchase?${params.toString()}`);
  };

  const items: DropdownActionItems[] = [
    {
      itemLabel: "Edit Data Aset",
      onClick: editHandler,
    },
  ];
  return (
    <DropdownActionColumn
      items={items}
      menuLabel={`${asset_name} (${purchase.purchase_code})`}
    />
  );
}
