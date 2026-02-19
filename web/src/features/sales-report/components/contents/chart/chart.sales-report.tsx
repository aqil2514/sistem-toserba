import { HeaderWithMutate } from "@/components/organisms/header/header-with-mutate";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  SalesReportChartProvider,
  useSalesReportChart,
} from "@/features/sales-report/store/sales-report-chart.provider";
import { SalesReportOmzetChart } from "./omzet-chart.sales-report";
import { useSalesReportChartQuery } from "@/features/sales-report/hooks/use-sales-report-chart-query";
import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { SalesReportChartPerProduct } from "./per-product/per-product.sales-report";
import { FilterGroupBy } from "@/components/filters/filter-group-by";
import { VISIBLE_GROUP_BY } from "@/features/sales-report/constants/visibility.config";
import { FilterMode } from "@/components/filters/filter-mode";
import { salesReportChartMode } from "@/features/sales-report/constants/mode-config/sales-report-chart.mode-config";

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

  const isVisibleGroupBy = VISIBLE_GROUP_BY.includes(query.mode ?? "breakdown");

  return (
    <div className="space-y-4">
      <HeaderWithMutate title="Diagram" mutate={mutate} />
      <div className="flex gap-4">
        <ToolbarDatepicker
          date={{ from: query.from, to: query.to }}
          onApply={updateDateRange}
          setDate={updateDateRange}
        />
        <FilterGroupBy isVisible={isVisibleGroupBy} />
        <FilterMode defaultValue="breakdown" options={salesReportChartMode} />
      </div>
      {isLoading ? <LoadingSpinner /> : <ContentData />}
    </div>
  );
};

const ContentData = () => {
  const { data } = useSalesReportChart();
  if (!data) return null;
  const mode = data.mode;

  switch (mode) {
    case "breakdown":
      return <SalesReportOmzetChart data={data.data} />;
    case "per-product":
      return <SalesReportChartPerProduct data={data.data} />;

    default:
      break;
  }
};
