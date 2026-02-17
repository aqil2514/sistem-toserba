import { LabelValue } from "@/@types/general";
import { DeleteDialog } from "@/components/molecules/dialog/delete-dialog";
import { usePurchase } from "@/features/purchase/store/purchase.provider";
import { useQueryParams } from "@/hooks/use-query-params";
import { api } from "@/lib/api";
import { formatDate } from "@/utils/format-date.fns";
import { isAxiosError } from "axios";
import { useMemo } from "react";
import { toast } from "sonner";

export function PurchaseDeleteDialog() {
  const { mutate, data } = usePurchase();

  const { update, get } = useQueryParams();

  const open = get("action") === "delete";
  const id = get("id");

  const deleteHandler = async () => {
    try {
      await api.delete(`/purchase/${id}`);
      toast.success("Data pembelian berhasil dihapus");
      mutate?.();
      update({
        action: null,
        id: null,
      });
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

  const contents = useMemo<LabelValue[]>(() => {
    if (!data) return [];

    const selectedData = data.data.find((d) => d.id === id);

    return [
      {
        value: selectedData?.purchase_code ?? "-",
        label: "Kode Pembelian",
      },
      {
        value: selectedData?.supplier_name ?? "-",
        label: "Nama Supplier",
      },
      {
        value: selectedData?.supplier_type ?? "-",
        label: "Tipe Supplier",
      },
      {
        value: selectedData ? formatDate(selectedData.purchase_date, "Senin, 29 Desember 2025") : "-",
        label: "Tanggal Pembelian",
      },
    ];
  }, [data, id]);

  return (
    <DeleteDialog
      onDeleteHandle={deleteHandler}
      onOpenChange={(open) => {
        if (!open) return update({ action: null, id: null });
      }}
      open={open}
      contents={contents}
    />
  );
}
