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
import { useFetch } from "@/hooks/use-fetch";
import { CashflowDb } from "../../types/cashflow.types";
import { SERVER_URL } from "@/constants/url";

export function CashflowEditDialog() {
  const { mutate, editDialog, setEditDialog } = useCashflow();
  const open = Boolean(editDialog);

  const { data, isLoading } = useFetch<CashflowDb[]>(
    open ? `${SERVER_URL}/cashflow/${editDialog}` : null,
  );

  if (!editDialog || !data || isLoading) return null;

  const editHandler = async (values: CashflowSchemaType) => {
    const transferGroupId = data[0].transfer_group_id;
    try {
      await api.put(
        `/cashflow/${editDialog}/edit${transferGroupId ? `?transfer_group_id=${transferGroupId}` : ""}`,
        values,
      );
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

  const defaultValues: CashflowSchemaType = mapDbToCashflowSchema(data);

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
