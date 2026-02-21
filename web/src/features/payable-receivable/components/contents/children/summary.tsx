import { formatRupiah } from "@/utils/format-to-rupiah";

interface Props {
  payableAmount: number;
  receivableAmount: number;
}

export function PayableReceivableSummary({
  payableAmount,
  receivableAmount,
}: Props) {
  return (
    <div className="flex flex-wrap gap-6 justify-end text-sm">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Total Utang</span>
        <span className="font-semibold text-red-600">
          {formatRupiah(payableAmount)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Total Piutang</span>
        <span className="font-semibold text-green-600">
          {formatRupiah(receivableAmount)}
        </span>
      </div>
    </div>
  );
}
