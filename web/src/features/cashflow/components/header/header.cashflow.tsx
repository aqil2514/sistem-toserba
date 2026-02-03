import { Button } from "@/components/ui/button";
import { useCashflow } from "../../store/provider.cashflow";
import { MutateButton } from "@/components/ui/mutate-button";

export function CashflowHeader() {
  const { setAddDialog, mutate } = useCashflow();
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl">Alur Kas (Cashflow)</h1>

        <div className="flex gap-4">
          <MutateButton mutate={mutate} />

          <Button variant={"outline"} onClick={() => setAddDialog(true)}>
            Tambah Data
          </Button>
        </div>
      </div>
    </div>
  );
}
