import { SortState } from "@/@types/general";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export interface SortingKeyType {
  sortingKey: string;
  label: string;
}

const dummyKey = [
  {
    sortingKey: "key1",
    label: "Filter 1",
  },
  {
    sortingKey: "key2",
    label: "Filter 2",
  },
  {
    sortingKey: "key3",
    label: "Filter 3",
  },
  {
    sortingKey: "key4",
    label: "Filter 4",
  },
  {
    sortingKey: "key5",
    label: "Filter 5",
  },
];

interface Props {
  sortingkeys?: SortingKeyType[];
  onSortStateChange: (state: SortState[]) => void;
}

export function SingleSorting({
  sortingkeys = dummyKey,
  onSortStateChange,
}: Props) {
  const [snapshotKey, setSnapshotKey] = useState<string>("unknown");
  const [snapshotValue, setSnapshotValue] = useState<"asc"| "desc">("asc");

  const clickHandler = () => {
    const newState: SortState[] = [
      {
        key: snapshotKey,
        value: snapshotValue,
      },
    ];

    onSortStateChange(newState);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"}>Sorting</Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-4 w-96">
        <p className="font-semibold text-lg">Urutkan Data</p>
        <Separator />
        <div className="grid grid-cols-[75%_auto] gap-4">
          <Select
            value={snapshotKey}
            onValueChange={(value) => setSnapshotKey(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Urutkan Data" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unknown">Belum diurutkan</SelectItem>
              {sortingkeys.map((sortKey) => (
                <SelectItem key={sortKey.sortingKey} value={sortKey.sortingKey}>
                  {sortKey.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Switch
              id="sort-mode"
              checked={snapshotValue === "asc"}
              onCheckedChange={(checked) => {
                setSnapshotValue(checked ? "asc" : "desc" )
              }}
            />
            <Label htmlFor="sort-mode">{snapshotValue.toUpperCase()}</Label>
          </div>
        </div>
        <Separator />
        <Button className="w-full" onClick={clickHandler} variant={"outline"}>
          Terapkan
        </Button>
      </PopoverContent>
    </Popover>
  );
}
