import { LabelValue } from "@/@types/general";
import { Product, ProductStockRpcResponse } from "@/features/products/types/type";
import { formatRupiah } from "@/utils/format-to-rupiah";
import { useMemo } from "react";

interface Props {
  p: LabelValue;
  data: Product[] | undefined;
  stocks: ProductStockRpcResponse["data"] | undefined;
}

export function ComboboxProductLabel({ p, data, stocks }: Props) {
  const productPriceMap = useMemo(() => {
    if (!data) return {};

    return Object.fromEntries(data.map((p) => [p.id, p.price]));
  }, [data]);

  const productStockMap = useMemo(() => {
    if (!stocks) return {};

    return Object.fromEntries(
      stocks.map((p) => [p.product_id, p.remaining_quantity]),
    );
  }, [stocks]);

  const price = productPriceMap[p.value] ?? 0;
  const stock = productStockMap[p.value] ?? 0;

  return (
    <div className="space-y-1">
      <p className="text-gray-500 font-bold">{p.label}</p>
      <p className="text-muted-foreground">
        {formatRupiah(price)} | ({stock} pcs)
      </p>
    </div>
  );
}
