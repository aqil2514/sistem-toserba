import { ToolbarDatepicker } from "@/components/molecules/filters/toolbar-datepicker";
import { usePurchase } from "../../store/provider.purchase";

export function PurchaseToolbar() {
  const { updateQuery, query } = usePurchase();
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
