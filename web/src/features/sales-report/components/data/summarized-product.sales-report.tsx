import { DataTable } from "@/components/organisms/custom-data-table/core-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SummarizedReportColumns } from "../columns/columns.sales-report";
import { SalesReportProductSummaryColumn } from "../../types/summary-columns.report-sales";

interface Props {
  data: SalesReportProductSummaryColumn[];
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
