import { DetailDialog } from "@/components/molecules/dialog/detail-dialog";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { CashCountingApiReturn } from "@/features/cash-counter/types/type.cash-counter-cash-counting";
import { CashCountingDetail } from "../sub/cash-counting.detail";
import { useQueryParams } from "@/hooks/use-query-params";

export function CashCountingDetailDialog() {
  const { get, update } = useQueryParams();

  const open = get("action") === "detail";
  const id = get("id");

  const { data, isLoading, mutate } = useFetch<CashCountingApiReturn>(
    open ? `${SERVER_URL}/cash-counter/cash-counting/${id}` : null,
  );

  return (
    <DetailDialog
      Component={<CashCountingDetail data={data} />}
      description="Informasi data menghitung uang"
      title="Detail Hitung Uang"
      onOpenChange={(open) => {
        if (!open) {
          update({
            action: null,
            id: null,
          });
        }
      }}
      mutate={mutate}
      open={open}
      isLoading={isLoading}
      size="xxl"
    />
  );
}
