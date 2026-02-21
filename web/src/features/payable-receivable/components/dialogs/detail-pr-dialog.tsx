import { DetailDialog } from "@/components/molecules/dialog/detail-dialog";
import { DataTable } from "@/components/organisms/custom-data-table/core-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SERVER_URL } from "@/constants/url";
import {
  PayableReceivable,
  PayableReceivableDetail,
  PayableReceivableSummary,
} from "@/features/payable-receivable/types/detail.types";
import { useFetch } from "@/hooks/use-fetch";
import { useQueryParams } from "@/hooks/use-query-params";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { buildUrlClient } from "@/utils/url-builder/build-url-client";
import { User } from "lucide-react";
import React from "react";
import { detailPRColumn } from "../columns/detail-pr-column";
import { ScrollArea } from "@/components/ui/scroll-area";

export function PayableReceivableDetailDialog() {
  const { get, update } = useQueryParams({ replace: true });
  const type = get("detail_type");
  const counterpart_name = get("detail_counterpart_name");

  const open = type !== null && counterpart_name !== null;

  const url = buildUrlClient({
    endpoint: "cashflow/payable-receivable/detail",
    base: SERVER_URL,
    query: {
      type,
      counterpart_name,
    },
  });

  const { data, isLoading, mutate } = useFetch<PayableReceivable>(
    open ? url : null,
  );

  if (!open) return null;

  const isReceivable = type === "receivable";

  return (
    <DetailDialog
      Component={<DialogComponent data={data} />}
      description={`Detail transaksi ${isReceivable ? "Piutang" : "Utang"} ${counterpart_name}`}
      title={`Detail ${isReceivable ? "Piutang" : "Utang"} ${counterpart_name}`}
      open={open}
      onOpenChange={(open) => {
        if (!open)
          return update({ detail_type: null, detail_counterpart_name: null });
      }}
      isLoading={isLoading}
      mutate={mutate}
      size="xxl"
    />
  );
}

interface DialogComponentProps {
  data: PayableReceivable | undefined;
}
const DialogComponent: React.FC<DialogComponentProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-4">
      <Summary summaryData={data.summary} />
      <Separator />
      <Detail detailData={data.detail} />
    </div>
  );
};

const Summary: React.FC<{ summaryData: PayableReceivableSummary }> = ({
  summaryData,
}) => {
  const { counterpart_name, paid, rest, status, total, type } = summaryData;

  const isReceivable = type === "receivable";

  const typeBadgeClass = isReceivable
    ? "border-blue-300 text-blue-600 bg-blue-50"
    : "border-red-300 text-red-600 bg-red-50";

  const statusBadgeClass =
    status === "paid"
      ? "border-green-300 text-green-600 bg-green-50"
      : "border-yellow-300 text-yellow-700 bg-yellow-50";

  const restClass = isReceivable
    ? rest > 0
      ? "text-yellow-600"
      : "text-green-600"
    : rest > 0
      ? "text-red-600"
      : "text-green-600";

  return (
    <Card className="rounded-xl shadow-sm">
      <CardContent className="flex items-center justify-between gap-4 px-4 py-3">
        {/* Identity */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted shrink-0">
            <User className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold truncate">{counterpart_name}</p>
          <Badge
            variant="outline"
            className={cn("text-xs font-medium shrink-0", typeBadgeClass)}
          >
            {isReceivable ? "Piutang" : "Utang"}
          </Badge>
          <Badge
            variant="outline"
            className={cn("text-xs font-medium shrink-0", statusBadgeClass)}
          >
            {status === "paid" ? "Lunas" : "Belum Lunas"}
          </Badge>
        </div>

        <Separator orientation="vertical" className="h-8 shrink-0" />

        {/* Figures */}
        <div className="flex items-center gap-4 shrink-0 text-right">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-sm font-medium">{formatRupiah(total)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Dibayar</p>
            <p className="text-sm font-medium text-blue-600">
              {formatRupiah(paid)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Sisa</p>
            <p className={cn("text-sm font-bold", restClass)}>
              {formatRupiah(rest)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Detail: React.FC<{ detailData: PayableReceivableDetail[] }> = ({
  detailData,
}) => {
  return (
    <ScrollArea className="h-96 px-4">

    <div>
      <DataTable columns={detailPRColumn} data={detailData} />
    </div>
    </ScrollArea>
  );
};
