import { useSales } from "../../store/sales.provider";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { defaultQuery } from "../../constants/default-query.sales";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { MutateButton } from "@/components/ui/mutate-button";
import { AddToCashflowButton } from "./add-to-cashflow-button";
import { useQueryParams } from "@/hooks/use-query-params";

export function SalesHeader() {
  const { data, resetQuery, query, mutate } = useSales();
  const { set } = useQueryParams();

  const isFiltered = JSON.stringify(query) !== JSON.stringify(defaultQuery);

  const cashflowAddHandler = async () => {
    try {
      await api.post("/cashflow/sales");

      toast.success("Transaksi berhasil ditambah");
    } catch (error) {
      console.error(error);
      toast.error("Terjadi Kesalahan");
      throw error;
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex gap-4 items-center">
        <h1 className="text-lg font-semibold">Data Penjualan</h1>
        {data && (
          <p>
            Total {new Intl.NumberFormat("id-ID").format(data.meta.total)} data
          </p>
        )}
      </div>
      <div className="md:flex gap-4 grid grid-cols-2">
        <AddToCashflowButton onClickButton={cashflowAddHandler} />
        <MutateButton
          mutate={mutate}
          successToastMessage="Data penjualan telah dimuat ulang"
        />
        <Button variant={"outline"} onClick={() => set("action", "add")}>
          <Plus /> Tambah Data
        </Button>
        {isFiltered && (
          <Button onClick={resetQuery} variant={"destructive"}>
            Reset Filter
          </Button>
        )}
      </div>
    </div>
  );
}
