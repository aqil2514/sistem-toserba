import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { useAssetFinancial } from "../../store/asset-financial.store";
import { Spinner } from "@/components/ui/spinner";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { AssetRpcReturn } from "../../types/api-return";

type ExtractAssetResult =
  | { isReady: false }
  | {
      isReady: true;
      totalAsset: number;
      liquidAsset: number;
      receivableAsset: number;
      payableAsset: number;
    };

const extractAsset = (
  data: AssetRpcReturn[] | undefined,
): ExtractAssetResult => {
  if (!data) return { isReady: false };
  const totalAsset = data.reduce((acc, curr) => acc + curr.total, 0);

  const liquidAsset = data
    .filter((d) => d.asset !== "Piutang" && d.asset !== "Utang")
    .reduce((acc, curr) => acc + curr.total, 0);

  const receivableAsset = data.find((d) => d.asset === "Piutang")?.total ?? 0;
  const payableAsset = data.find((d) => d.asset === "Utang")?.total ?? 0;

  return {
    isReady: true,
    totalAsset,
    liquidAsset,
    receivableAsset,
    payableAsset,
  };
};

export function AssetFinancialToolbar() {
  const { query, updateQuery } = useAssetFinancial();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <ToolbarDatepicker
          onApply={(date) => {
            updateQuery("from", date.from);
            updateQuery("to", date.to);
          }}
          date={{ from: query.from, to: query.to }}
          setDate={(date) => {
            updateQuery("from", date.from);
            updateQuery("to", date.to);
          }}
        />
      </div>
      <AssetSummary />
    </div>
  );
}

const AssetSummary = () => {
  const { data } = useAssetFinancial();
  const result = extractAsset(data);

  if (!result.isReady) return <Spinner />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Asset */}
      <div className="rounded-xl border p-4">
        <p className="text-sm text-gray-500">Total Aset</p>
        <p className="text-2xl font-bold text-blue-600">
          {formatRupiah(result.totalAsset)}
        </p>
      </div>

      {/* Liquid Asset */}
      <div className="rounded-xl border p-4">
        <p className="text-sm text-gray-500">Aset Cair</p>
        <p className="text-2xl font-bold text-green-600">
          {formatRupiah(result.liquidAsset)}
        </p>
      </div>

      {/* Receivable */}
      <div className="rounded-xl border p-4">
        <p className="text-sm text-gray-500">Piutang</p>
        <p className="text-2xl font-bold text-yellow-600">
          {formatRupiah(result.receivableAsset)}
        </p>
      </div>

      {/* Payable */}
      <div className="rounded-xl border p-4">
        <p className="text-sm text-gray-500">Utang</p>
        <p className="text-2xl font-bold text-red-600">
          {formatRupiah(result.payableAsset)}
        </p>
      </div>
    </div>
  );
};
