import { SERVER_URL } from "@/constants/url";
import { usePurchase } from "@/features/purchase/store/purchase.provider";
import { PurchaseMappedDetail } from "@/features/purchase/types/purchase-mapped-detail";
import { useFetch } from "@/hooks/use-fetch";
import { DetailHeader } from "./detail-header.purchase";
import { useQueryParams } from "@/hooks/use-query-params";
import { DetailDialog } from "@/components/molecules/dialog/detail-dialog";
import { DetailItem } from "./detail-item.purchase";
import { EmptyData } from "@/components/molecules/empty/empty-data";

export function PurchaseDetailDialog() {
  const { data: headerData } = usePurchase();
  const { get, update } = useQueryParams();
  const open = get("action") === "detail";
  const id = get("id");

  const { isLoading, data, mutate } = useFetch<PurchaseMappedDetail[]>(
    open ? `${SERVER_URL}/purchase/${id}` : null,
  );

  if (!open || !headerData || !data) return null;

  const purchaseHeader = headerData?.data?.find(
    (purchase) => purchase.id === id,
  );

  return (
    <DetailDialog
      mutate={mutate}
      size="xxl"
      Component={
        purchaseHeader ? (
          <div className="grid grid-cols-2 gap-4">
            <DetailHeader data={purchaseHeader} />
            <DetailItem items={data} />
          </div>
        ) : (
          <EmptyData />
        )
      }
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
        if (!open) return update({ action: null, id: null });
      }}
      open={open}
    />
  );
}
