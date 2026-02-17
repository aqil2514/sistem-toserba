import { usePurchase } from "@/features/purchase/store/purchase.provider";
import { PurchaseForm } from "../../form/form.purchase";
import { PurchaseFormValues } from "@/features/purchase/schema/purchase.schema";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { useMemo } from "react";
import { mapPurchaseToFormValues } from "@/features/purchase/utils/map-purchase-to-form-values";
import { MappedResponse } from "@/features/purchase/types/mapped-response";
import { useQueryParams } from "@/hooks/use-query-params";
import { DialogWithForm } from "@/components/molecules/dialog/dialog-with-form";

export function PurchaseEditDialog() {
  const { mutate, data } = usePurchase();

  const { get, update } = useQueryParams();

  const open = get("action") === "edit";
  const id = get("id");

  const existingFetcher = useFetch<MappedResponse[]>(
    open ? `${SERVER_URL}/purchase/${id}` : null,
  );

  // if(!data || !existingFetcher.data || !id) return null;

  // const formValues = mapPurchaseToFormValues()

  const formValues = useMemo(() => {
    if (!data || !existingFetcher.data || !id) return null;

    const selectedData = data.data.find((purchase) => purchase.id === id);
    if (!selectedData) return null;

    return mapPurchaseToFormValues(selectedData, existingFetcher.data);
  }, [data, existingFetcher.data, id]);
  if (existingFetcher.isLoading) return null;

  const submitHandler = async (values: PurchaseFormValues) => {
    try {
      await api.patch(`/purchase/${id}`, values);
      toast.success("Edit Data Pembelian Berhasil");
      mutate?.();
      update({
        action: null,
        id: null,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;

        toast.error(data.message ?? "Terjadi kesalahan");
        return;
      }
      toast.error("Terjadi kesalahan");
      console.error(error);
    }
  };

  if (!formValues) return null;

  return (
    <DialogWithForm
      FormComponent={
        <PurchaseForm onSubmit={submitHandler} initialValues={formValues} />
      }
      description="Isi form di bawah ini untuk menambah data pembelian"
      title="Tambah Data Pembelian"
      open={open}
      onOpenChange={(open) => {
        if (!open)
          return update({
            action: null,
            id: null,
          });
      }}
      size="3xl"
      isLoadingEdit={existingFetcher.isLoading}
    />
  );
}
