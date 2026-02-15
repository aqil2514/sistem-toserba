import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  CashCountingProvider,
  useCashCounts,
} from "../../../store/cash-counting.provider";
import { useMemo } from "react";
import { CashCounts } from "../../../types/type.cash-counter-cash-counting";
import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { cashCountsColumns } from "./sub/columns.cash-counting";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";
import { Button } from "@/components/ui/button";
import { MutateButton } from "@/components/ui/mutate-button";
import { CashCountingAddDialog } from "./dialogs/add-dialog.cash-counting";
import { CashCountingDetailDialog } from "./dialogs/detail-dialog.cash-counting";
import { CashCountingEditDialog } from "./dialogs/edit-dialog.cash-counting";
import { CashCountingDupplicateDialog } from "./dialogs/dupplicate-dialog.cash-counting";
import { CashCountingDeleteDialog } from "./dialogs/delete-dialog.cash-counting";
import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { useQueryParams } from "@/hooks/use-query-params";
import { BasicQuery } from "@/@types/general";
import { useQueryBasics } from "@/hooks/use-query-basics";

export function CashCounting() {
  return (
    <CashCountingProvider>
      <InnerTemplate />
    </CashCountingProvider>
  );
}

const InnerTemplate = () => {
  const { data, isLoading, query, mutate } = useCashCounts();
  const { set } = useQueryParams();
  const { updateDateRange, updateFooter } = useQueryBasics();

  const tableData = useMemo<CashCounts[]>(() => {
    if (!data) return [];

    return data.data;
  }, [data]);

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between">
          <ToolbarDatepicker
            date={{
              from: query.from,
              to: query.to,
            }}
            onApply={(date) => {
              if (!date) return;
              updateDateRange(date);
            }}
            setDate={(date) => {
              if (!date) return;
              updateDateRange(date);
            }}
          />
          <div className="flex gap-4">
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => set("action", "add")}
            >
              Tambah Data
            </Button>
            <MutateButton mutate={mutate} />
          </div>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <DataTable columns={cashCountsColumns} data={tableData} />
        )}
        {data && query && (
          <DataTableFooterServer
            meta={data.meta}
            query={query as BasicQuery}
            onQueryChange={updateFooter}
          />
        )}
      </div>

      <CashCountingAddDialog />
      <CashCountingDetailDialog />
      <CashCountingEditDialog />
      <CashCountingDupplicateDialog />
      <CashCountingDeleteDialog />
    </>
  );
};
