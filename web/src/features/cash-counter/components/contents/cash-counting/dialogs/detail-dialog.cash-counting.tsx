import { DetailDialog } from "@/components/molecules/dialog/detail-dialog";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { CashCountingApiReturn } from "@/features/cash-counter/types/type.cash-counter-cash-counting";
import { useCashCounts } from "@/features/cash-counter/store/cash-counting.provider";
import { CashCountingDetail } from "../sub/cash-counting.detail";

export function CashCountingDetailDialog() {
  const { openDialog, setOpenDialog } = useCashCounts();
  const open = openDialog?.type === "detail";
  const id = openDialog?.type === "detail" ? openDialog.id : null;

  const { data, isLoading, mutate } = useFetch<CashCountingApiReturn>(
    open ? `${SERVER_URL}/cash-counter/cash-counting/${id}` : null,
  );

  return (
    <DetailDialog
      Component={<CashCountingDetail data={data} />}
      description="Informasi data menghitung uang"
      title="Detail Hitung Uang"
      onOpenChange={(open) => {
        if (!open) setOpenDialog(null);
      }}
      mutate={mutate}
      open={open}
      isLoading={isLoading}
      size="xxl"
    />
  );
}
