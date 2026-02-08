import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useReceivablePayable } from "../../store/payable-receivable.provider";
import React, { useMemo, useState } from "react";
import {
  PayableTypes,
  ReceivableTypes,
} from "../../types/receivable-payable-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { InfoItem } from "@/components/molecules/items/info-item";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { Button } from "@/components/ui/button";

export function PayableReceivableContent() {
  const { data, isLoading } = useReceivablePayable();
  const [type, setType] = useState<"mix" | "payable" | "receivable">("mix");

  const selectedData = useMemo(() => {
    if (!data) return [];
    if (type === "mix") {
      const mixedData = [...data.payable, ...data.receivable];
      return mixedData;
    } else if (type === "payable") return data.payable;
    else if (type === "receivable") return data.receivable;

    return [];
  }, [data, type]);

  if (isLoading) return <LoadingSpinner />;
  if (!data) throw new Error("Data tidak ditemukan");

  const clickHandler = (type: "mix" | "payable" | "receivable") => {
    setType(type);
  };

  const payableAmount = data.payable.reduce((acc, curr) => acc + curr.rest, 0);
  const receivableAmount = data.receivable.reduce(
    (acc, curr) => acc + curr.rest,
    0,
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Button
            variant={type === "mix" ? "default" : "outline"}
            size={"sm"}
            onClick={() => clickHandler("mix")}
          >
            Semua
          </Button>
          <Button
            variant={type === "payable" ? "default" : "outline"}
            size={"sm"}
            onClick={() => clickHandler("payable")}
          >
            Utang
          </Button>
          <Button
            variant={type === "receivable" ? "default" : "outline"}
            size={"sm"}
            onClick={() => clickHandler("receivable")}
          >
            Piutang
          </Button>
        </div>
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
      </div>
      <Separator />
      <div className="grid grid-cols-3 gap-4">
        {selectedData.map((data, i) => (
          <FlexCardRender data={data} key={`data-${i}`} />
        ))}
      </div>
    </div>
  );
}

const FlexCardRender: React.FC<{
  data: PayableTypes | ReceivableTypes;
}> = ({ data }) => {
  const isReceivable = data.type === "receivable";
  const name = isReceivable ? data.customer_name : data.vendor_name;
  const rest = data.rest;

  const statusLabel = data.status === "paid" ? "Lunas" : "Belum Lunas";
  const statusClass =
    data.status === "paid"
      ? "border-green-300 text-green-600 bg-green-50"
      : "border-yellow-300 text-yellow-700 bg-yellow-50";

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold truncate">
          {name}
        </CardTitle>

        <div className="flex gap-2">
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-medium",
              isReceivable
                ? "border-blue-300 text-blue-600 bg-blue-50"
                : "border-red-300 text-red-600 bg-red-50",
            )}
          >
            {isReceivable ? "Piutang" : "Utang"}
          </Badge>

          <Badge
            variant="outline"
            className={cn("text-xs font-medium", statusClass)}
          >
            {statusLabel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Separator />

        <div className="flex justify-between">
          <InfoItem
            label={`${isReceivable ? "Piutang" : "Utang"} Masuk`}
            value={
              <p className="font-medium text-green-600">
                {formatRupiah(data.total)}
              </p>
            }
          />

          <InfoItem
            label="Sudah Dibayar"
            value={
              <p className="font-medium text-blue-600 text-right">
                {formatRupiah(data.paid)}
              </p>
            }
          />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Sisa {isReceivable ? "Piutang" : "Utang"}
          </p>
          <p
            className={cn(
              "text-lg font-bold",
              rest > 0 ? "text-red-600" : "text-green-600",
            )}
          >
            {formatRupiah(rest)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
