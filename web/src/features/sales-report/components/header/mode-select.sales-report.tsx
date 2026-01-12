import { LabelValue } from "@/@types/general";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSalesReport } from "../../store/provider.sales-report";
import { DataMode } from "../../types/query.report-sales";

const items: LabelValue[] = [
  {
    label: "Full",
    value: "full",
  },
  {
    label: "Ringkasan Produk",
    value: "summary-product",
  },
];

export function SalesReportModeSelect() {
  const { query, updateQuery } = useSalesReport();
  return (
    <Select
      value={query.mode}
      onValueChange={(e: DataMode) => updateQuery("mode", e)}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Mode" />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
