import { Row } from "@tanstack/react-table";
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
import { useProducts } from "../../../store/provider.products";
import { Product } from "../../../types/type";

interface Props {
  row: Row<Product>;
}
export function SelectRow({ row }: Props) {
  const { setDetailProduct, setEditProduct, setDeleteProduct } = useProducts();
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
        <DropdownMenuItem onClick={() => setEditProduct(row.original)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500" onClick={() => setDeleteProduct(row.original)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
