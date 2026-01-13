import { BasicQuery, MetaResponseQuery } from "@/@types/general";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useMemo, useState } from "react";

interface Props<T extends BasicQuery> {
  query: T;
  onQueryChange: <K extends keyof T>(key: K, value: T[K]) => void;
  meta: MetaResponseQuery;
}

export function DataTableFooterServer<T extends BasicQuery>({
  onQueryChange,
  query,
  meta,
}: Props<T>) {
  return (
    <div className="flex gap-4 p-4">
      <Pagination
        totalPages={meta.totalPages}
        page={query.page}
        onPageChange={(page) => onQueryChange("page", page)}
      />
      <Limit
        totalData={meta.total}
        limit={query.limit}
        onLimitChange={(limit) => onQueryChange("limit", limit)}
      />
    </div>
  );
}

interface PaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
  page,
}) => {
  const memoPage = useMemo(() => page, [page]);
  const [snapshot, setSnapshot] = useState<number>(memoPage);

  return (
    <div className="flex gap-2">
      <Button
        variant={"outline"}
        size={"icon-sm"}
        disabled={memoPage === 1}
        onClick={() => {
          const newValue = memoPage - 1;
          setSnapshot(newValue);
          onPageChange(newValue);
        }}
      >
        <ChevronLeft />
      </Button>
      <div className="flex gap-2 items-center">
        <Input
          type="number"
          value={snapshot}
          max={totalPages}
          min={1}
          onChange={(e) => {
            const value = e.target.valueAsNumber;
            if (!value) return setSnapshot(1);
            if (value > totalPages) return setSnapshot(totalPages);
            if (value < 1) return setSnapshot(1);
            setSnapshot(value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onPageChange(e.currentTarget.valueAsNumber);
            }
          }}
        />
        <p className="text-xs font-semibold whitespace-nowrap">
          dari {totalPages} halaman
        </p>
      </div>
      <Button
        variant={"outline"}
        size={"icon-sm"}
        disabled={memoPage === totalPages}
        onClick={() => {
          const newValue = memoPage + 1;
          setSnapshot(newValue);
          onPageChange(newValue);
        }}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

interface LimitProps {
  totalData: number;
  limit: number;
  onLimitChange: (limit: number) => void;
}
const Limit: React.FC<LimitProps> = ({ totalData, limit, onLimitChange }) => {
  return (
    <div className="flex gap-2 items-center">
      <Select
        value={String(limit)}
        onValueChange={(e) => onLimitChange(Number(e))}
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Data" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10 Data</SelectItem>
          <SelectItem value="20">20 Data</SelectItem>
          <SelectItem value="50">50 Data</SelectItem>
          <SelectItem value="100">100 Data</SelectItem>
        </SelectContent>
      </Select>

      <p className="text-xs font-semibold whitespace-nowrap">
        Total {totalData} Data
      </p>
    </div>
  );
};
