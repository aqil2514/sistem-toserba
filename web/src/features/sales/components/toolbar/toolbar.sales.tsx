import { ToolbarDatepicker } from "@/components/molecules/toolbar-datepicker";
import { useSales } from "../../store/sales.provider";
import { SalesToolbarFilter } from "./toolbar-filter";
import { SalesToolbarSorting } from "./toolbar-sorting";

export function SalesToolbar() {
  const { query, updateQuery } = useSales();

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
      <SalesToolbarSorting />
      <SalesToolbarFilter />

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
