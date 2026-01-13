import { ToolbarDatepicker } from "@/components/molecules/filters/toolbar-datepicker";
import { useSalesReport } from "../../store/provider.sales-report";
import {
  MultiFilter,
} from "@/components/molecules/filters/multi-filter";
import { SingleSorting } from "@/components/molecules/sorting/single-sorting";
import { getSortKey } from "../../utils/get-sort-key";
import { getFilterKey } from "../../utils/get-filter-key";

export function SalesReportToolbar() {
  const { query, updateQuery } = useSalesReport();

  const filterKeys = getFilterKey(query);
  const sortKeys = getSortKey(query);

  return (
    <div className="flex gap-4 items-center">
      <MultiFilter
        filterKeys={filterKeys}
        initialValue={query.filters ?? []}
        onApplyFilter={(state) => updateQuery("filters", state)}
      />
      <SingleSorting
        sortingkeys={sortKeys}
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
