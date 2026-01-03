import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ProductOutHistory } from "../../types/product-out-history";
import { outHistoryColumns } from "../columns.product/out-history-product";

interface Props {
  product_id: string;
}

export function HistoryOutProduct({ product_id }: Props) {
  const historyOutFetcher = useFetch<ProductOutHistory[]>(
    `${SERVER_URL}/products/${product_id}/out`
  );

  
  if (historyOutFetcher.isLoading || !historyOutFetcher.data)
    return <LoadingSpinner label="Mengambil histori barang masuk..." />;
  
  return (
    <div className="space-y-2">
      <p className="text-center text-sm font-semibold">Data Barang Keluar</p>
      <Separator />
      <ScrollArea className="h-96 w-full rounded-md border">
        <DataTable data={historyOutFetcher.data} columns={outHistoryColumns} />
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
