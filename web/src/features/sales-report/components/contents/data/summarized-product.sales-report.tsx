import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { SummarizedReportColumns } from "./columns/product-summary-columns.sales-report";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { DataQueryResponse } from "@/@types/general";
import { ProductSummaryApiResponse } from "@/features/sales-report/types/detail.report-sales-type";

interface Props {
  data: DataQueryResponse<ProductSummaryApiResponse[]>;
}

export function SalesReportSummarizedProduct({ data }: Props) {
  const { query, updateFooter } = useQueryBasics();
  return (
    <DataTable
      data={data.data}
      columns={SummarizedReportColumns}
      footer={() => (
        <DataTableFooterServer
          query={query}
          onQueryChange={updateFooter}
          meta={data.meta}
        />
      )}
    />
  );
}
