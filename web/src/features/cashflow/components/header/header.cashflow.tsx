import { Button } from "@/components/ui/button";
import { useCashflow } from "../../store/provider.cashflow";

export function CashflowHeader() {
  const { setAddDialog } = useCashflow();
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Alur Kas (Cashflow)</h1>

        <Button variant={"outline"} onClick={() => setAddDialog(true)}>
          Tambah Data
        </Button>
      </div>
    </div>
  );
}
