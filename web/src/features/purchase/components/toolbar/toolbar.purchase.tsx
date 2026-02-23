import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { usePurchase } from "../../store/purchase.provider";
import { useMemo } from "react";
import {
  SingleSorting,
  SortingKeyType,
} from "@/components/molecules/sorting/single-sorting";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { FilterPanel } from "@/components/filters/filter-panel/master.filter-panel";
import { FilterConfig } from "@/components/filters/filter-panel/types.filter-panel";
import { useSupplierType } from "@/hooks/view-table/use-supplier-type";

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
  const { supplierTypeLabelValue } = useSupplierType();
  const memoQueryFilter = useMemo(() => query.filters ?? [], [query.filters]);

  const filterConfig = useMemo<FilterConfig[]>(() => {
    const basicQuery: FilterConfig[] = [
      {
        field: "purchase_code",
        label: "Kode Pembelian",
        type: "text",
        withOperator: true,
      },
      {
        field: "supplier_name",
        label: "Nama Supplier",
        type: "text",
        withOperator: true,
      },
    ];

    if (supplierTypeLabelValue) {
      const supplierTypeConfig: FilterConfig = {
        field: "supplier_type",
        label: "Tipe Supplier",
        type: "select",
        selectOptions: supplierTypeLabelValue,
      };
      basicQuery.push(supplierTypeConfig);
    }
    return basicQuery;
  }, [supplierTypeLabelValue]);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <FilterPanel
        initialValue={memoQueryFilter}
        onApplyFilter={updateFilter}
        config={filterConfig}
      />
      <SingleSorting onSortStateChange={updateSort} sortingkeys={sortingKey} />
      <ToolbarDatepicker
        onApply={updateDateRange}
        date={{ from: query.from, to: query.to }}
        setDate={updateDateRange}
      />
    </div>
  );
}
