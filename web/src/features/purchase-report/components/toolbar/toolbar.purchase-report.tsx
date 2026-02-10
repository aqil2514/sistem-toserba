import { useMemo } from "react";
import { usePurchaseReport } from "../../store/provider.purchase-report";
import {
  FilterKeyType,
  MultiFilter,
} from "@/components/filters/multi-filter";
import { SingleSorting, SortingKeyType } from "@/components/molecules/sorting/single-sorting";
import { ToolbarDatepicker } from "@/components/filters/filter-date-range";

const filterKey: FilterKeyType[] = [
  {
    filterKey: "purchase_code",
    label: "Kode Pembelian",
  },
  {
    filterKey: "supplier_name",
    label: "Nama Supplier",
  },
  {
    filterKey: "supplier_type",
    label: "Tipe Supplier",
  },
  {
    filterKey: "product_name",
    label: "Nama Produk",
  },
  {
    filterKey: "product_category",
    label: "Kategori Produk",
  },
  {
    filterKey: "product_subcategory",
    label: "Sub Kategori Produk",
  },
];

const sortingkeys:SortingKeyType[] =[
  {
    sortingKey: "purchase_code",
    label: "Kode Pembelian",
  },
  {
    sortingKey: "supplier_name",
    label: "Nama Supplier",
  },
  {
    sortingKey: "supplier_type",
    label: "Tipe Supplier",
  },
  {
    sortingKey: "product_name",
    label: "Nama Produk",
  },
  {
    sortingKey: "product_category",
    label: "Kategori Produk",
  },
  {
    sortingKey: "product_subcategory",
    label: "Sub Kategori Produk",
  },
  {
    sortingKey: "quantity",
    label: "Kuantiti",
  },
  {
    sortingKey: "remaining_quantity",
    label: "Kuantiti Tersisa",
  },
  {
    sortingKey: "price",
    label: "Harga",
  },
  {
    sortingKey: "hpp",
    label: "HPP",
  },
];

export function PurchaseReportToolbar() {
  const { query, updateQuery } = usePurchaseReport();

  const memoQueryFilter = useMemo(() => query.filters, [query.filters]);

  return (
    <div className="flex gap-4 items-center">
      <MultiFilter
        filterKeys={filterKey}
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
        }}
      />
    </div>
  );
}
