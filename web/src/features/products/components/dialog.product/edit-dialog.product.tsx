import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProducts } from "../../store/provider.products";
import { productToFormValues } from "../../utils/product-to-form";
import { ProductForm } from "../form.product/form.product";
import { ProductFormValues } from "../../schema/product.schema";
import { api } from "@/lib/api";
import { SERVER_URL } from "@/constants/url";
import { toast } from "sonner";

export function ProductEditDialog() {
  const { editProduct, setEditProduct, mutate } = useProducts();

  const open = !!editProduct;

  if (!open || !editProduct) return null;

  const mappedProduct = productToFormValues(editProduct);

  const submitHandler = async (values: ProductFormValues) => {
    try {
      await api.patch(`${SERVER_URL}/products/${editProduct.id}`, values);
      toast.success("Data produk berhasil diedit");
      setEditProduct(null);
      mutate?.();
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan!");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) setEditProduct(null);
      }}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit produk {mappedProduct.name}</DialogTitle>
          <DialogDescription>
            Isi form di bawah ini untuk melakukan edit produk
          </DialogDescription>
        </DialogHeader>

        <ProductForm
          onSubmit={submitHandler}
          defaultValues={mappedProduct}
        />
      </DialogContent>
    </Dialog>
  );
}
