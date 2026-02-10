import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { useSalesReport } from "../../store/provider.sales-report";
import { MultiFilter } from "@/components/filters/multi-filter";
import { SingleSorting } from "@/components/molecules/sorting/single-sorting";
import { getSortKey } from "../../utils/get-sort-key";
import { getFilterKey } from "../../utils/get-filter-key";
import { ReportContent } from "../../types/query.report-sales";
import { useMemo } from "react";

export function SalesReportToolbar() {
  const { query, updateQuery } = useSalesReport();

  const memoQueryFilter = useMemo(() => query.filters, [query.filters])

  const filterKeys = getFilterKey(query);
  const sortKeys = getSortKey(query);

  const visibleIn: ReportContent[] = ["detail", "summary"];

  return (
    <div className="flex gap-4 items-center">
      {visibleIn.includes(query.content) && (
        <MultiFilter
          filterKeys={filterKeys}
          initialValue={memoQueryFilter ?? []}
          onApplyFilter={(state) => updateQuery("filters", state)}
        />
      )}
      {visibleIn.includes(query.content) && query.content !=='summary' && <SingleSorting
        sortingkeys={sortKeys}
        onSortStateChange={(query) => updateQuery("sort", query)}
      />}
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
