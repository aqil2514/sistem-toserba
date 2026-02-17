import { useForm } from "react-hook-form";
import {
  EMPTY_VALUES,
  PurchaseFormValues,
  purchaseSchema,
} from "../../schema/purchase.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormHeader } from "./form-header.purchase";
import { FormPurchaseItem } from "./form-item.purchase";
import { AddProductFormPurchaseDialog } from "../dialog/add/dialog-add-product.purchase";
import { useState } from "react";
import { toast } from "sonner";
import { usePurchaseConfig } from "../../hooks/use-purchase-config";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface Props {
  initialValues?: PurchaseFormValues;
  onSubmit: (values: PurchaseFormValues) => void;
}

export function PurchaseForm({ onSubmit, initialValues }: Props) {
  const [addNewProduct, setAddNewProduct] = useState<boolean>(false);
  const form = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: initialValues ?? EMPTY_VALUES,
  });
  const { productNameFetcher } = usePurchaseConfig();

  const isSubmitting = form.formState.isSubmitting;

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, () =>
            toast.error("Ada data yang belum diisi"),
          )}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <FormHeader form={form} />
            {productNameFetcher.data ? <FormPurchaseItem
              form={form}
              productList={productNameFetcher.data}
              setAddNewProduct={setAddNewProduct}
            /> : <LoadingSpinner /> }
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </Form>

      <AddProductFormPurchaseDialog
        addNewProduct={addNewProduct}
        mutate={productNameFetcher.mutate}
        setAddNewProduct={setAddNewProduct}
      />
    </>
  );
}
