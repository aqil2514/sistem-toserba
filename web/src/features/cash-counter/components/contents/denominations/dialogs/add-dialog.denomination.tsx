import { DialogWithForm } from "@/components/molecules/dialog/dialog-with-form";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useDenomination } from "@/features/cash-counter/store/denomination.provider";
import { DenominationSchemaType } from "@/features/cash-counter/schemas/denominations.schema";
import { DenominationForms } from "../forms/forms.denomination";

export function DenominationAddDialog() {
  const { addDialog, setAddDialog, mutate } = useDenomination();

  const addHandler = async (values: DenominationSchemaType) => {
    try {
      await api.post("/cash-counter/denomination", values);

      toast.success("Data denominasi berhasil ditambah");
      setAddDialog(false);
      mutate?.();
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <DialogWithForm
      title="Tambah Data Denominasi"
      description="Isi data di bawah ini untuk menambah data denominasi baru"
      onOpenChange={setAddDialog}
      open={addDialog}
      FormComponent={<DenominationForms onFormSubmit={addHandler} />}
    />
  );
}
