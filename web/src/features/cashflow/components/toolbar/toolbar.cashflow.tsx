import { ToolbarDatepicker } from "@/components/molecules/filters/toolbar-datepicker";
import { useCashflow } from "../../store/provider.cashflow";

export function CashflowToolbar() {
  const { updateQuery, query } = useCashflow();
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
