import { DetailDialog } from "@/components/molecules/dialog/detail-dialog";
import { useCashCounts } from "../../store/cash-counting.provider";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { CashCountingDetail } from "../cash-counting/cash-counting.detail";
import { CashCountingApiReturn } from "../../types/type.cash-counter-cash-counting";

export function CashCountingDetailDialog() {
  const { detailDialog, setDetailDialog } = useCashCounts();
  const open = Boolean(detailDialog);

  const { data, isLoading, mutate } = useFetch<CashCountingApiReturn>(
    open ? `${SERVER_URL}/cash-counter/cash-counting/${detailDialog}` : null,
  );

  return (
    <DetailDialog
      Component={<CashCountingDetail data={data} />}
      description="Informasi data menghitung uang"
      title="Detail Hitung Uang"
      onOpenChange={(open) => {
        if (!open) setDetailDialog(null);
      }}
      mutate={mutate}
      open={open}
      isLoading={isLoading}
      size="xxl"
    />
  );
}
