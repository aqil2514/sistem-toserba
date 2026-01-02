import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SERVER_URL } from "@/constants/url";
import { useFetch } from "@/hooks/use-fetch";
import { ProductHistory } from "../../types/product-history";
import { inHistoryColumns } from "../columns/in-history.product";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Props {
  product_id: string;
}

export function HistoryInProduct({ product_id }: Props) {
  const historyInFetcher = useFetch<ProductHistory[]>(
    `${SERVER_URL}/products/${product_id}/in`
  );

  if (historyInFetcher.isLoading || !historyInFetcher.data)
    return <LoadingSpinner label="Mengambil histori barang masuk..." />;

  return (
    <div className="space-y-2">
      <p className="text-center text-sm font-semibold">Data Barang Masuk</p>
      <Separator />
      <ScrollArea className="h-96 w-full rounded-md border">
        <DataTable data={historyInFetcher.data} columns={inHistoryColumns} />
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
