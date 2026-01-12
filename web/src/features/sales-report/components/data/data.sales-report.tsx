import { useSalesReport } from "../../store/provider.sales-report";
import { isFullReport, isSummaryProduct } from "../../utils/type-guard";
import { FullData } from "./full.sales-report";
import { SalesReportSummarizedProduct } from "./summarized-product.sales-report";

export function DataSalesReport() {
  const { data, query } = useSalesReport();

  if (!data) return null;

  if (isSummaryProduct(query.mode, data))
    return <SalesReportSummarizedProduct data={data.data} />;

  if (isFullReport(query.mode, data)) return <FullData data={data.data} />;

  return null;
}
