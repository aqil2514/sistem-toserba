import {
  FilterOperator as FilterOperatorType,
  FilterState,
} from "@/@types/general";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useEffectEvent, useState } from "react";
import { FilterTextInput } from "./filter-text-input";

const dummyKey = [
  {
    filterKey: "key1",
    label: "Filter 1",
  },
  {
    filterKey: "key2",
    label: "Filter 2",
  },
  {
    filterKey: "key3",
    label: "Filter 3",
  },
  {
    filterKey: "key4",
    label: "Filter 4",
  },
  {
    filterKey: "key5",
    label: "Filter 5",
  },
];

export interface FilterKeyType {
  filterKey: string;
  label: string;
}

interface Props {
  filterKeys?: FilterKeyType[];
  initialValue: FilterState[];
  onApplyFilter: (state: FilterState[]) => void;
}

export function MultiFilter({
  filterKeys = dummyKey,
  initialValue,
  onApplyFilter,
}: Props) {
  const [snapshot, setSnapshot] = useState<FilterState[]>(initialValue);
  const [open, setOpen] = useState<boolean>(false);

  const syncInit = useEffectEvent(() => {
    setSnapshot(initialValue);
  });

  useEffect(() => {
    if (open) {
      syncInit();
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"}>Filter</Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-4 w-xl">
        <p className="font-semibold text-lg">Filter Data</p>
        <p className="text-muted-foreground text-xs font-semibold">
          {snapshot.length === 0
            ? "Belum ada filter"
            : `Terdapat ${snapshot.length} filter`}
        </p>
        <Separator />

        <FilterContent
          filterKeys={filterKeys}
          setSnapshot={setSnapshot}
          snapshot={snapshot}
          onApplyFilter={(state) => {
            onApplyFilter(state);
            setOpen(false);
          }}
        />

        <FilterFooter
          setSnapshot={setSnapshot}
          onApplyFilter={onApplyFilter}
          filterKeys={filterKeys}
          snapshot={snapshot}
          setOpen={setOpen}
        />
      </PopoverContent>
    </Popover>
  );
}

interface FilterFooterProps {
  setSnapshot: React.Dispatch<React.SetStateAction<FilterState[]>>;
  filterKeys: FilterKeyType[];
  snapshot: FilterState[];
  onApplyFilter: (state: FilterState[]) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterFooter: React.FC<FilterFooterProps> = ({
  setSnapshot,
  filterKeys,
  snapshot,
  onApplyFilter,
  setOpen,
}) => {
  const addHandler = () => {
    setSnapshot((prev) => [
      ...prev,
      { value: "", key: filterKeys[0].filterKey },
    ]);
  };

  const filterHandler = () => {
    onApplyFilter(snapshot);
    setOpen(false);
  };

  return (
    <div className="flex justify-between">
      <Button variant={"outline"} size={"sm"} onClick={addHandler}>
        Tambah Filter
      </Button>
      <Button variant={"outline"} onClick={filterHandler} size={"sm"}>
        Terapkan Filter
      </Button>
    </div>
  );
};

type FilterContentProps = Omit<FilterFooterProps, "setOpen">;
const FilterContent: React.FC<FilterContentProps> = ({
  filterKeys,
  setSnapshot,
  snapshot,
  onApplyFilter,
}) => {
  if (snapshot.length < 1) return null;

  const updateKey = (index: number, value: string) => {
    setSnapshot((prev) =>
      prev.map((item, i) => (i === index ? { ...item, key: value } : item)),
    );
  };

  const updateValue = (index: number, value: string) => {
    setSnapshot((prev) =>
      prev.map((item, i) => (i === index ? { ...item, value } : item)),
    );
  };

  const updateOperator = (index: number, value: FilterOperatorType) => {
    setSnapshot((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, operator: value } : item,
      ),
    );
  };

  const deleteFilter = (index: number) => {
    setSnapshot((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {snapshot.map((snap, i) => {
        return (
          <div
            key={`filter-${i}`}
            className="grid grid-cols-[40%_15%_40%] gap-4"
          >
            <Select value={snap.key} onValueChange={(e) => updateKey(i, e)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                {filterKeys.map((filterKey) => (
                  <SelectItem
                    key={filterKey.filterKey}
                    value={filterKey.filterKey}
                  >
                    {filterKey.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FilterOperator
              updateOperator={updateOperator}
              value={snap.operator ?? "ilike"}
              index={i}
            />

            <FilterTextInput
              value={snap.value}
              disabled={
                snap.operator === "is_null" || snap.operator === "is_not_null"
              }
              onValueChange={(e) => updateValue(i, e)}
              onEnterEvent={() => onApplyFilter(snapshot)}
              onClear={() => deleteFilter(i)}
              clearable
            />
          </div>
        );
      })}
    </div>
  );
};

type FilterOperatorProps = {
  value: FilterOperatorType;
  updateOperator: (index: number, value: FilterOperatorType) => void;
  index: number;
};

const FilterOperator: React.FC<FilterOperatorProps> = ({
  updateOperator,
  value,
  index,
}) => {
  return (
    <Select
      value={value}
      onValueChange={(val: FilterOperatorType) => updateOperator(index, val)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Operator" />
      </SelectTrigger>

      <SelectContent position="popper" className="w-96">
        <SelectGroup>
          <SelectLabel>Comparison</SelectLabel>

          <SelectItem value="eq" title="Sama dengan nilai">
            =
          </SelectItem>

          <SelectItem value="neq" title="Tidak sama dengan nilai">
            ≠
          </SelectItem>

          <SelectItem value="gt" title="Lebih besar dari nilai">
            &gt;
          </SelectItem>

          <SelectItem value="gte" title="Lebih besar atau sama dengan nilai">
            ≥
          </SelectItem>

          <SelectItem value="lt" title="Lebih kecil dari nilai">
            &lt;
          </SelectItem>

          <SelectItem value="lte" title="Lebih kecil atau sama dengan nilai">
            ≤
          </SelectItem>
        </SelectGroup>

        <SelectGroup>
          <SelectLabel>Text</SelectLabel>

          <SelectItem
            value="ilike"
            title="Mengandung teks (tidak peka huruf besar/kecil)"
          >
            contains
          </SelectItem>

          <SelectItem value="not_ilike" title="Tidak mengandung teks">
            not contains
          </SelectItem>
        </SelectGroup>

        <SelectGroup>
          <SelectLabel>Null</SelectLabel>

          <SelectItem value="is_null" title="Nilai kosong / tidak ada">
            is empty
          </SelectItem>

          <SelectItem value="is_not_null" title="Nilai tidak kosong">
            is not empty
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
