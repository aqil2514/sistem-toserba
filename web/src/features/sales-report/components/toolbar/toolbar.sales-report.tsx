import { ToolbarDatepicker } from "@/components/molecules/filters/toolbar-datepicker";
import { useSalesReport } from "../../store/provider.sales-report";
import {
  FilterKeyType,
  MultiFilter,
} from "@/components/molecules/filters/multi-filter";

const getFilterKey = (isSummarizedData: boolean): FilterKeyType[] => {
  if (isSummarizedData)
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
  const { query, updateQuery, isSummarizedData } = useSalesReport();

  const filterKeys = getFilterKey(isSummarizedData);
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
