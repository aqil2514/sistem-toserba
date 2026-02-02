import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCashflow } from "../../store/provider.cashflow";
import { CashflowForm } from "../form/cashflow.form";

export function CashflowAddDialog() {
  const { addDialog, setAddDialog } = useCashflow();
  return (
    <Dialog open={addDialog} onOpenChange={setAddDialog}>
      <DialogContent className="sm:max-w-2xl space-y-4">
        <DialogHeader>
          <DialogTitle>Tambah Data Transaksi Baru</DialogTitle>
          <DialogDescription>
            Isi form di bawah ini untuk menambahkan data transaksi
          </DialogDescription>
        </DialogHeader>

        <CashflowForm submitHandler={(values) => console.log(values) } />
      </DialogContent>
    </Dialog>
  );
}
