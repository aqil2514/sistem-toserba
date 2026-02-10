import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useCashflowReport } from "@/features/cashflow-report/store/cashflow-report.provider";
import { breakdownCashflowReportColumns } from "./columns/breakdown-columns.cashflow-report";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";
import {
  FilterKeyType,
  MultiFilter,
} from "@/components/molecules/filters/multi-filter";
import { useMemo } from "react";
import {
  SingleSorting,
  SortingKeyType,
} from "@/components/molecules/sorting/single-sorting";

export function CashflowReportBreakdown() {
  const { data, isLoading, query, updateQuery } = useCashflowReport();

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
            onQueryChange={updateQuery}
          />
        </>
      )}
    </div>
  );
}

const filterKeys: FilterKeyType[] = [
  {
    filterKey: "via",
    label: "Aset",
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
  const { query, updateQuery } = useCashflowReport();
  const memoQueryFilter = useMemo(() => query.filters ?? [], [query.filters]);

  return (
    <div className="flex gap-4">
      <MultiFilter
        initialValue={memoQueryFilter}
        onApplyFilter={(values) => updateQuery("filters", values)}
        filterKeys={filterKeys}
      />
      <SingleSorting
        onSortStateChange={(values) => updateQuery("sort", values)}
        sortingkeys={sortingkeys}
      />
    </div>
  );
};
