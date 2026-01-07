import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePurchase } from "@/features/purchase/store/provider.purchase";
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

export function PurchaseEditDialog() {
  const { editPurchaseId, setEditPurchaseId, mutate, data } = usePurchase();

  const open = Boolean(editPurchaseId);

  const existingFetcher = useFetch<MappedResponse[]>(
    open ? `${SERVER_URL}/purchase/${editPurchaseId}` : null
  );

  const formValues = useMemo(() => {
    if (!data || !existingFetcher.data) return null;

    const selectedData = data.data.find(
      (purchase) => purchase.id === editPurchaseId
    );
    if (!selectedData) return null;

    return mapPurchaseToFormValues(selectedData, existingFetcher.data);
  }, [data, existingFetcher.data, editPurchaseId]);
  if (existingFetcher.isLoading) return null;

  const submitHandler = async (values: PurchaseFormValues) => {
    try {
      await api.patch(`/purchase/${editPurchaseId}`, values);
      toast.success("Edit Data Pembelian Berhasil");
      mutate?.();
      setEditPurchaseId("");
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

  if(!formValues) return null;

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) return setEditPurchaseId("");
      }}
    >
      <AlertDialogContent className="sm:max-w-7xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Data Pembelian</AlertDialogTitle>
          <AlertDialogDescription>
            Isi form di bawah ini untuk menambah data pembelian
          </AlertDialogDescription>
        </AlertDialogHeader>

        <PurchaseForm onSubmit={submitHandler} initialValues={formValues} />

        <AlertDialogFooter>
          <AlertDialogCancel>Kembali</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
