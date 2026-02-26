import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAssetContext } from "../store/assets.store";
import { formatRupiah } from "@/utils/format-to-rupiah";
import React from "react";
import {
  PurchaseAssetsCondition,
  PurchaseAssetsDbPopulated,
} from "@/features/purchase/types/items/purchase-assets.interface";

const getSummaryAssetByCondition = (
  data: PurchaseAssetsDbPopulated[],
  condition: PurchaseAssetsCondition,
) => {
  const totalPrice = data.reduce(
    (acc, curr) =>
      curr.condition === condition ? acc + curr.total_price : acc + 0,
    0,
  );

  const totalAsset = data.filter((d) => d.condition === condition).length;

  return { totalPrice, totalAsset };
};

export function AssetSummary() {
  const { data } = useAssetContext();
  if (!data) return null;

  const totalPrice = data.reduce((acc, curr) => acc + curr.total_price, 0);
  const damagedAsset = getSummaryAssetByCondition(data, "damaged");
  const newAsset = getSummaryAssetByCondition(data, "new");
  const secondAsset = getSummaryAssetByCondition(data, "second");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <CardComponoent
        title="Total Nilai Aset Baru"
        value={`${formatRupiah(newAsset.totalPrice)} (${newAsset.totalAsset} aset)`}
      />
      <CardComponoent
        title="Total Nilai Aset Second"
        value={`${formatRupiah(secondAsset.totalPrice)} (${secondAsset.totalAsset} aset)`}
      />
      <CardComponoent
        title="Total Nilai Aset Rusak"
        value={`${formatRupiah(damagedAsset.totalPrice)} (${damagedAsset.totalAsset} aset)`}
      />
      <CardComponoent
        title="Total Nilai Aset"
        value={`${formatRupiah(totalPrice)} (${data.length} aset)`}
      />
    </div>
  );
}

const CardComponoent: React.FC<{
  title: string;
  value: string;
  description?: string;
}> = ({ title, value, description }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-xl">{value}</p>
      </CardContent>
    </Card>
  );
};
