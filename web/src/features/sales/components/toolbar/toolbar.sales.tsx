import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { useSales } from "../../store/sales.provider";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { FilterPanel } from "@/components/filters/filter-panel/master.filter-panel";
import { useMemo } from "react";
import { salesFilterPanelConfig } from "../../constants/filter-panel-config.sales";

export function SalesToolbar() {
  const { query } = useSales();
  const { updateDateRange, updateFilter } = useQueryBasics();

  const memoInitialValue = useMemo(() => query?.filters ?? [], [query]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <FilterPanel config={salesFilterPanelConfig} initialValue={memoInitialValue} onApplyFilter={updateFilter} />
      <ToolbarDatepicker
        onApply={updateDateRange}
        date={{ from: query.from, to: query.to }}
        setDate={updateDateRange}
      />
    </div>
  );
}
