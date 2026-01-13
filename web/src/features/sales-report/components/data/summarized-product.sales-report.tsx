import { DataTable } from "@/components/organisms/custom-data-table/core-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SummarizedReportColumns } from "../columns/product-summary-columns.sales-report";
import { ProductSummaryApiResponse } from "../../types/summary-columns.report-sales";

interface Props {
  data: ProductSummaryApiResponse[];
}

export function SalesReportSummarizedProduct({ data }: Props) {
  
  return (
    <ScrollArea className="h-[60vh] w-full rounded-md border">
      <DataTable data={data} columns={SummarizedReportColumns} />
      <ScrollBar orientation="horizontal" />
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
