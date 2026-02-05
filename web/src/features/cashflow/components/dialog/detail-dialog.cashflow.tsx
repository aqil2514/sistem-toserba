import { useFetch } from "@/hooks/use-fetch";
import { useCashflow } from "../../store/provider.cashflow";
import { CashflowDb } from "../../types/cashflow.types";
import { SERVER_URL } from "@/constants/url";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CashflowDetailData } from "../detail-data/cashflow.detail-data";
import { MutateButton } from "@/components/ui/mutate-button";

export function CashflowDetailDialog() {
  const { mutate, detailDialog, setDetailDialog } = useCashflow();
  const open = Boolean(detailDialog);

  const { data, isLoading } = useFetch<CashflowDb[]>(
    open ? `${SERVER_URL}/cashflow/${detailDialog}` : null,
  );

  if (!detailDialog || !data || isLoading) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) setDetailDialog(null);
      }}
    >
      <DialogContent className="sm:max-w-xl space-y-4">
        <DialogHeader>
            <div className="flex gap-4 items-center justify-between">

          <DialogTitle>Detail Transaksi</DialogTitle>
          <MutateButton mutate={mutate} />
            </div>
          <DialogDescription>
            Isi form di bawah ini untuk mengedit data transaksi
          </DialogDescription>
        </DialogHeader>

        <CashflowDetailData data={data} />
      </DialogContent>
    </Dialog>
  );
}
