import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  CashCountingProvider,
  useCashCounts,
} from "../../store/cash-counting.provider";
import { useMemo } from "react";
import { CashCounts } from "../../types/type.cash-counter-cash-counting";
import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { cashCountsColumns } from "./columns.cash-counting";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";
import { Button } from "@/components/ui/button";
import { MutateButton } from "@/components/ui/mutate-button";
import { CashCountingAddDialog } from "../dialog/add-dialog.cash-counting";
import { CashCountingDetailDialog } from "../dialog/detail-dialog.cash-counting";
import { CashCountingEditDialog } from "../dialog/edit-dialog.cash-counting";

export function CashCounting() {
  return (
    <CashCountingProvider>
      <InnerTemplate />
    </CashCountingProvider>
  );
}

const InnerTemplate = () => {
  const { data, isLoading, query, updateQuery, mutate, setAddDialog } =
    useCashCounts();

  const tableData = useMemo<CashCounts[]>(() => {
    if (!data) return [];

    return data.data;
  }, [data]);

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
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <DataTable columns={cashCountsColumns} data={tableData} />
        )}
        {data && (
          <DataTableFooterServer
            meta={data.meta}
            query={query}
            onQueryChange={updateQuery}
          />
        )}
      </div>

      <CashCountingAddDialog />
      <CashCountingDetailDialog />
      <CashCountingEditDialog />
    </>
  );
};
