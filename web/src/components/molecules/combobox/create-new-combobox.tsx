"use client";

import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onValueChange: (state: string) => void;

  items: string[];
  onItemsChange: (state: string[]) => void;

  placeholder?: string;
  valuePlaceholder?: string;

  disabled?: boolean;
}

export function ComboboxWithCreateAction({
  onValueChange,
  value,
  items,
  onItemsChange,

  placeholder = "Cari atau buat item",
  valuePlaceholder = "Cari atau buat item",

  disabled,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleCreate = () => {
    if (search && !items.includes(search)) {
      onItemsChange([...items, search]);
      onValueChange(search);
      setOpen(false);
      setSearch("");
    }
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-full justify-between"
          role="combobox"
          variant="outline"
          disabled={disabled}
        >
          {value || valuePlaceholder}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command loop={true}>
          <CommandInput
            onValueChange={setSearch}
            placeholder={placeholder}
            value={search}
          />
          <CommandList
            onWheel={(e) => {
              e.currentTarget.scrollBy({
                top: e.deltaY,
              });
            }}
          >
            <CommandEmpty>
              <Button
                className="w-full justify-start"
                onClick={handleCreate}
                variant="ghost"
              >
                <Plus className="mr-2 size-4" />
                Buat &quot;{search}&quot;
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  value={item}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      value === item ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
            {search && !items.includes(search) && items.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={handleCreate}>
                    <Plus className="mr-2 size-4" />
                    Buat &quot;{search}&quot;
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
