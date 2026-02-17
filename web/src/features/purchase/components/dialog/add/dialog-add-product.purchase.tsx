import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { SERVER_URL } from "@/constants/url";
import { ProductForm } from "@/features/products/components/form.product/form.product";
import { ProductFormValues } from "@/features/products/schema/product.schema";
import { PurchaseFormRss } from "@/features/purchase/types/purchase-form-rss";
import { api } from "@/lib/api";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { toast } from "sonner";
import { KeyedMutator } from "swr";

interface Props {
  addNewProduct: boolean;
  setAddNewProduct: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: KeyedMutator<PurchaseFormRss['products']>;
}

export function AddProductFormPurchaseDialog({
  addNewProduct,
  setAddNewProduct,
  mutate,
}: Props) {
  const submitHandler = async (values: ProductFormValues) => {
    try {
      await api.post(`${SERVER_URL}/products`, values);
      toast.success("Data produk berhasil ditambah");
      setAddNewProduct(false);
      mutate?.();
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan!");
    }
  };
  return (
    <Dialog open={addNewProduct} onOpenChange={setAddNewProduct}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tambah Data Produk</DialogTitle>
          <DialogDescription>
            Ini akan menambah data produk baru
          </DialogDescription>
        </DialogHeader>

        <ProductForm onSubmit={submitHandler} />
        <p className="text-sm text-orange-500 font-semibold">
          Disarankan untuk edit kategori dan jenis kategorinya melalui halaman
          produk
        </p>
      </DialogContent>
    </Dialog>
  );
}
