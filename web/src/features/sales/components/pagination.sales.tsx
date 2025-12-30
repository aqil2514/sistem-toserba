import { Button } from "@/components/ui/button";
import { useSales } from "../provider/sales.provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export function PaginationSales() {
  const { data, updateQuery, query } = useSales();
  const [innerPage, setInnerPage] = useState<number>(data?.meta.page ?? 1);

  useEffect(() => {
    if (!data) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInnerPage(data.meta.page);
  }, [data]);

  if (!data) return null;

  const { meta } = data;

  const isFirstPage = meta.page <= 1;
  const isLastPage = meta.page >= meta.totalPages;

  const prevHandler = () => {
    if (isFirstPage) return;
    updateQuery("page", meta.page - 1);
  };

  const nextHandler = () => {
    if (isLastPage) return;
    updateQuery("page", meta.page + 1);
  };
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
      <div>
        <p className="text-muted-foreground text-sm">
          Halaman ke-{meta.page} dari {meta.totalPages} halaman
        </p>
      </div>
      <div className="flex lg:flex-row flex-col gap-4">
        <div className="flex gap-1">
          <Label>Limit : </Label>
          <Select
            value={String(query.limit)}
            onValueChange={(e) => updateQuery("limit", Number(e))}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-1">
          <Label className="whitespace-nowrap">Page : </Label>
          <Input
            type="number"
            max={meta.totalPages}
            min={1}
            value={innerPage}
            onChange={(e) => {
              if (e.target.valueAsNumber > meta.totalPages)
                return setInnerPage(meta.totalPages);
              setInnerPage(e.target.valueAsNumber);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateQuery("page", innerPage);
            }}
            onBlur={() => setInnerPage(query.page)}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          variant={"outline"}
          onClick={prevHandler}
          disabled={isFirstPage}
        >
          Sebelumnya
        </Button>
        <Button variant={"outline"} onClick={nextHandler} disabled={isLastPage}>
          Selanjutnya
        </Button>
      </div>
    </div>
  );
}
