import {
  TabsContentData,
  TabsContentType,
} from "@/components/organisms/contents/tabs-content";
import { useQueryParams } from "@/hooks/use-query-params";
import { ReportSalesSummary } from "./summary/summary.report-sales";
import { DataSalesReport } from "./data/data.sales-report";
import { SalesReportChart } from "./chart/chart.sales-report";

type ReportContent = "summary" | "detail" | "chart";

const tabsContent: TabsContentType<ReportContent>[] = [
  {
    content: <ReportSalesSummary />,
    label: "Ringkasan",
    value: "summary",
  },
  {
    content: <DataSalesReport />,
    label: "Detail",
    value: "detail",
  },
  {
    content: <SalesReportChart />,
    label: "Diagram",
    value: "chart",
  },
];

export function SalesReportContents() {
  const { get, resetToContent } = useQueryParams();

  const content = (get("content") as ReportContent) ?? "summary";

  return (
    <TabsContentData
      value={content}
      onValueChange={resetToContent}
      tabContents={tabsContent}
    />
  );
}
