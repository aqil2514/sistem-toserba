import { DetailDialog } from "@/components/molecules/dialog/detail-dialog";
import { useFetch } from "@/hooks/use-fetch";
import { SERVER_URL } from "@/constants/url";
import { useQueryParams } from "@/hooks/use-query-params";
import { SalesItemApiResponse } from "../../types/sales-item-api";
import { SalesDetail } from "../detail/detail.sales";

export function SalesDetailDialog() {
  const { get, update } = useQueryParams();

  const open = get("action") === "detail";
  const id = get("id");

  const { data, isLoading, mutate } = useFetch<SalesItemApiResponse[]>(
    open ? `${SERVER_URL}/sales/${id}` : null,
  );

  return (
    <DetailDialog
      Component={<SalesDetail data={data} />}
      description="Informasi data penjualan"
      title="Detail Data Penjualan"
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
