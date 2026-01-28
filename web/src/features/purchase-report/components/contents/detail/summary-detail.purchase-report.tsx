import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { usePurchaseReport } from "@/features/purchase-report/store/provider.purchase-report";
import { PurchaseReportDetailColumns } from "./detail-columns.purchase-report";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";

export function PurchaseReportDetailContent() {
  const { data, isLoading, query, updateQuery } = usePurchaseReport();

  if (isLoading || !data) return <LoadingSpinner label="Mengambil data...." />;

  if (data.mode === "detail") {
    return (
      <div>
        <DataTable columns={PurchaseReportDetailColumns} data={data.data} />
        {/* Pagination is driven entirely by server metadata,
          keeping UI state simple and predictable */}
        <DataTableFooterServer
          meta={data.meta}
          query={query}
          onQueryChange={updateQuery}
        />
      </div>
    );
  }

  return null;
}
