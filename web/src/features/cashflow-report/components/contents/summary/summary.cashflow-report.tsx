import { CashflowReportHeaderSummary } from "./summary-header.cashflow-report";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { cashflowReportColumns } from "./summary-columns.cashflow-report";
import {
  CashflowReportSummaryProvider,
  useCashflowReportSummary,
} from "@/features/cashflow-report/store/cashflow-report-summary.provider";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { MutateButton } from "@/components/ui/mutate-button";

export function CashflowReportSummary() {
  return (
    <CashflowReportSummaryProvider>
      <InnerTemplate />
    </CashflowReportSummaryProvider>
  );
}

const InnerTemplate = () => {
  const { data, isLoading, mutate } = useCashflowReportSummary();
  const { query, updateDateRange } = useQueryBasics();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">

      <ToolbarDatepicker
        date={{
          from: query.from,
          to: query.to,
        }}
        onApply={updateDateRange}
        setDate={updateDateRange}
      />

      <MutateButton mutate={mutate} />
      </div>
      <CashflowReportHeaderSummary data={data} />
      <DataTable columns={cashflowReportColumns} data={data} />
    </div>
  );
};
