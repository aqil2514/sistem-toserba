import { Spinner } from "@/components/ui/spinner";
import { useAssetFinancial } from "../../store/asset-financial.store";
import { extractAsset } from "../../utils/extract-asset";
import { LabelValueWithColor } from "@/@types/general";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { FloatingSummaryHeader } from "./floating-summary-header";

export function AssetFinancialHeader() {
  const { data, headerSelected, setHeaderSelected, assetSelected } =
    useAssetFinancial();
  const result = extractAsset(data);

  if (!result.isReady) return <Spinner />;

  const stats: LabelValueWithColor<number>[] = [
    {
      label: "Total Aset",
      value: result.totalAsset,
      color: "text-blue-600",
    },
    {
      label: "Aset Cair",
      value: result.liquidAsset,
      color: "text-green-600",
    },
    {
      label: "Piutang",
      value: result.receivableAsset,
      color: "text-yellow-600",
    },
    {
      label: "Utang",
      value: result.payableAsset,
      color: "text-red-600",
    },
  ];

  const clickHandler = (
    isIncludeThisStat: boolean,
    stat: LabelValueWithColor<number>,
  ) => {
    if (assetSelected.length > 0)
      return toast.info("Reset atau nonaktifkan dulu ringkasan aset");
    setHeaderSelected((prev) => {
      if (isIncludeThisStat) {
        return prev.filter((item) => item.label !== stat.label);
      } else {
        return [...prev, stat];
      }
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const isIncludeThisStat = headerSelected.find(
            (val) => val.label === stat.label,
          );
          return (
            <div
              key={stat.label}
              className={cn(
                "rounded-xl border p-4 bg-white shadow-sm cursor-pointer hover:scale-105 active:scale-100 duration-200",
                isIncludeThisStat && "border-2 border-blue-500",
              )}
              onClick={() => clickHandler(Boolean(isIncludeThisStat), stat)}
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color ?? ""}`}>
                {formatRupiah(stat.value)}
              </p>
            </div>
          );
        })}
      </div>

      <FloatingSummaryHeader />
    </>
  );
}
