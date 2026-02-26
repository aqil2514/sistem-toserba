import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAssetContext } from "../store/assets.store";
import { formatRupiah } from "@/utils/format-to-rupiah";

export function AssetSummary() {
  const { data } = useAssetContext();
  const totalAsset =
    data?.reduce((acc, curr) => acc + curr.total_price, 0) ?? 0;
  return (
    <div className="grid grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Total Nilai Aset</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-xl">{formatRupiah(totalAsset)}</p>
        </CardContent>
      </Card>
    </div>
  );
}
