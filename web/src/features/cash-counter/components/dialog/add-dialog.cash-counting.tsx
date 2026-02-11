import { DialogWithForm } from "@/components/molecules/dialog/dialog-with-form";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useCashCounts } from "../../store/cash-counting.provider";
import { CashCountingForms } from "../forms/cash-counting/forms.cash-counting";
import { CashCountSchemaType } from "../../schemas/cash-counts.schema";

export function CashCountingAddDialog() {
  const { addDialog, setAddDialog, mutate } = useCashCounts();

  const addHandler = async (values: CashCountSchemaType) => {
    try {
      await api.post("/cash-counter/cash-counting", values);

      toast.success("Data denominasi berhasil ditambah");
      // setAddDialog(false);
      mutate?.();
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <DialogWithForm
      size="xxl"
      title="Tambah Data Baru"
      description="Isi data di bawah ini untuk menambah data baru"
      onOpenChange={setAddDialog}
      open={addDialog}
      FormComponent={
        <CashCountingForms onFormSubmit={addHandler} />
      }
    />
  );
}
