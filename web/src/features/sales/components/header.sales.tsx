import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSales } from "../provider/sales.provider";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { defaultQuery } from "../constants/default-query";
import { FormSales } from "./form.sales";
import { useState } from "react";
import { toast } from "sonner";
import { SalesSchemaType } from "../schemas/sales-schema";
import { api } from "@/lib/api";
import { isAxiosError } from "axios";

export function SalesHeader() {
  const { mode, data, resetQuery, query } = useSales();

  const isFiltered = JSON.stringify(query) !== JSON.stringify(defaultQuery);
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex gap-4 items-center">
        <h1 className="text-lg font-semibold">
          Data Penjualan {mode === "demo" && "(DEMO)"}
        </h1>
        {data && (
          <p>
            Total {new Intl.NumberFormat("id-ID").format(data.meta.total)} data
          </p>
        )}
      </div>
      <div className="md:flex gap-4 grid grid-cols-2">
        <HeaderDialog />
        {isFiltered && (
          <Button onClick={resetQuery} variant={"destructive"}>
            Reset Filter
          </Button>
        )}
      </div>
    </div>
  );
}

const HeaderDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { mutate } = useSales();

  const submitHandler = async (values: SalesSchemaType) => {
    try {
      await api.post("/sales", values);
      toast.success("Data penjualan berhasil ditambah");
      mutate?.();
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response?.data;

        toast.error(data.message ?? "Terjadi kesalahan");
        return;
      }
      toast.error("Terjadi kesalahan");
      console.error(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="w-full md:w-auto">
          <Plus /> Tambah Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Tambah Data Penjualan</DialogTitle>
          <DialogDescription>
            Isi informasi di bawah ini untuk melakukan penambahan data penjualan
          </DialogDescription>
        </DialogHeader>

        <FormSales setOpen={setOpen} submitHandler={submitHandler} />
      </DialogContent>
    </Dialog>
  );
};
