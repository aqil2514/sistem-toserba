import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import React from "react";

interface ComboboxItem {
  value: string;
  label: string;
}

interface Props {
  data: ComboboxItem[];
  value: string;
  onValueChange: (state: string) => void;

  getLabel?: (item: ComboboxItem) => React.ReactNode;

  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
}

export function Combobox({
  data,
  placeholder = "Cari item...",
  searchPlaceholder = "Cari...",
  emptyText = "Data tidak ditemukan.",
  onValueChange,
  getLabel,
  value,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const selectedLabel = data.find((item) => item.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedLabel ?? placeholder}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command loop={true}>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList
            className="pointer-events-auto"
            onWheel={(e) => {
              e.currentTarget.scrollBy({
                top: e.deltaY,
              });
            }}
          >
            <CommandEmpty>{emptyText}</CommandEmpty>

            <CommandGroup>
              {data.map((item) => {
                const label = getLabel ? getLabel(item) : item.label;
                return (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    keywords={[item.label]}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
