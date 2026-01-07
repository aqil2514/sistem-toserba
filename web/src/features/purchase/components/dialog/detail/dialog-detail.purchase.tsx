import { LoadingDialog } from "@/components/molecules/dialog/loading-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SERVER_URL } from "@/constants/url";
import { usePurchase } from "@/features/purchase/store/provider.purchase";
import { PurchaseMappedDetail } from "@/features/purchase/types/purchase-mapped-detail";
import { useFetch } from "@/hooks/use-fetch";
import { DetailHeader } from "./detail-header.purchase";
import { DetailItem } from "./detail-item.purchase";

export function PurchaseDetailDialog() {
  const { detailPurchaseId, setDetailPurchaseId, data } = usePurchase();

  const open = Boolean(detailPurchaseId);

  const fetcher = useFetch<PurchaseMappedDetail[]>(
    open ? `${SERVER_URL}/purchase/${detailPurchaseId}` : null
  );

  if (!open || !data) return null;

  if (fetcher.isLoading || !fetcher.data)
    return (
      <LoadingDialog
        onOpenChange={(open) => {
          if (!open) return setDetailPurchaseId("");
        }}
        open={open}
      />
    );

  const purchaseHeader = data.data.find(
    (purchase) => purchase.id === detailPurchaseId
  )!;

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) return setDetailPurchaseId("");
      }}
    >
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>
            Detail Pembelian {purchaseHeader.purchase_code}{" "}
          </DialogTitle>
          <DialogDescription>
            Detail pembelian dengan kode pembelian{" "}
            {purchaseHeader.purchase_code}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <DetailHeader data={purchaseHeader} />
          <DetailItem items={fetcher.data} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
