"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  value?: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}

export function CategoryCombobox({
  value,
  options,
  placeholder,
  onChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");

  const normalizedOptions = React.useMemo(
    () =>
      options.map((o) => ({
        raw: o,
        normalized: o.toLowerCase(),
      })),
    [options]
  );

  const exists = React.useMemo(() => {
    return normalizedOptions.some(
      (o) => o.normalized === input.toLowerCase()
    );
  }, [input, normalizedOptions]);

  function handleCreate() {
    if (!input.trim()) return;
    onChange(input.trim());
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput
            placeholder={`Pilih atau ketik ${placeholder.toLowerCase()}...`}
            value={input}
            onValueChange={setInput}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !exists) {
                e.preventDefault();
                handleCreate();
              }
            }}
          />

          <CommandEmpty>
            {input ? (
              <span>
                Tekan <b>Enter</b> untuk membuat &quot;
                <b>{input}</b>&quot;
              </span>
            ) : (
              "Tidak ada data"
            )}
          </CommandEmpty>

          <CommandGroup>
            {normalizedOptions.map(({ raw }) => (
              <CommandItem
                key={raw}
                value={raw}
                onSelect={() => {
                  onChange(raw);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === raw ? "opacity-100" : "opacity-0"
                  )}
                />
                {raw}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
