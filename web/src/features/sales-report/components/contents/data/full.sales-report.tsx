import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { SalesItemApiResponse } from "@/features/sales/types/sales-item-api";
import { SalesReportColumns } from "./columns/full-columns.sales-report";
import { DataQueryResponse } from "@/@types/general";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";
import { useQueryBasics } from "@/hooks/use-query-basics";

interface Props {
  data: DataQueryResponse<SalesItemApiResponse[]>;
}

export function FullData({ data }: Props) {
  const { query, updateFooter } = useQueryBasics();
  return (
    <>
      <DataTable data={data.data} columns={SalesReportColumns} />;
      <DataTableFooterServer
        query={query}
        onQueryChange={updateFooter}
        meta={data.meta}
      />
    </>
  );
}
