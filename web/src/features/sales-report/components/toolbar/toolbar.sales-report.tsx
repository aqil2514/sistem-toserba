import { ToolbarDatepicker } from "@/components/molecules/filters/toolbar-datepicker";
import { useSalesReport } from "../../store/provider.sales-report";
import {
  FilterKeyType,
  MultiFilter,
} from "@/components/molecules/filters/multi-filter";
import { SalesReportQuery } from "../../types/query.report-sales";
import {
  SingleSorting,
  SortingKeyType,
} from "@/components/molecules/sorting/single-sorting";

const getFilterKey = (query: SalesReportQuery): FilterKeyType[] => {
  if (query.mode === "summary-product")
    return [
      {
        filterKey: "product_id.name",
        label: "Nama Produk",
      },
      {
        filterKey: "product_id.category",
        label: "Kategori Produk",
      },
      {
        filterKey: "product_id.subcategory",
        label: "Subkategori Produk",
      },
    ];
  return [
    {
      filterKey: "sales_id.customer_name",
      label: "Pembeli",
    },
    {
      filterKey: "sales_id.payment_method",
      label: "Metode Pembayaran",
    },
    {
      filterKey: "product_id.name",
      label: "Produk",
    },
    {
      filterKey: "product_id.category",
      label: "Kategori Produk",
    },
    {
      filterKey: "product_id.subcategory",
      label: "Subkategori Produk",
    },
  ];
};

const getSortKey = (query: SalesReportQuery): SortingKeyType[] => {
  if (query.mode === "summary-product")
    return [
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
        label: "Subkategori Produk",
      },
      {
        sortingKey: "quantity",
        label: "Kuantiti",
      },
      {
        sortingKey: "hpp",
        label: "Total HPP",
      },
      {
        sortingKey: "margin",
        label: "Total Margin",
      },
      {
        sortingKey: "subtotal",
        label: "Total Belanja",
      },
      {
        sortingKey: "tip",
        label: "Total Tip",
      },
      {
        sortingKey: "markup_percent",
        label: "Total Markup %",
      },
      {
        sortingKey: "margin_percent",
        label: "Total Margin %",
      },
    ];
  return [
    {
      sortingKey: "sales_id.customer_name",
      label: "Pembeli",
    },
    {
      sortingKey: "sales_id.payment_method",
      label: "Metode Pembayaran",
    },
    {
      sortingKey: "product_id.name",
      label: "Produk",
    },
    {
      sortingKey: "product_id.category",
      label: "Kategori Produk",
    },
    {
      sortingKey: "product_id.subcategory",
      label: "Subkategori Produk",
    },
  ];
};

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
