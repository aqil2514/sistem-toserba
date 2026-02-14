import { DialogWithForm } from "@/components/molecules/dialog/dialog-with-form";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { useMemo } from "react";
import { useDenomination } from "@/features/cash-counter/store/denomination.provider";
import { CashDenomination } from "@/features/cash-counter/types/types.cash-counter-denomination";
import { DenominationSchemaType } from "@/features/cash-counter/schemas/denominations.schema";
import { DenominationForms } from "../forms/forms.denomination";

export function DenominationEditDialog() {
  const { mutate, editDialog, setEditDialog } = useDenomination();

  const open = Boolean(editDialog);

  const {
    data,
    isLoading,
    mutate: mutateOldData,
  } = useFetch<CashDenomination>(
    open ? `${SERVER_URL}/cash-counter/denomination/${editDialog}` : null,
  );

  const editHandler = async (values: DenominationSchemaType) => {
    if (!data) return;
    try {
      await api.put(`/cash-counter/denomination/${data.id}`, values);

      toast.success("Data denominasi berhasil ditambah");
      setEditDialog(null);
      mutate?.();
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan");
    }
  };

  const mappedData = useMemo<DenominationSchemaType | undefined>(() => {
    if (!data) return undefined;
    return {
      is_active: data.is_active,
      label: data.label,
      nominal: data.nominal,
      type: data.type,
    };
  }, [data]);

  return (
    <DialogWithForm
      title={`Edit Denominasi`}
      description="Isi data di bawah ini untuk edit data denominasi"
      onOpenChange={(open) => {
        if (!open) setEditDialog(null);
      }}
      open={open}
      FormComponent={
        <DenominationForms
          defaultValues={mappedData}
          onFormSubmit={editHandler}
          mutate={mutateOldData}
        />
      }
      isLoadingEdit={isLoading}
    />
  );
}
