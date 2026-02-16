import { DialogWithForm } from "@/components/molecules/dialog/dialog-with-form";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useQueryParams } from "@/hooks/use-query-params";
import { useSales } from "../../store/sales.provider";
import { isAxiosError } from "axios";
import { SalesSchemaType } from "../../schemas/sales-schema";
import { FormSales } from "../form/form.sales";

export function SalesAddDialog() {
  const { mutate } = useSales();
  const { get, remove } = useQueryParams();

  const open = get("action") === "add";

  const submitHandler = async (values: SalesSchemaType) => {
    try {
      await api.post("/sales", values);
      if (window.opener) {
        window.opener.postMessage(
          { type: "ADD_SALES_SUCCESS" },
          window.location.origin,
        );

        window.close();
        return;
      }
      toast.success("Data penjualan berhasil ditambah");
      mutate?.();
      remove("action");
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
        if (!open) remove("action");
      }}
      open={open}
      FormComponent={<FormSales submitHandler={submitHandler} />}
    />
  );
}
