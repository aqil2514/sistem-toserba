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
import { cn } from "@/lib/utils";
import { FloatingSummaryContents } from "./floating-summary-contents";
import { AssetRpcReturn } from "../../types/api-return";
import { toast } from "sonner";

export function AssetFinancialContents() {
  const { data, isLoading, assetSelected, setAssetSelected, headerSelected } =
    useAssetFinancial();

  if (isLoading) return <LoadingSpinner label="Mengambil data..." />;
  if (!data) return null;

  const filteredData = data.filter(
    (d) => d.asset !== "Piutang" && d.asset !== "Utang",
  );

  const clickHandler = (isIncludeThisAsset: boolean, asset: AssetRpcReturn) => {
    if (headerSelected.length > 0)
      return toast.info("Reset dlu hasil Ringkasan Header");
    setAssetSelected((prev) => {
      if (isIncludeThisAsset) {
        return prev.filter((item) => item.asset !== asset.asset);
      } else {
        return [...prev, asset];
      }
    });
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {filteredData.map((asset) => {
          const isIncludeThisAsset = assetSelected.find(
            (item) => asset.asset === item.asset,
          );

          return (
            <Card
              key={asset.asset}
              className={cn(
                "cursor-pointer hover:scale-105 active:scale-100 duration-200",
                isIncludeThisAsset && "border-2 border-blue-500",
              )}
              onClick={() => clickHandler(Boolean(isIncludeThisAsset), asset)}
            >
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
                      <p className="text-green-500">
                        {formatRupiah(asset.income)}
                      </p>
                    }
                  />
                  <InfoItem
                    label="Pengeluaran"
                    value={
                      <p className="text-red-500">
                        {formatRupiah(asset.expense)}
                      </p>
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
          );
        })}
      </div>

      <FloatingSummaryContents />
    </>
  );
}
