import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePurchase } from "@/features/purchase/store/provider.purchase";
import { PurchaseForm } from "../../form/form.purchase";
import { PurchaseFormValues } from "@/features/purchase/schema/purchase.schema";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export function PurchaseAddDialog() {
  const { addOpen, setAddOpen, mutate } = usePurchase();

  const submitHandler = async (values: PurchaseFormValues) => {
    try {
      await api.post("/purchase", values);
      toast.success("Data Pembelian berhasil ditambah");
      mutate?.();
      setAddOpen(false);
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
    <AlertDialog open={addOpen} onOpenChange={setAddOpen}>
      <AlertDialogContent className="sm:max-w-7xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Tambah Data Pembelian</AlertDialogTitle>
          <AlertDialogDescription>
            Isi form di bawah ini untuk menambah data pembelian
          </AlertDialogDescription>
        </AlertDialogHeader>

        <PurchaseForm onSubmit={submitHandler} />

        <AlertDialogFooter>
          <AlertDialogCancel>Kembali</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
