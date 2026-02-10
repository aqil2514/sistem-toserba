import { useCashflowReport } from "@/features/cashflow-report/store/cashflow-report.provider";
import { isSummaryCashflowReport } from "@/features/cashflow-report/types/type-guard";
import { CashflowReportHeaderSummary } from "./summary-header.cashflow-report";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { cashflowReportColumns } from "./summary-columns.cashflow-report";

export function CashflowReportSummary() {
  const { data, isLoading, query, updateQuery } = useCashflowReport();

  if (!data || isLoading) return <LoadingSpinner />;

  if (data && isSummaryCashflowReport(query.content, data))
    return (
      <div className="space-y-4">
        <ToolbarDatepicker
          date={{
            from: query.from,
            to: query.to,
          }}
          onApply={(date) => {
            if (!date) return;
            updateQuery("from", date.from);
            updateQuery("to", date.to);
          }}
          setDate={(date) => {
            if (!date) return;
            updateQuery("from", date.from);
            updateQuery("to", date.to);
          }}
        />
        <CashflowReportHeaderSummary data={data} />
        <DataTable columns={cashflowReportColumns} data={data} />
      </div>
    );
}
