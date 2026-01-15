import { LabelValue } from "@/@types/general";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSalesReport } from "../../store/provider.sales-report";
import { ReportContent, ReportMode } from "../../types/query.report-sales";

const getModeItems = (content: ReportContent): LabelValue[] => {
  if (content === "summary") return [];
  if (content === "detail")
    return [
      {
        label: "Full",
        value: "full",
      },
      {
        label: "Ringkasan Produk",
        value: "summary-product",
      },
    ];

  if (content === "chart")
    return [
      {
        label: "Omzet",
        value: "breakdown-omzet",
      },
      {
        label: "Per Kategori",
        value: "report-per-category",
      },
    ];
  return [];
};

const VISIBLE_IN: ReportContent[] = ["chart", "detail"];

export function SalesReportModeSelect() {
  const { query, updateQuery } = useSalesReport();
  if (!VISIBLE_IN.includes(query.content)) return null;

  const modeItems = getModeItems(query.content);

  return (
    <Select
      value={query.mode}
      onValueChange={(e: ReportMode) => {
        updateQuery("mode", e);
        updateQuery("sort", undefined);
        updateQuery("filters", undefined);
      }}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Mode" />
      </SelectTrigger>
      <SelectContent>
        {modeItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
