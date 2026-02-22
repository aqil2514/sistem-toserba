import { LabelValue } from "@/@types/general";
import { ToolbarDatepicker } from "@/components/filters/filter-date-range";
import { FilterTextInput } from "@/components/filters/filter-text-input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useQueryBasics } from "@/hooks/use-query-basics";
import { useQueryParams } from "@/hooks/use-query-params";
import { useEffect, useState } from "react";

const buttonMap: LabelValue[] = [
  {
    label: "Semua",
    value: "all",
  },
  {
    label: "Pemasukan",
    value: "income",
  },
  {
    label: "Pengeluaran",
    value: "expense",
  },
  {
    label: "Piutang",
    value: "receivable",
  },
  {
    label: "Utang",
    value: "payable",
  },
];

export function CashflowFilterAllocation() {
  const { query, updateDateRange } = useQueryBasics();
  const { get, set } = useQueryParams();

  const type = get("type") ?? "all";
  return (
    <div className="space-y-4">
      <ToolbarDatepicker
        date={{
          from: query.from,
          to: query.to,
        }}
        onApply={updateDateRange}
        setDate={updateDateRange}
      />
      <Separator />
      <div className="flex gap-4">
        {buttonMap.map((button) => (
          <Button
            variant={button.value === type ? "default" : "outline"}
            onClick={() => set("type", button.value)}
            key={button.value}
            size={"sm"}
          >
            {button.label}
          </Button>
        ))}
      </div>
      <CategoryNameFilter />
    </div>
  );
}

const CategoryNameFilter = () => {
  const { get, set, remove } = useQueryParams();
  const categoryName = get("category-name") ?? "";

  const [inputValue, setInputValue] = useState<string>(categoryName);

  useEffect(() => {
    setInputValue(categoryName);
  }, [categoryName]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputValue.length === 0) return remove("category-name");
      set("category-name", inputValue);
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);
  return (
    <FilterTextInput
      onValueChange={setInputValue}
      value={inputValue}
      placeholder="Nama Kategori"
    />
  );
};
