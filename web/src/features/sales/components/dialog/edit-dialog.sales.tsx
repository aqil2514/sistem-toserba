import { DialogWithForm } from "@/components/molecules/dialog/dialog-with-form";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useQueryParams } from "@/hooks/use-query-params";
import { useSales } from "../../store/sales.provider";
import { isAxiosError } from "axios";
import { SalesSchemaType } from "../../schemas/sales-schema";
import { FormSales } from "../form/form.sales";
import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";
import { SalesItemApiResponse } from "../../types/sales-item-api";
import { isSalesHeader } from "../../utils/type-guard.sales";
import { mapDbDataToForm } from "../../utils/map-db-to-form";
import { useMemo } from "react";
import { SalesHeader } from "../../types/sales-header";

export function SalesEditDialog() {
  const { mutate } = useSales();
  const { get, update } = useQueryParams();

  const open = get("action") === "edit";
  const id = get("id");

  const { data } = useFetch<SalesItemApiResponse[]>(
    open ? `${SERVER_URL}/sales/${id}` : null,
  );

  const formMappedData = useMemo<SalesSchemaType | undefined>(() => {
    if (!data) return undefined;

    return mapDbDataToForm(data);
  }, [data]);

  const salesHeader = useMemo<SalesHeader | undefined>(() => {
    if (!data) return undefined;

    return data[0].sales_id;
  }, [data]);

  const submitHandler = async (values: SalesSchemaType) => {
    if (!salesHeader || !isSalesHeader(salesHeader)) return;

    try {
      await api.put(`/sales/${salesHeader.id}`, values);
      toast.success("Data penjualan berhasil diedit");
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

  return (
    <DialogWithForm
      size="xxl"
      title="Tambah Data Baru"
      description="Isi data di bawah ini untuk menambah data baru"
      onOpenChange={(open) => {
        if (!open) {
          update({
            action: null,
            id: null,
          });
        }
      }}
      open={open}
      FormComponent={
        <FormSales
          defaultValues={formMappedData}
          submitHandler={submitHandler}
        />
      }
    />
  );
}
