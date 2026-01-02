import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HistoryInProduct } from "./history-in.product";

interface Props {
  product_id: string;
}
export function ContentHistory({ product_id }: Props) {
  return (
    <>
      <Tabs defaultValue="in" className="w-full">
        <TabsList>
          <TabsTrigger value="in">Barang Masuk</TabsTrigger>
          <TabsTrigger value="out">Barang Keluar</TabsTrigger>
        </TabsList>
        <TabsContent value="in" className="w-full max-w-full overflow-hidden" >
          <HistoryInProduct product_id={product_id} />
        </TabsContent>
        <TabsContent value="out">Change your password here.</TabsContent>
      </Tabs>
    </>
  );
}
