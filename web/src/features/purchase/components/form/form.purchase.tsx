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
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PurchaseFormRss } from "../../types/purchase-form-rss";
import { FormPurchaseItem } from "./form-item.purchase";
import { AddProductFormPurchaseDialog } from "../dialog/add/dialog-add-product.purchase";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryParams } from "@/hooks/use-query-params";

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

  const { get } = useQueryParams();

  const isAddOpen = get("action") === "add";
  const isEditOpen = get("action") === "edit";

  const isCanFetch = isAddOpen || isEditOpen;

  const fetcher = useFetch<PurchaseFormRss>(
    isCanFetch ? `${SERVER_URL}/purchase/form-rss` : null,
  );

  if (fetcher.isLoading || !fetcher.data)
    return <LoadingSpinner label="Memuat data..." />;

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
            <FormHeader
              form={form}
            />
            <FormPurchaseItem
              form={form}
              productList={fetcher.data.products}
              setAddNewProduct={setAddNewProduct}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </form>
      </Form>

      <AddProductFormPurchaseDialog
        addNewProduct={addNewProduct}
        mutate={fetcher.mutate}
        setAddNewProduct={setAddNewProduct}
      />
    </>
  );
}
