import { DialogWithForm } from "@/components/molecules/dialog/dialog-with-form";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { useCashCounts } from "../../store/cash-counting.provider";
import { CashCountSchemaType } from "../../schemas/cash-counts.schema";
import { CashCountingForms } from "../forms/cash-counting/forms.cash-counting";

export function CashCountingEditDialog() {
  const { mutate, editDialog, setEditDialog } = useCashCounts();

  const open = Boolean(editDialog);

  const {
    data,
    isLoading,
    mutate: mutateOldData,
  } = useFetch<CashCountSchemaType>(
    open ? `${SERVER_URL}/cash-counter/cash-counting/${editDialog}/form` : null,
  );

  const editHandler = async (values: CashCountSchemaType) => {
    if (!data) return;
    try {
      await api.put(`/cash-counter/cash-counting/${editDialog}`, values);

      toast.success("Data denominasi berhasil ditambah");
      setEditDialog(null);
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
        if (!open) setEditDialog(null);
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
