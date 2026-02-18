import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { FilterPanel } from "@/components/filters/filter-panel/master.filter-panel";
import { HeaderWithMutate } from "@/components/organisms/header/header-with-mutate";
import {
  SalesSummaryReportProvider,
  useSalesReportSummary,
} from "@/features/sales-report/store/sales-report-summary.provider";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { useMemo } from "react";
import { summaryReportFilterConfig } from "../../../constants/summary-report-filter-config";
import { GrayContainer } from "@/components/layout/container/gray-container";
import { SalesReportSummaryHeader } from "./summary-header.report-sales";
import { Separator } from "@/components/ui/separator";
import { SalesReportSummaryContent } from "./summary-content.report-sales";
import { SalesReportSummaryFooter } from "./summary-footer.report-sales";

export function ReportSalesSummary() {
  return (
    <SalesSummaryReportProvider>
      <InnerTemplate />
    </SalesSummaryReportProvider>
  );
}

const InnerTemplate = () => {
  const { mutate, query } = useSalesReportSummary();

  const { updateDateRange, updateFilter } = useQueryBasics();

  const memoInitialValue = useMemo(() => query?.filters ?? [], [query]);
  return (
    <div className="space-y-4">
      <HeaderWithMutate title="Ringkasan Penjualan" mutate={mutate} />
      <div className="flex gap-4">
        <FilterPanel
          config={summaryReportFilterConfig}
          initialValue={memoInitialValue}
          onApplyFilter={updateFilter}
        />
        <ToolbarDatepicker
          onApply={updateDateRange}
          date={{ from: query.from, to: query.to }}
          setDate={updateDateRange}
        />
      </div>

      <GrayContainer>
        <SalesReportSummaryHeader />
        <Separator />
        <SalesReportSummaryContent />
        <Separator />
        <SalesReportSummaryFooter />
      </GrayContainer>
    </div>
  );
};
