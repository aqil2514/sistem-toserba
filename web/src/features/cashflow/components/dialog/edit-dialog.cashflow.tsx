import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCashflow } from "../../store/provider.cashflow";
import { CashflowForm } from "../form/cashflow.form";
import { api } from "@/lib/api";
import { CashflowSchemaType } from "../../schema/cashflow.schema";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export function CashflowEditDialog() {
  const { mutate, editDialog, setEditDialog } = useCashflow();

  const open = !!editDialog;

  if (!editDialog) return null;

  const editHandler = async (values: CashflowSchemaType) => {
    try {
      await api.put(`/cashflow/${editDialog.id}/edit`, values);
      setEditDialog(null);
      toast.success("Data transaksi berhasil diedit");

      mutate?.();
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data.message?.[0] ?? "Terjadi kesalahan";

        toast.error(message);
      }
      console.error(error);
    }
  };

  const defaultValues: CashflowSchemaType = {
    category: {
      description: editDialog.category.description,
      name: editDialog.category.name,
      status: editDialog.status_cashflow,
    },
    note: editDialog.note,
    price: editDialog.price,
    product_service: editDialog.product_service,
   transaction_at: new Date(editDialog.transaction_at).toISOString(),

    via: editDialog.via,
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) setEditDialog(null);
      }}
    >
      <DialogContent className="sm:max-w-2xl space-y-4">
        <DialogHeader>
          <DialogTitle>Edit Transaksi</DialogTitle>
          <DialogDescription>
            Isi form di bawah ini untuk mengedit data transaksi
          </DialogDescription>
        </DialogHeader>

        <CashflowForm
          defaultValues={defaultValues}
          submitHandler={editHandler}
        />
      </DialogContent>
    </Dialog>
  );
}
