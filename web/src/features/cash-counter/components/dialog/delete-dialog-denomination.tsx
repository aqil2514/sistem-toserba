import { useDenomination } from "../../store/denomination.provider";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useFetch } from "@/hooks/use-fetch";
import { CashDenomination } from "../../types/types.cash-counter-denomination";
import { SERVER_URL } from "@/constants/url";
import { useMemo } from "react";
import { DeleteDialog } from "@/components/molecules/dialog/delete-dialog";
import { LabelValue } from "@/@types/general";
import { formatRupiah } from "@/utils/format-to-rupiah";

export function DenominationDeleteDialog() {
  const { mutate, deleteDialog, setDeleteDialog } = useDenomination();

  const open = Boolean(deleteDialog);

  const { data, isLoading } = useFetch<CashDenomination>(
    open ? `${SERVER_URL}/cash-counter/denomination/${deleteDialog}` : null,
  );

  const deleteHandler = async () => {
    if (!data) return;
    try {
      await api.delete(`/cash-counter/denomination/${data.id}`);

      toast.success("Data denominasi berhasil dihapus");
      setDeleteDialog(null);
      mutate?.();
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan");
    }
  };

  const contents = useMemo<LabelValue[] | undefined>(() => {
    if (!data) return undefined;

    return [
      {
        label: "Nominal",
        value: formatRupiah(data.nominal),
      },
      {
        label: "Label",
        value: data.label,
      },
      {
        label: "Tipe Denominasi",
        value: data.type=== "coin" ? "Koin" : "Kertas",
      },
    ];
  }, [data]);

  return (
    <DeleteDialog
      onDeleteHandle={deleteHandler}
      open={open}
      onOpenChange={(open) => {
        if (!open) setDeleteDialog(null);
      }}
      contents={contents}
      isLoading={isLoading}
    />
  );
}
