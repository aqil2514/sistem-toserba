import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { usePurchaseReport } from "@/features/purchase-report/store/provider.purchase-report";
import { PurchaseReportDetailColumns } from "./detail-columns.purchase-report";

export function PurchaseReportDetailContent() {
  const { data, isLoading } = usePurchaseReport();

  if (isLoading || !data) return <LoadingSpinner label="Mengambil data...." />;

  if (data.mode === "detail") {
    return(
        <div>
            <DataTable columns={PurchaseReportDetailColumns} data={data.data} />
        </div>
    )
  }
  return null;
}
