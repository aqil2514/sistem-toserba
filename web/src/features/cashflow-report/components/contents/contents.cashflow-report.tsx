import { LabelValue } from "@/@types/general";
import React from "react";
import { CashflowReportContent } from "../../types/cashflow-report-query.types";
import { CashflowReportBreakdown } from "./breakdown/breakdown.cashflow-report";
import { useCashflowReport } from "../../store/cashflow-report.provider";
import { CashflowReportSummary } from "./summary/summary.cashflow-report";
import { TabsContentData } from "@/components/organisms/contents/tabs-content";
import { CashflowReportMovement } from "./movement/movement.cashflow-report";

type TabsContentType = LabelValue<CashflowReportContent> & {
  content: React.ReactNode;
};

const contentTrigger: TabsContentType[] = [
  {
    label: "Ringkasan",
    value: "summary",
    content: <CashflowReportSummary />,
  },
  {
    label: "Detail",
    value: "breakdown",
    content: <CashflowReportBreakdown />,
  },
  {
    label: "Pergerakan",
    value: "movement",
    content: <CashflowReportMovement />,
  },
];

export function CashflowReportContents() {
  const { query, updateQuery } = useCashflowReport();

  return (
    <TabsContentData
      value={query.content}
      onValueChange={(e) => {
        updateQuery("content", e);
        if (e === "movement") {
          updateQuery("mode", "movement-global");
          return;
        }
      }}
      tabContents={contentTrigger}
    />
  );
}
