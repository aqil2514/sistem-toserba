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
          >
            {item.itemLabel}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
