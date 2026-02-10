import { LabelValue } from "@/@types/general";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { CashflowReportContent } from "../../types/cashflow-report-query.types";
import { CashflowReportBreakdown } from "./breakdown/breakdown.cashflow-report";
import { useCashflowReport } from "../../store/cashflow-report.provider";

type TabsContentType = LabelValue<CashflowReportContent> & {
  content: React.ReactNode;
};

const contentTrigger: TabsContentType[] = [
  {
    label: "Detail",
    value: "breakdown",
    content: <CashflowReportBreakdown />,
  },
];

export function CashflowReportContents() {
  const { query, updateQuery } = useCashflowReport();

  return (
    <Tabs
      value={query.content}
      onValueChange={(e) => updateQuery("content", e as CashflowReportContent)}
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
