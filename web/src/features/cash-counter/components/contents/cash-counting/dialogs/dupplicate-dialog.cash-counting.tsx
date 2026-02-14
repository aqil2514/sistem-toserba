import { DialogWithForm } from "@/components/molecules/dialog/dialog-with-form";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { useCashCounts } from "../../../../store/cash-counting.provider";
import { CashCountSchemaType } from "../../../../schemas/cash-counts.schema";
import { CashCountingForms } from "../forms/forms.cash-counting";
import { useQueryParams } from "@/hooks/use-query-params";

export function CashCountingDupplicateDialog() {
  const { mutate } = useCashCounts();
  const { get, update } = useQueryParams();

  const open = get("action") === "copy";
  const id = get("id");

  const {
    data,
    isLoading,
    mutate: mutateOldData,
  } = useFetch<CashCountSchemaType>(
    id ? `${SERVER_URL}/cash-counter/cash-counting/${id}/form` : null,
  );

  const dupplicateHandler = async (values: CashCountSchemaType) => {
    if (!data) return;
    try {
      await api.post("/cash-counter/cash-counting", values);

      toast.success("Data duplikat berhasil ditambah");
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
      title={`Duplikat Data Hitung Uang`}
      description="Isi data di bawah ini untuk duplikat data hitung uang"
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
          onFormSubmit={dupplicateHandler}
          mutate={mutateOldData}
        />
      }
      isLoadingEdit={isLoading}
      size="xxl"
    />
  );
}
