import { Row } from "@tanstack/react-table";
import { Product } from "../types/type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "../provider/provider.products";

interface Props {
  row: Row<Product>;
}
export function SelectRow({ row }: Props) {
  const { setDetailProduct } = useProducts();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{row.original.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setDetailProduct(row.original)}>
          Detail
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
