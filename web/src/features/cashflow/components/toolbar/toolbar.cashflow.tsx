import { ToolbarDatepicker } from "@/components/molecules/filters/toolbar-datepicker";
import { useCashflow } from "../../store/provider.cashflow";
import {
  FilterKeyType,
  MultiFilter,
} from "@/components/molecules/filters/multi-filter";
import {
  SingleSorting,
  SortingKeyType,
} from "@/components/molecules/sorting/single-sorting";
import { useMemo } from "react";

const filterKeys: FilterKeyType[] = [
  {
    filterKey: "product_service",
    label: "Nama Produk / Jasa",
  },
  {
    filterKey: "cashflow_category",
    label: "Kategori",
  },
  {
    filterKey: "status_cashflow",
    label: "Status Cashflow",
  },
  {
    filterKey: "via",
    label: "Via",
  },
];

const sortingkeys: SortingKeyType[] = [
  {
    sortingKey: "transaction_at",
    label: "Tanggal",
  },
  {
    sortingKey: "product_service",
    label: "Nama Produk / Jasa",
  },
  {
    sortingKey: "cashflow_category",
    label: "Kategori",
  },
  {
    sortingKey: "status_cashflow",
    label: "Status Cashflow",
  },
  {
    sortingKey: "via",
    label: "Via",
  },
  {
    sortingKey: "price",
    label: "Nominal",
  },
];

export function CashflowToolbar() {
  const { updateQuery, query } = useCashflow();

  const memoQueryFilter = useMemo(() => query.filters, [query.filters]);
  return (
    <div className="flex gap-4 items-center">
      <MultiFilter
        filterKeys={filterKeys}
        initialValue={memoQueryFilter ?? []}
        onApplyFilter={(state) => updateQuery("filters", state)}
      />
      <SingleSorting
        sortingkeys={sortingkeys}
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
          updateQuery("page", 1);
        }}
      />
    </div>
  );
}
