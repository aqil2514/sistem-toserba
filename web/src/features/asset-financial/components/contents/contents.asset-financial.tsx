import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAssetFinancial } from "../../store/asset-financial.store";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { InfoItem } from "@/components/molecules/items/info-item";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { Separator } from "@/components/ui/separator";

export function AssetFinancialContents() {
  const { data, isLoading } = useAssetFinancial();

  if (isLoading) return <LoadingSpinner label="Mengambil data..." />;
  if (!data) return null;

  const filteredData = data.filter((d) => d.asset !== "Piutang" && d.asset !== "Utang" )

  return (
    <div className="grid grid-cols-3 gap-4">
      {filteredData.map((asset) => (
        <Card key={asset.asset}>
          <CardHeader>
            <CardTitle>{asset.asset}</CardTitle>
            <CardDescription>
              Informasi saldo dari aset {asset.asset}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />

            <div className="flex justify-between">
              <InfoItem
                label="Pemasukan"
                value={
                  <p className="text-green-500">{formatRupiah(asset.income)}</p>
                }
              />
              <InfoItem
                label="Pengeluaran"
                value={
                  <p className="text-red-500">{formatRupiah(asset.expense)}</p>
                }
              />
            </div>
            <Separator />
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="font-semibold">Total :</p>
            <p className="font-semibold">{formatRupiah(asset.total)}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
