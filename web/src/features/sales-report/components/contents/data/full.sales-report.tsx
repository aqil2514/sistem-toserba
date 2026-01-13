import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { SalesItemApiResponse } from "@/features/sales/types/sales-item-api";
import { SalesReportColumns } from "./columns/full-columns.sales-report";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";
import { useSalesReport } from "../../../store/provider.sales-report";
import { DataQueryResponse } from "@/@types/general";

interface Props {
  data: DataQueryResponse<SalesItemApiResponse[]>;
}

export function FullData({ data }: Props) {
  const { query, updateQuery } = useSalesReport();

  return (
    <DataTable
      data={data.data}
      columns={SalesReportColumns}
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
