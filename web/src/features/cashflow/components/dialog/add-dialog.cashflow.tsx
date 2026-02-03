import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCashflow } from "../../store/provider.cashflow";
import { CashflowForm } from "../form/cashflow.form";
import { api } from "@/lib/api";
import { CashflowSchemaType } from "../../schema/cashflow.schema";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export function CashflowAddDialog() {
  const { addDialog, setAddDialog, mutate } = useCashflow();

  const addHandler = async (values: CashflowSchemaType) => {
    try {
      await api.post("/cashflow", values);
      setAddDialog(false);
      toast.success("Data transaksi berhasil ditambah")

      mutate?.()
    } catch (error) {
      if(isAxiosError(error)){
        const message = error.response?.data.message?.[0] ?? "Terjadi kesalahan";

        toast.error(message);
      }
      console.error(error);
    }
  };
  
  return (
    <Dialog open={addDialog} onOpenChange={setAddDialog}>
      <DialogContent className="sm:max-w-2xl space-y-4">
        <DialogHeader>
          <DialogTitle>Tambah Data Transaksi Baru</DialogTitle>
          <DialogDescription>
            Isi form di bawah ini untuk menambahkan data transaksi
          </DialogDescription>
        </DialogHeader>

        <CashflowForm submitHandler={addHandler} />
      </DialogContent>
    </Dialog>
  );
}
