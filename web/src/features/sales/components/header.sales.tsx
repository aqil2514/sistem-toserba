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

export function SalesHeader() {
  const { mode } = useSales();
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-lg font-semibold">
        Data Penjualan {mode === "demo" && "(DEMO)"}
      </h1>
      <DialogForm />
    </div>
  );
}

const DialogForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
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
