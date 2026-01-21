import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";

interface Props<TData> {
  table: Table<TData>;
}

export function PaginationDataTable<TData>({ table }: Props<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const maxPage = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;

  return (
    <div className="flex sm:flex-row flex-col items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground whitespace-nowrap">
        Halaman {pageIndex + 1} dari {maxPage}
      </p>

      <div className="flex gap-4">
        <Select value={String(pageSize)} onValueChange={(e) => table.setPageSize(Number(e)) } >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Page Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="number"
          value={pageIndex + 1}
          min={1}
          max={maxPage}
          onChange={(e) => {
            const value = e.target.valueAsNumber;
            if (Number.isNaN(value)) return;

            const nextPage = Math.min(Math.max(value - 1, 0), maxPage - 1);

            table.setPageIndex(nextPage);
          }}
        />
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Sebelumnya
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Berikutnya
        </Button>
      </div>
    </div>
  );
}
