import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { usePurchase } from "../../store/purchase.provider";
import { FilterKeyType, MultiFilter } from "@/components/filters/multi-filter";
import { useMemo } from "react";
import {
  SingleSorting,
  SortingKeyType,
} from "@/components/molecules/sorting/single-sorting";
import { useQueryBasics } from "@/hooks/use-query-basics";

const filterKey: FilterKeyType[] = [
  {
    filterKey: "supplier_name",
    label: "Nama Supplier",
  },
  {
    filterKey: "supplier_type",
    label: "Tipe Supplier",
  },
];

const sortingKey: SortingKeyType[] = [
  {
    sortingKey: "purchase_date",
    label: "Tanggal Pembelian",
  },
  {
    sortingKey: "supplier_name",
    label: "Nama Supplier",
  },
  {
    sortingKey: "supplier_type",
    label: "Tipe Supplier",
  },
];

export function PurchaseToolbar() {
  const { query } = usePurchase();
  const { updateDateRange, updateFilter, updateSort } = useQueryBasics();
  const memoQueryFilter = useMemo(() => query.filters, [query.filters]);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <MultiFilter
        initialValue={memoQueryFilter ?? []}
        filterKeys={filterKey}
        onApplyFilter={updateFilter}
      />
      <SingleSorting
        onSortStateChange={updateSort}
        sortingkeys={sortingKey}
      />
      <ToolbarDatepicker
        onApply={updateDateRange}
        date={{ from: query.from, to: query.to }}
        setDate={updateDateRange}
      />
    </div>
  );
}
