import { LabelValue } from "@/@types/general";
import React from "react";
import { CashflowReportBreakdown } from "./breakdown/breakdown.cashflow-report";
import { CashflowReportSummary } from "./summary/summary.cashflow-report";
import { TabsContentData } from "@/components/organisms/contents/tabs-content";
import { CashflowReportMovement } from "./movement/movement.cashflow-report";
import { useQueryParams } from "@/hooks/use-query-params";
import { CashflowReportContent } from "../../types/cashflow-report-query.types";
import { CashflowReportAllocation } from "./allocation/allocation.cashflow-report";

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
    label: "Alokasi",
    value: "allocation",
    content: <CashflowReportAllocation />,
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
  const { get, resetToContent } = useQueryParams();

  const content = get("content") ?? "summary";

  return (
    <TabsContentData
      value={content}
      onValueChange={resetToContent}
      tabContents={contentTrigger}
    />
  );
}
