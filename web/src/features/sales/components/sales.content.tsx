import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useSales } from "../store/sales.provider";
import { useMemo } from "react";
import { SalesHeader } from "../types/sales-header";
import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { salesColumns } from "./columns/columns.sales";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";
import { useQueryBasics } from "@/hooks/use-query-basics";

export function SalesContent() {
  const { isLoading, data, query } = useSales();
  const { updateFooter } = useQueryBasics();

  const salesData = useMemo<SalesHeader[]>(() => {
    if (!data) return [];

    return data.data;
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="space-y-4">
      <DataTable data={salesData} columns={salesColumns} />
      <DataTableFooterServer
        meta={data?.meta}
        onQueryChange={updateFooter}
        query={query}
      />
    </div>
  );
}
