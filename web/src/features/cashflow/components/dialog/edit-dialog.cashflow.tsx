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
import { mapDbToCashflowSchema } from "../../utils/map-db-to-cashflow-schema";

export function CashflowEditDialog() {
  const { mutate, editDialog, setEditDialog, data } = useCashflow();

  const open = !!editDialog;

  if (!editDialog || !data) return null;

  const isTransfer = Boolean(editDialog.transfer_group_id);

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

  const transferData = data.data.filter(
    (data) => data.transfer_group_id === editDialog.transfer_group_id,
  );

  const defaultValues: CashflowSchemaType = mapDbToCashflowSchema(
    isTransfer ? transferData : editDialog,
  );

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
