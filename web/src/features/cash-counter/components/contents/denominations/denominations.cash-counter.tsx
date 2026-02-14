import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { denominationColumns } from "./columns.denominations";
import { Button } from "@/components/ui/button";
import { MutateButton } from "@/components/ui/mutate-button";
import { DenominationAddDialog } from "./dialogs/add-dialog.denomination";
import { DenominationEditDialog } from "./dialogs/edit-dialog.denomination";
import { DenominationDeleteDialog } from "./dialogs/delete-dialog-denomination";
import { DenominationProvider, useDenomination } from "@/features/cash-counter/store/denomination.provider";

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
      <DenominationDeleteDialog />
    </>
  );
};
