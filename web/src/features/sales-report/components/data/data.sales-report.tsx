import { useSalesReport } from "../../store/provider.sales-report";
import { mapToSummaryColumns } from "../../utils/map-to-summary-product-columns";
import { FullData } from "./full.sales-report";
import { SalesReportSummarizedProduct } from "./summarized-product.sales-report";

export function DataSalesReport() {
  const { data, isSummarizedData } = useSalesReport();

  if (!data) return null;

  if (isSummarizedData)
    return (
      <SalesReportSummarizedProduct data={mapToSummaryColumns(data.data)} />
    );

  return <FullData data={data.data} />;
}
