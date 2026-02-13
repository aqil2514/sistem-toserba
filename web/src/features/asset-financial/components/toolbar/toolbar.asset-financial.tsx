import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { useAssetFinancial } from "../../store/asset-financial.store";

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
    </div>
  );
}
