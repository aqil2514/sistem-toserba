import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSales } from "../store/sales.provider";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { SalesItemApiResponse } from "../types/sales-item-api";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import React from "react";
import { mapDbDataToForm } from "../utils/map-db-to-form";
import { FormSales } from "./form/form.sales";
import { SalesSchemaType } from "../schemas/sales-schema";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export function SalesEditDialog() {
  const { editSalesId, setEditSalesId } = useSales();

  const open = Boolean(editSalesId);

  const oldDataFetcher = useFetch<SalesItemApiResponse[]>(
    open ? `${SERVER_URL}/sales/${editSalesId}` : null
  );

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setEditSalesId("");
          oldDataFetcher.mutate();
        }
      }}
    >
      {oldDataFetcher.isLoading || !oldDataFetcher.data ? (
        <ContentLoading />
      ) : (
        <ContentReady
          oldData={oldDataFetcher.data}
          setEditSalesId={setEditSalesId}
        />
      )}
    </Dialog>
  );
}

const ContentLoading = () => {
  return (
    <DialogContent className="sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle>Mengambil Data...</DialogTitle>
        <DialogDescription>Data sedang diambil. Mohon tunggu</DialogDescription>
      </DialogHeader>
      <LoadingSpinner label="Loading..." />
    </DialogContent>
  );
};

const ContentReady: React.FC<{
  oldData: SalesItemApiResponse[];
  setEditSalesId: React.Dispatch<React.SetStateAction<string>>;
}> = ({ oldData, setEditSalesId }) => {
  const { mutate } = useSales();
  const formMappedData = mapDbDataToForm(oldData);

  const submitHandler = async (values: SalesSchemaType) => {
    try {
      await api.put(`/sales/${oldData[0].sales_id.id}`, values);
      toast.success("Data penjualan berhasil diedit");
      mutate?.();
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

  return (
    <DialogContent className="sm:max-w-5xl">
      <DialogHeader>
        <DialogTitle>Edit data {oldData[0].sales_id.sales_code}</DialogTitle>
        <DialogDescription>
          Isi form di bawah ini untuk melakukan edit data
        </DialogDescription>
      </DialogHeader>

      <FormSales
        setOpen={(state) => {
          if (!state) setEditSalesId("");
        }}
        submitHandler={submitHandler}
        defaultValues={formMappedData}
      />
    </DialogContent>
  );
};
