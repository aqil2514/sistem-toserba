import { usePurchase } from "@/features/purchase/store/provider.purchase";
import { PurchaseForm } from "../../form/form.purchase";
import { PurchaseFormValues } from "@/features/purchase/schema/purchase.schema";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { useQueryParams } from "@/hooks/use-query-params";
import { DialogWithForm } from "@/components/molecules/dialog/dialog-with-form";

export function PurchaseAddDialog() {
  const { mutate } = usePurchase();

  const { get, remove } = useQueryParams();

  const open = get("action") === "add";

  const submitHandler = async (values: PurchaseFormValues) => {
    try {
      await api.post("/purchase", values);
      toast.success("Data Pembelian berhasil ditambah");
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
      FormComponent={<PurchaseForm onSubmit={submitHandler} />}
      description="Isi form di bawah ini untuk menambah data pembelian"
      title="Tambah Data Pembelian"
      open={open}
      onOpenChange={(open) => {
        if (!open) return remove("action");
      }}
      size="3xl"
    />
  );
}
