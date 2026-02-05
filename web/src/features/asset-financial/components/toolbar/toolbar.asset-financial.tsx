import { ToolbarDatepicker } from "@/components/molecules/filters/toolbar-datepicker";
import { useAssetFinancial } from "../../store/asset-financial.store";
import { Spinner } from "@/components/ui/spinner";
import { formatRupiah } from "@/utils/format-to-rupiah";

export function AssetFinancialToolbar() {
  const { query, updateQuery, data } = useAssetFinancial();
  const totalAsset = data?.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="flex justify-between items-center">
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
      {totalAsset ? (
        <p className="font-semibold text-xl">
          Total Aset : {" "}
          <span className="font-bold text-xl text-blue-500">
            {formatRupiah(totalAsset)}
          </span>
        </p>
      ) : (
        <span>
          <Spinner />
        </span>
      )}
    </div>
  );
}
