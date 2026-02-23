import { Badge } from "@/components/ui/badge";
import { PurchaseAssetsDb } from "@/features/purchase/types/items/purchase-assets.interface";
import { PurchaseConsumablesDb } from "@/features/purchase/types/items/purchase-consumables.interface";
import { PurchaseItem } from "@/features/purchase/types/items/purchase-items.interface";
import { PurchaseType } from "@/features/purchase/types/purchase";
import { AnyItemTypes } from "@/features/purchase/types/purchase-api.types";
import { formatRupiah } from "@/utils/format-to-rupiah";
import React from "react";

interface Props {
  items: AnyItemTypes[];
  type: PurchaseType;
}

export function FlexDetailItemRender({ items, type }: Props) {
  switch (type) {
    case "assets":
      return <DetailAssetDb items={items as PurchaseAssetsDb[]} />;
    case "stock":
      return <DetailItemStock items={items as PurchaseItem[]} />;
    default:
      return <DetailConsumable items={items as PurchaseConsumablesDb[]} />;
  }
}

const DetailItemStock: React.FC<{ items: PurchaseItem[] }> = ({ items }) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="rounded-md border p-3 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{item.product_name ?? "—"}</p>
            <p className="text-sm font-semibold">{formatRupiah(item.price)}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{item.quantity} pcs</span>
            <span>·</span>
            <span>HPP {formatRupiah(item.hpp)}</span>
            <span>·</span>
            <span>Sisa {item.remaining_quantity} pcs</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const DetailAssetDb: React.FC<{ items: PurchaseAssetsDb[] }> = ({ items }) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="rounded-md border p-3 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{item.asset_name}</p>
            <p className="text-sm font-semibold">
              {formatRupiah(item.total_price)}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{item.unit_count} unit</span>
            <span>·</span>
            <span>{formatRupiah(item.unit_price)} / unit</span>
            <span>·</span>
            <Badge variant="outline" className="text-xs h-4">
              {item.condition}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

const DetailConsumable: React.FC<{ items: PurchaseConsumablesDb[] }> = ({
  items,
}) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="rounded-md border p-3 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{item.consumable_name}</p>
            <p className="text-sm font-semibold">
              {formatRupiah(item.total_price)}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{item.quantity} pcs</span>
            <span>·</span>
            <span>{formatRupiah(item.unit_price)} / pcs</span>
          </div>
        </div>
      ))}
    </div>
  );
};
