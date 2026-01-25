import { useMemo } from "react";
import { usePurchaseReport } from "../../store/provider.purchase-report";
import { MultiFilter } from "@/components/molecules/filters/multi-filter";
import { SingleSorting } from "@/components/molecules/sorting/single-sorting";
import { ToolbarDatepicker } from "@/components/molecules/filters/toolbar-datepicker";

export function PurchaseReportToolbar() {
  const { query, updateQuery } = usePurchaseReport();

  const memoQueryFilter = useMemo(() => query.filters, [query.filters]);

  return (
    <div className="flex gap-4 items-center">
      <MultiFilter
        filterKeys={[]}
        initialValue={memoQueryFilter ?? []}
        onApplyFilter={(state) => updateQuery("filters", state)}
      />
      <SingleSorting
        sortingkeys={[]}
        onSortStateChange={(query) => updateQuery("sort", query)}
      />
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
  );
}
