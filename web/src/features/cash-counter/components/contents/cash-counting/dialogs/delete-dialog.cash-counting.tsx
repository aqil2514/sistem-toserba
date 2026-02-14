import { toast } from "sonner";
import { api } from "@/lib/api";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { useCashCounts } from "@/features/cash-counter/store/cash-counting.provider";
import { CashCountSchemaType } from "@/features/cash-counter/schemas/cash-counts.schema";
import { DeleteDialog } from "@/components/molecules/dialog/delete-dialog";
import { LabelValue } from "@/@types/general";
import { useMemo } from "react";
import { formatDate } from "@/utils/format-date.fns";
import { useQueryParams } from "@/hooks/use-query-params";

export function CashCountingDeleteDialog() {
  const { mutate } = useCashCounts();
  const { get, update } = useQueryParams();

  const open = get("action") === "delete";
  const id = get("id");

  const { data, isLoading } = useFetch<CashCountSchemaType>(
    id ? `${SERVER_URL}/cash-counter/cash-counting/${id}/form` : null,
  );

  const deleteHandler = async () => {
    if (!data) return;
    try {
      await api.delete(`/cash-counter/cash-counting/${id}`);

      toast.success("Data berhasl dihapus");
      update({
        action: null,
        id: null,
      });
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
        label: "Tanggal",
        value: formatDate(data.date, "Senin, 29 Desember 2025"),
      },
    ];
  }, [data]);

  return (
    <DeleteDialog
      onDeleteHandle={deleteHandler}
      onOpenChange={(open) => {
        if (!open) {
          update({
            action: null,
            id: null,
          });
        }
      }}
      contents={contents}
      isLoading={isLoading}
      open={open}
    />
  );
}
