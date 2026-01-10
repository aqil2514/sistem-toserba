import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SalesReportColumns } from "../columns/columns.sales-report";
import { SalesItemApiResponse } from "@/features/sales/types/sales-item-api";

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
