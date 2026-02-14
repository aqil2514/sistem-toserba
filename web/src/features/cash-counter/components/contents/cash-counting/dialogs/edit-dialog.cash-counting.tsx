import { DialogWithForm } from "@/components/molecules/dialog/dialog-with-form";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { useCashCounts } from "@/features/cash-counter/store/cash-counting.provider";
import { CashCountSchemaType } from "@/features/cash-counter/schemas/cash-counts.schema";
import { CashCountingForms } from "../forms/forms.cash-counting";
import { useQueryParams } from "@/hooks/use-query-params";

export function CashCountingEditDialog() {
  const { mutate } = useCashCounts();
  const { get, update } = useQueryParams();

  const open = get("action") === "edit";
  const id = get("id");

  const {
    data,
    isLoading,
    mutate: mutateOldData,
  } = useFetch<CashCountSchemaType>(
    id ? `${SERVER_URL}/cash-counter/cash-counting/${id}/form` : null,
  );

  const editHandler = async (values: CashCountSchemaType) => {
    if (!data) return;
    try {
      await api.put(`/cash-counter/cash-counting/${id}`, values);

      toast.success("Data denominasi berhasil ditambah");
      update({
        action: null,
        id: null,
      });
      mutate?.();
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <DialogWithForm
      title={`Edit Denominasi`}
      description="Isi data di bawah ini untuk edit data denominasi"
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
        <CashCountingForms
          defaultValues={data}
          onFormSubmit={editHandler}
          mutate={mutateOldData}
        />
      }
      isLoadingEdit={isLoading}
      size="xxl"
    />
  );
}
