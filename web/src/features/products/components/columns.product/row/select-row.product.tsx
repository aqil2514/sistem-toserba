import { Row } from "@tanstack/react-table";
import { useProducts } from "../../../store/provider.products";
import { Product } from "../../../types/type";
import {
  DropdownActionColumn,
  DropdownActionItems,
} from "@/components/organisms/data-table-columns/dropdown-action-columns";
import { toast } from "sonner";
import { api } from "@/lib/api";

interface Props {
  row: Row<Product>;
}
export function SelectRow({ row }: Props) {
  const { setDetailProduct, setEditProduct, setDeleteProduct, mutate } = useProducts();

  const recoveryHandler = async () => {
    try {
      await api.patch(`/products/${row.original.id}/restore`);
      toast.success(
        `Produk dengan nama "${row.original.name} telah dipulihkan"`,
      );
      mutate?.()
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan");
    }
  };

  const isDeleted = row.original.deleted_at;

  const items: DropdownActionItems[] = [
    {
      itemLabel: "Detail",
      onClick: () => setDetailProduct(row.original),
    },
    {
      itemLabel: "Edit",
      onClick: () => setEditProduct(row.original),
    },
    {
      itemLabel: isDeleted ? "Pulihkan" : "Hapus",
      onClick: isDeleted
        ? recoveryHandler
        : () => setDeleteProduct(row.original),
      className: isDeleted ? "text-green-500" : "text-red-500",
    },
  ];

  return (
    <DropdownActionColumn menuLabel={`${row.original.name}`} items={items} />
  );
}
