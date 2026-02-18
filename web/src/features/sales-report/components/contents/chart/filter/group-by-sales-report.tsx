import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSalesReportChartQuery } from "@/features/sales-report/hooks/use-sales-report-chart-query";
import { SalesReportChartQuery } from "@/features/sales-report/types/query.report-sales";
import { useQueryParams } from "@/hooks/use-query-params";

export function GroupBySalesReport() {
  const { updateGroupBy } = useSalesReportChartQuery();
  const { get } = useQueryParams();

  const groupBy = get("groupBy") ?? "day";
  return (
    <Select
      value={groupBy}
      onValueChange={(e) =>
        updateGroupBy(e as SalesReportChartQuery["groupBy"])
      }
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="day">Harian</SelectItem>
          <SelectItem value="week">Mingguan</SelectItem>
          <SelectItem value="month">Bulanan</SelectItem>
          <SelectItem value="year">Tahunan</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
