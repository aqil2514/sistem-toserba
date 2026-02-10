import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { usePurchase } from "../../store/provider.purchase";
import {
  FilterKeyType,
  MultiFilter,
} from "@/components/filters/multi-filter";
import { useMemo } from "react";
import {
  SingleSorting,
  SortingKeyType,
} from "@/components/molecules/sorting/single-sorting";

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
  const { updateQuery, query } = usePurchase();
  const memoQueryFilter = useMemo(() => query.filters, [query.filters]);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <MultiFilter
        initialValue={memoQueryFilter ?? []}
        filterKeys={filterKey}
        onApplyFilter={(state) => updateQuery("filters", state)}
      />
      <SingleSorting
        onSortStateChange={(state) => updateQuery("sort", state)}
        sortingkeys={sortingKey}
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
