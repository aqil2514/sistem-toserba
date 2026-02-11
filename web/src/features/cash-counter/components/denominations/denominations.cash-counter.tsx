import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  DenominationProvider,
  useDenomination,
} from "../../store/denomination.provider";
import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { denominationColumns } from "./columns.denominations";
import { DenominationAddDialog } from "../dialog/add-dialog.denomination";
import { Button } from "@/components/ui/button";
import { DenominationEditDialog } from "../dialog/edit-dialog.denomination";
import { MutateButton } from "@/components/ui/mutate-button";

export function CashCounterDenominations() {
  return (
    <DenominationProvider>
      <InnerTemplate />
    </DenominationProvider>
  );
}

const InnerTemplate = () => {
  const { data, isLoading, setAddDialog , mutate} = useDenomination();

  if (isLoading) return <LoadingSpinner />;

  if (!data) return <div>Data tidak ditemukan</div>;

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-end gap-4">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => setAddDialog(true)}
          >
            Tambah Data
          </Button>
          <MutateButton mutate={mutate} />
        </div>
        <DataTable columns={denominationColumns} data={data} />
      </div>

      <DenominationAddDialog />
      <DenominationEditDialog />
    </>
  );
};
