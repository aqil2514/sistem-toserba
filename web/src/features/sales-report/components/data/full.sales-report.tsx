import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SalesItemApiResponse } from "@/features/sales/types/sales-item-api";
import { SalesReportColumns } from "../columns/full-columns.sales-report";

interface Props {
  data: SalesItemApiResponse[];
}

export function FullData({ data }: Props) {
  return (
    <ScrollArea className="h-[60vh] w-full rounded-md border">
      <DataTable data={data} columns={SalesReportColumns} />
      <ScrollBar orientation="horizontal" />
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
