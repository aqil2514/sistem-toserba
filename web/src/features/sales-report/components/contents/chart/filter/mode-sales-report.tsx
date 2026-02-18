import { LabelValue } from "@/@types/general";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSalesReportChartQuery } from "@/features/sales-report/hooks/use-sales-report-chart-query";
import { SalesReportChartReturn } from "@/features/sales-report/types/chart.report-sales-type";
import { SalesReportChartQuery } from "@/features/sales-report/types/query.report-sales";
import { useQueryParams } from "@/hooks/use-query-params";

const modeValues: LabelValue<SalesReportChartReturn["mode"]>[] = [
  {
    label: "Per Omzet",
    value: "breakdown",
  },
  {
    label: "Per Produk",
    value: "per-product",
  },
];

export function ModeSalesReport() {
  const { updateMode } = useSalesReportChartQuery();
  const { get } = useQueryParams();

  const groupBy = get("mode") ?? "breakdown";
  return (
    <Select
      value={groupBy}
      onValueChange={(e) => updateMode(e as SalesReportChartQuery["mode"])}
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {modeValues.map((mode) => (
            <SelectItem value={mode.value} key={mode.value}>
              {mode.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
