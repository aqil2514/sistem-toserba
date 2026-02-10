import { LabelValue } from "@/@types/general";
import { PurchaseReportContent } from "../../types/query.purchase-report";
import { usePurchaseReport } from "../../store/provider.purchase-report";
import React from "react";
import { PurchaseReportSummaryContent } from "./summary/summary-content.purchase-report";
import { PurchaseReportDetailContent } from "./detail/detail-content.purchase-report";
import { PurchaseReportChartContent } from "./chart/chart-content.purchase-report";
import { TabsContentData } from "@/components/organisms/contents/tabs-content";

type TabsContentType = LabelValue<PurchaseReportContent> & {
  content: React.ReactNode;
};

const tabContents: TabsContentType[] = [
  {
    label: "Ringkasan",
    value: "summary",
    content: <PurchaseReportSummaryContent />,
  },
  {
    label: "Detail",
    value: "detail",
    content: <PurchaseReportDetailContent />,
  },
  {
    label: "Diagram",
    value: "chart",
    content: <PurchaseReportChartContent />,
  },
];

export function PurchaseReportContents() {
  const { query, updateQuery } = usePurchaseReport();

  return (
    <TabsContentData
      value={query.content}
      onValueChange={(e) => updateQuery("content", e)}
      tabContents={tabContents}
    />
  );
}
