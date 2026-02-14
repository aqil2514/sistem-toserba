import { DataTable } from "@/components/organisms/custom-data-table/core-table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  CashCountingReportProvider,
  useCashCountsReport,
} from "@/features/cash-counter/store/cash-counting-report.provider";
import { useMemo } from "react";
import { getCashCountingReportColumns } from "./columns/cash-counting-report.columns";
import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { MutateButton } from "@/components/ui/mutate-button";
import { useQueryParams } from "@/hooks/use-query-params";

export function CashCountingReport() {
  return (
    <CashCountingReportProvider>
      <InnerTemplate />
    </CashCountingReportProvider>
  );
}

const InnerTemplate = () => {
  const { data, isLoading, query, updateQuery, mutate } = useCashCountsReport();

  useQueryParams()

  const columns = useMemo(() => {
    if (!data) return [];

    return getCashCountingReportColumns(data);
  }, [data]);

  const columnsData = useMemo(() => {
    if (!data) return [];

    return data;
  }, [data]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center">
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

        <MutateButton mutate={mutate} />
      </div>
      <DataTable columns={columns} data={columnsData} />
    </div>
  );
};
