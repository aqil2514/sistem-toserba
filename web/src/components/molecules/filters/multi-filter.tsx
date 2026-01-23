import { FilterState } from "@/@types/general";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useEffectEvent, useState } from "react";



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
      <PopoverContent className="space-y-4 w-96">
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
      <Button
        variant={"outline"}
        size={"sm"}
        disabled={snapshot.length === filterKeys.length}
        onClick={addHandler}
      >
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

  const deleteFilter = (index: number) => {
    setSnapshot((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {snapshot.map((snap, i) => {
        const usedKeys = snapshot.map((s) => s.key);

        return (
          <div key={`filter-${i}`} className="grid grid-cols-2 gap-4">
            <Select value={snap.key} onValueChange={(e) => updateKey(i, e)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {filterKeys.map((filterKey) => (
                  <SelectItem
                    disabled={
                      usedKeys.includes(filterKey.filterKey) &&
                      filterKey.filterKey !== snap.key
                    }
                    key={filterKey.filterKey}
                    value={filterKey.filterKey}
                  >
                    {filterKey.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-1 items-center ">
              <Input
                value={snap.value}
                onChange={(e) => updateValue(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onApplyFilter(snapshot);
                  if ((e.ctrlKey && e.key === "X") || e.key === "x")
                    deleteFilter(i);
                }}
              />
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => deleteFilter(i)}
              >
                X
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
