import { LabelValue } from "@/@types/general";
import { PurchaseReportContent } from "../../types/query.purchase-report";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePurchaseReport } from "../../store/provider.purchase-report";
import React from "react";
import { PurchaseReportSummaryContent } from "./summary/summary-content.purchase-report";
import { PurchaseReportDetailContent } from "./detail/detail-content.purchase-report";
import { PurchaseReportChartContent } from "./chart/chart-content.purchase-report";

type TabsContentType = LabelValue<PurchaseReportContent> & {
  content: React.ReactNode;
};

const contentTrigger: TabsContentType[] = [
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
    content: <PurchaseReportChartContent />
  },
];

export function PurchaseReportContents() {
  const { query, updateQuery } = usePurchaseReport();

  return (
    <Tabs
      value={query.content}
      onValueChange={(e) => updateQuery("content", e as PurchaseReportContent)}
      className="w-full"
    >
      <TabsList>
        {contentTrigger.map((content) => (
          <TabsTrigger value={content.value} key={content.value}>
            {content.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {contentTrigger.map((content) => (
        <TabsContent key={content.value} value={content.value}>
          {content.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
