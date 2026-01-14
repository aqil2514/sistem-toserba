import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useSalesReport } from "../../../store/provider.sales-report";
import { isFullReport, isSummaryProduct } from "../../../utils/type-guard";
import { FullData } from "./full.sales-report";
import { SalesReportSummarizedProduct } from "./summarized-product.sales-report";

export function DataSalesReport() {
  const { data, query, isLoading } = useSalesReport();

  if (query.content !== "detail") return null;

  if (!data || isLoading) return <LoadingSpinner label="Memuat Data..." />;

  if (isSummaryProduct(query.mode, data))
    return <SalesReportSummarizedProduct data={data} />;

  if (isFullReport(query.mode, data)) return <FullData data={data} />;

  return null;
}
