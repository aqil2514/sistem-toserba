import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useCashflow } from "../../store/provider.cashflow";
import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { cashflowDataColumns } from "./columns/data-columns.cashflow";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";

export function CashflowData() {
  const { data, isLoading, query, updateQuery } = useCashflow();

  if (isLoading) return <LoadingSpinner label="Mengambil Data" />;

  return (
    <div>
      <DataTable data={data?.data ?? []} columns={cashflowDataColumns} />
      {data && (
        <DataTableFooterServer
          meta={data.meta}
          onQueryChange={updateQuery}
          query={query}
        />
      )}
    </div>
  );
}
