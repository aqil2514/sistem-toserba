import { OneLineItem } from "@/components/molecules/items/one-line-item";
import { Purchase } from "@/features/purchase/types/purchase";
import { formatDate } from "@/utils/format-date.fns";

interface Props {
  data: Purchase;
}

export function DetailHeader({ data }: Props) {
  return (
    <div className="space-y-4">
      <OneLineItem label="Kode Pembelian" value={data.purchase_code} />
      <OneLineItem label="Tanggal Pembelian" value={formatDate(data.purchase_date, "Senin, 29 Desember 2025")} />
      <OneLineItem label="Nama Supplier" value={data.supplier_name} />
      <OneLineItem label="Jenis Supplier" value={data.supplier_type} />
      {data.notes && <OneLineItem label="Catatan" value={data.notes} />}
    </div>
  );
}
