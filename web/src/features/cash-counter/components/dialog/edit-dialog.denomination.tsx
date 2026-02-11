import { DialogWithForm } from "@/components/molecules/dialog/dialog-with-form";
import { useDenomination } from "../../store/denomination.provider";
import { DenominationForms } from "../forms/forms.denomination";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { DenominationSchemaType } from "../../schemas/denominations.schema";
import { useFetch } from "@/hooks/use-fetch";
import { CashDenomination } from "../../types/types.cash-counter-denomination";
import { SERVER_URL } from "@/constants/url";
import { useMemo } from "react";

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
