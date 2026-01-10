import { ToolbarDatepicker } from "@/components/molecules/toolbar-datepicker";
import { useSalesReport } from "../../store/provider.sales-report";

export function SalesReportToolbar() {
  const { query, updateQuery } = useSalesReport();
  return (
    <div>
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
