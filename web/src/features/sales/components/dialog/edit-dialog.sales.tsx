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

export function SalesEditDialog() {
  const { mutate } = useSales();
  const { get, update } = useQueryParams();

  const open = get("action") === "edit";
  const id = get("id");


  const { data } = useFetch<SalesItemApiResponse[]>(
    open ? `${SERVER_URL}/sales/${id}` : null,
  );

  if(!data) return null;

  const formMappedData = mapDbDataToForm(data);

  const salesHeader = data[0].sales_id;

  const submitHandler = async (values: SalesSchemaType) => {
    if (!salesHeader || !isSalesHeader(salesHeader)) return;

    try {
      await api.put(`/sales/${salesHeader.id}`, values);
      if (window.opener) {
        window.opener.postMessage(
          { type: "EDIT_SALES_SUCCESS" },
          window.location.origin,
        );

        window.close();
        return;
      }
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
      title="Edit Data Penjualan"
      description="Isi data di bawah ini untuk edit data penjualan"
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
