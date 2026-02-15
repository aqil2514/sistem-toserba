import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { useActivity } from "../store/activity.store";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { FilterPanel } from "@/components/filters/filter-panel/master.filter-panel";
import { activityFilterPanel } from "../constants/activity-filter-panel-config";
import { useMemo } from "react";

export function ActivityToolbar() {
  const { query } = useActivity();
  const { updateDateRange, updateFilter } = useQueryBasics();

  const memoInitialValue = useMemo(() => query?.filters ?? [], [query]);

  return (
    <div className="flex gap-4">
      <FilterPanel
        config={activityFilterPanel}
        initialValue={memoInitialValue}
        onApplyFilter={updateFilter}
      />
      <ToolbarDatepicker
        date={{
          from: query.from,
          to: query.to,
        }}
        onApply={updateDateRange}
        setDate={updateDateRange}
      />
    </div>
  );
}
