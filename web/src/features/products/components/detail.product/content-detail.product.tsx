import { InfoItem } from "@/components/molecules/items/info-item";
import { Product } from "../../types/type";
import { formatRupiah } from "@/utils/format-to-rupiah";

interface Props {
  data: Product;
}

export function ContentDetail({ data }: Props) {
  return (
    <div className="flex gap-4 justify-center">
      <InfoItem
        label="Nama Produk"
        value={`${data.name}`}
      />
      <InfoItem
        label="Sisa Stok"
        value={`${data.stock} ${data.unit}`}
      />
      <div className="grid grid-cols-2 gap-4">
        <InfoItem label="Kategori" value={data.category} />
        <InfoItem label="Subkategori" value={data.subcategory} />
      </div>

      <InfoItem label="Harga" value={formatRupiah(data.price)} />
    </div>
  );
}
