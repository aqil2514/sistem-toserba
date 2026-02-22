import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { breakdownCashflowReportColumns } from "./breakdown-columns.cashflow-report";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";
import { useMemo } from "react";
import {
  SingleSorting,
  SortingKeyType,
} from "@/components/molecules/sorting/single-sorting";
import { FilterPanel } from "@/components/filters/filter-panel/master.filter-panel";
import { FilterConfig } from "@/components/filters/filter-panel/types.filter-panel";
import { viaCashflow } from "@/features/cashflow/constants/cashflow-filter-options.constants";
import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { statusCashflowFilterOptions } from "@/features/cashflow-report/constants/filters";
import {
  CashflowReportBreakdownProvider,
  useCashflowReportBreakdown,
} from "@/features/cashflow-report/store/cashflow-report-breakdown.provider";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { MutateButton } from "@/components/ui/mutate-button";

export function CashflowReportBreakdown() {
  return (
    <CashflowReportBreakdownProvider>
      <InnerTemplate />
    </CashflowReportBreakdownProvider>
  );
}

const InnerTemplate = () => {
  const { data, isLoading, query } = useCashflowReportBreakdown();
  const { updateFooter } = useQueryBasics();
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <FilterSorting />
      {isLoading || !data ? (
        <LoadingSpinner />
      ) : (
        <>
          <DataTable
            columns={breakdownCashflowReportColumns}
            data={data.data}
          />
          <DataTableFooterServer
            meta={data.meta}
            query={query}
            onQueryChange={updateFooter}
          />
        </>
      )}
    </div>
  );
};

const filterConfig: FilterConfig[] = [
  {
    field: "via",
    label: "Aset",
    type: "select",
    selectOptions: viaCashflow,
  },
  {
    field: "status_cashflow",
    label: "Status Cashflow",
    type: "select",
    selectOptions: statusCashflowFilterOptions,
  },
  {
    field: "price",
    label: "Nominal",
    type: "text",
    withOperator: true,
  },
];

const sortingkeys: SortingKeyType[] = [
  {
    sortingKey: "via",
    label: "Aset",
  },
  {
    sortingKey: "transaction_at",
    label: "Tanggal Transaksi",
  },
  {
    sortingKey: "price",
    label: "Nominal",
  },
  {
    sortingKey: "status_cashflow",
    label: "Status Cashflow",
  },
];

const FilterSorting = () => {
  const { query, mutate } = useCashflowReportBreakdown();
  const { updateFilter, updateSort, updateDateRange } = useQueryBasics(query);
  const memoQueryFilter = useMemo(() => query.filters ?? [], [query.filters]);

  return (
    <div className="flex gap-4">
      <FilterPanel
        initialValue={memoQueryFilter}
        onApplyFilter={updateFilter}
        config={filterConfig}
      />
      <SingleSorting onSortStateChange={updateSort} sortingkeys={sortingkeys} />
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
  );
};
