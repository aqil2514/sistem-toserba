import { ToolbarDatepicker } from "@/components/molecules/filters/toolbar-datepicker";
import { useSalesReport } from "../../store/provider.sales-report";
import {
  FilterKeyType,
  MultiFilter,
} from "@/components/molecules/filters/multi-filter";
import { SalesReportQuery } from "../../types/query.report-sales";

const getFilterKey = (query: SalesReportQuery): FilterKeyType[] => {
  if (query.mode === 'summary-product')
    return [
      {
        filterKey: "product_id.name",
        label: "Nama Produk",
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
  ];
};

export function SalesReportToolbar() {
  const { query, updateQuery } = useSalesReport();

  const filterKeys = getFilterKey(query);
  return (
    <div className="flex gap-4 items-center">
      <MultiFilter
        filterKeys={filterKeys}
        initialValue={query.filters ?? []}
        onApplyFilter={(state) => updateQuery("filters", state)}
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
