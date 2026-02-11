import React from "react";
import {
  CashCounterDetail,
  CashCounterHeader,
  CashCounterThirdParty,
  CashCountingApiReturn,
} from "../../types/type.cash-counter-cash-counting";
import { Separator } from "@/components/ui/separator";
import { InfoItem } from "@/components/molecules/items/info-item";
import { formatDate } from "@/utils/format-date.fns";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { OneLineItem } from "@/components/molecules/items/one-line-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface Props {
  data: CashCountingApiReturn | undefined;
}

export function CashCountingDetail({ data }: Props) {
  if (!data) return null;

  return (
    <div className="space-y-4">
      <ScrollArea className="h-96">
        <div className="space-y-4">
          <Header data={data.header} />
          <Separator />
          <ThirdParty data={data.thirdParty} />
          <Separator />
          <Details data={data.details} />
        </div>
      </ScrollArea>
      <Separator />
      <DialogFooter>

      <Button variant={"outline"}> Sesuaikan Cashflow </Button>
      </DialogFooter>
    </div>
  );
}

const Header: React.FC<{ data: CashCounterHeader }> = ({ data }) => {
  const {
    date,
    difference,
    net_store_cash,
    system_cash,
    third_party_cash,
    total_physical_cash,
    note,
  } = data;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <InfoItem
          label="Tanggal"
          value={formatDate(date, "Senin, 29 Desember 2025")}
        />
        <InfoItem label="Data Di Sistem" value={formatRupiah(system_cash)} />
        <InfoItem
          label="Uang Orang Lain"
          value={formatRupiah(third_party_cash)}
        />
        <InfoItem
          label="Total Uang Tunai"
          value={formatRupiah(total_physical_cash)}
        />
        <InfoItem
          label="Uang Tunai (Bersih)"
          value={formatRupiah(net_store_cash)}
        />
        <InfoItem label="Selisih" value={formatRupiah(difference)} />
      </div>
      {note && <InfoItem label="Catatan" value={note} />}
    </div>
  );
};

const ThirdParty: React.FC<{ data: CashCounterThirdParty[] }> = ({ data }) => {
  if (data.length === 0) return null;

  return (
    <>
      <p className="text-sm font-semibold underline">Detail Uang Orang Lain</p>
      <div className="grid grid-cols-2 gap-4">
        {data.map((d, i) => (
          <Card key={d.source}>
            <CardHeader>
              <CardTitle>Pihak Ke-{i + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <OneLineItem label="Nama Pihak" value={d.source} />
              <OneLineItem label="Jumlah" value={formatRupiah(d.amount)} />
              {d.note && <OneLineItem label="Catatan" value={d.note} />}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

const Details: React.FC<{ data: CashCounterDetail[] }> = ({ data }) => {
  return (
    <>
      <p className="font-semibold text-sm underline">Detail Pecahan</p>
      <div className="grid grid-cols-5 gap-4">
        {data.map((d) => (
          <InfoItem
            key={d.label}
            label={d.label}
            value={`${formatRupiah(d.subtotal)}`}
          />
        ))}
      </div>
    </>
  );
};
