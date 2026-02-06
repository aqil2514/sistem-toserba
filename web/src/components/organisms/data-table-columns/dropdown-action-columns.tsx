import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import React from "react";

export interface DropdownActionItems {
  onClick: () => void;
  itemLabel: string;
  className?: string;
  disabled?: boolean;
}

interface Props {
  menuLabel: React.ReactNode;
  items: DropdownActionItems[];
}

export function DropdownActionColumn({ menuLabel, items }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon-lg"}>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item, i) => (
          <DropdownMenuItem
            key={`dropdown-action-${i + 1}`}
            onClick={item.onClick}
            className={cn(item.className)}
            disabled={item.disabled}
          >
            {item.itemLabel}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
