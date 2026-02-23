import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";
import { useQueryParams } from "@/hooks/use-query-params";
import { DetailDialog } from "@/components/molecules/dialog/detail-dialog";
import { PurchaseDetailReturn } from "@/features/purchase/types/purchase-api.types";
import { PurchaseDetailComponent } from "./detail-component.purchase";

export function PurchaseDetailDialog() {
  const { get, update } = useQueryParams();
  const open = get("action") === "detail";
  const id = get("id");

  const { isLoading, data, mutate } = useFetch<PurchaseDetailReturn>(
    open ? `${SERVER_URL}/purchase/${id}` : null,
  );

  if (!open) return null;

  const purchaseHeader = data?.header;

  return (
    <DetailDialog
      mutate={mutate}
      size="xxl"
      Component={<PurchaseDetailComponent data={data} />}
      isLoading={isLoading}
      title={
        purchaseHeader
          ? `Detail Pembelian ${purchaseHeader.purchase_code}`
          : "Detail Pembelian Tidak Tersedia"
      }
      description={
        purchaseHeader
          ? `Detail pembelian dengan kode pembelian ${purchaseHeader.purchase_code}`
          : "Detail Pembelian Tidak Tersedia"
      }
      onOpenChange={(open) => {
        if (!open)
          return update({ action: null, id: null, purchase_type: null });
      }}
      open={open}
    />
  );
}
