import { HeaderWithMutate } from "@/components/organisms/header/header-with-mutate";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  SalesReportChartProvider,
  useSalesReportChart,
} from "@/features/sales-report/store/sales-report-chart.provider";
import { SalesReportOmzetChart } from "./omzet-chart.sales-report";
import { useSalesReportChartQuery } from "@/features/sales-report/hooks/use-sales-report-chart-query";
import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { GroupBySalesReport } from "./filter/group-by-sales-report";

export function SalesReportChart() {
  return (
    <SalesReportChartProvider>
      <InnerTemplate />
    </SalesReportChartProvider>
  );
}

const InnerTemplate = () => {
  const { mutate, isLoading } = useSalesReportChart();
  const { query } = useSalesReportChart();
  const { updateDateRange } = useSalesReportChartQuery();

  return (
    <div className="space-y-4">
      <HeaderWithMutate title="Diagram" mutate={mutate} />
      <div className="flex gap-4">

      <ToolbarDatepicker
        date={{ from: query.from, to: query.to }}
        onApply={updateDateRange}
        setDate={updateDateRange}
      />
      <GroupBySalesReport />
      </div>
      {isLoading ? <LoadingSpinner /> : <ContentData />}
    </div>
  );
};

const ContentData = () => {
  const { data } = useSalesReportChart();
  if (!data) return null;
  const mode = data.mode;
  if (mode === "breakdown") {
    return <SalesReportOmzetChart data={data.data} />;
  }
};
