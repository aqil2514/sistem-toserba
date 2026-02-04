import { DeleteDialog } from "@/components/molecules/dialog/delete-dialog";
import { useCashflow } from "../../store/provider.cashflow";
import { useFetch } from "@/hooks/use-fetch";
import { CashflowDb } from "../../types/cashflow.types";
import { SERVER_URL } from "@/constants/url";
import { mapDbToDeleteDialogContent } from "../../utils/map-db-to-delete-dialog-content";
import { api } from "@/lib/api";

export function CashflowDeleteDialog() {
  const { deleteDialog, setDeleteDialog, mutate } = useCashflow();

  const open = Boolean(deleteDialog);

  const { data, isLoading } = useFetch<CashflowDb[]>(
    open ? `${SERVER_URL}/cashflow/${deleteDialog}` : null,
  );

  if (!deleteDialog || !data || isLoading) return null;

  const deleteHandle = async () => {
    const transferGroupId = data[0].transfer_group_id;
    await api.delete(
      `/cashflow/${deleteDialog}${transferGroupId ? `?transfer_group_id=${transferGroupId}` : ""}`,
    );

    await mutate?.();
  };

  const contents = mapDbToDeleteDialogContent(data);
  return (
    <DeleteDialog
      onDeleteHandle={deleteHandle}
      onOpenChange={(open) => {
        if (!open) setDeleteDialog(null);
      }}
      open={open}
      contents={contents}
    />
  );
}
