import { Row } from "@tanstack/react-table";
import { SalesHeader } from "../types/sales-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSales } from "../provider/sales.provider";

interface Props {
  row: Row<SalesHeader>;
}
export function SalesColumnAction({ row }: Props) {
  const { setDetailSalesId, setEditSalesId } = useSales();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon-lg"}>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {row.original.sales_code} ({row.original.customer_name})
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setDetailSalesId(row.original.id)}>
          Detail
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setEditSalesId(row.original.id)}>
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
