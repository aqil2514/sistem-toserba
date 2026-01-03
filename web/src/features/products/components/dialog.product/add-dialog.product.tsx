import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProducts } from "../../store/provider.products";
import { ProductForm } from "../form.product/form.product";
import { ProductFormValues } from "../../schema/product.schema";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { SERVER_URL } from "@/constants/url";

export function ProductAddDialog() {
  const { dialogAdd, setDialogAdd, mutate } = useProducts();

  const submitHandler = async (values: ProductFormValues) => {
    try {
      await api.post(`${SERVER_URL}/products`, values);
      toast.success("Data produk berhasil ditambah");
      setDialogAdd(false);
      mutate?.();
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan!");
    }
  };
  return (
    <Dialog open={dialogAdd} onOpenChange={setDialogAdd}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Tambah data produk</DialogTitle>
          <DialogDescription>
            Lengkapi beberapa form di bawah ini untuk menambah produk baru
          </DialogDescription>
        </DialogHeader>

        <ProductForm onSubmit={submitHandler} />
      </DialogContent>
    </Dialog>
  );
}
