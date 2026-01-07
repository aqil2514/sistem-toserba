import { DeleteDialog } from "@/components/molecules/dialog/delete-dialog";
import { usePurchase } from "@/features/purchase/store/provider.purchase";
import { api } from "@/lib/api";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export function PurchaseDeleteDialog() {
  const { setDeletePurchaseId, deletePurchaseId, mutate } = usePurchase();

  const deleteHandler = async () => {
    try {
      await api.delete(`/purchase/${deletePurchaseId}`);
      mutate?.();
      setDeletePurchaseId("");
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;

        toast.error(data.message ?? "Terjadi kesalahan");
        return;
      }
      toast.error("Terjadi kesalahan");
      console.error(error);
    }
  };

  return (
    <DeleteDialog
      onDeleteHandle={deleteHandler}
      onOpenChange={(open) => {
        if (!open) return setDeletePurchaseId("");
      }}
      open={Boolean(deletePurchaseId)}
    />
  );
}
