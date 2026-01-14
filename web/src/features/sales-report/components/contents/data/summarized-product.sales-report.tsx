import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { SummarizedReportColumns } from "./columns/product-summary-columns.sales-report";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";
import { useSalesReport } from "../../../store/provider.sales-report";
import { DetailContentProductSummaryMode } from "@/features/sales-report/types/api.report-sales";

interface Props {
  data: DetailContentProductSummaryMode;
}

export function SalesReportSummarizedProduct({ data }: Props) {
  const { query, updateQuery } = useSalesReport();
  return (
    <DataTable
      data={data.data}
      columns={SummarizedReportColumns}
      footer={() => (
        <DataTableFooterServer
          query={query}
          onQueryChange={(key, value) => updateQuery(key, value)}
          meta={data.meta}
        />
      )}
    />
  );
}
