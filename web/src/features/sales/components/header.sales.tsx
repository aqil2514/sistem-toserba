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
        <DialogForm />
        {isFiltered && <Button onClick={resetQuery} variant={"destructive"}>
          Reset Filter
        </Button>}
      </div>
    </div>
  );
}

const DialogForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="w-full md:w-auto">
          <Plus /> Tambah Data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
