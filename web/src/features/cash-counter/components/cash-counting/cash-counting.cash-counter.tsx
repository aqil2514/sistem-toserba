import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  CashCountingProvider,
  useCashCounts,
} from "../../store/cash-counting.provider";
import { useMemo } from "react";
import { CashCounts } from "../../types/type.cash-counter-cash-counting";
import { DataTable } from "@/components/organisms/ori-data-table/data-table";
import { cashCountsColumns } from "./sub/columns.cash-counting";
import { DataTableFooterServer } from "@/components/organisms/ori-data-table/data-table-footer-server";
import { Button } from "@/components/ui/button";
import { MutateButton } from "@/components/ui/mutate-button";
import { CashCountingAddDialog } from "../dialog/cash-counting/add-dialog.cash-counting";
import { CashCountingDetailDialog } from "../dialog/cash-counting/detail-dialog.cash-counting";
import { CashCountingEditDialog } from "../dialog/cash-counting/edit-dialog.cash-counting";
import { CashCountingDupplicateDialog } from "../dialog/cash-counting/dupplicate-dialog.cash-counting";
import { CashCountingDeleteDialog } from "../dialog/cash-counting/delete-dialog.cash-counting";
import { ToolbarDatepicker } from "@/components/filters/filter-date-range";

export function CashCounting() {
  return (
    <CashCountingProvider>
      <InnerTemplate />
    </CashCountingProvider>
  );
}

const InnerTemplate = () => {
  const { data, isLoading, query, updateQuery, mutate, setOpenDialog } =
    useCashCounts();

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
              if(!date) return;
              updateQuery("from", date.from)
              updateQuery("to", date.to)
            }}
            setDate={(date) => {
              if(!date) return;
              updateQuery("from", date.from)
              updateQuery("to", date.to)
            }}
          />
          <div className="flex gap-4">
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => setOpenDialog({ type: "add" })}
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
      <CashCountingDupplicateDialog />
      <CashCountingDeleteDialog />
    </>
  );
};
