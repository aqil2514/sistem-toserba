"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash, Eye, Pencil } from "lucide-react";
import { Purchase } from "../types/purchase";

interface PurchaseActionsProps {
  purchase: Purchase;
  onDelete: (purchase: Purchase) => void;
  onDetail: (purchase: Purchase) => void;
  onEdit: (purchase: Purchase) => void;
}

export function PurchaseActions({
  purchase,
  onDelete,
  onDetail,
  onEdit,
}: PurchaseActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onDetail(purchase)}>
          <Eye className="mr-2 h-4 w-4" />
          Detail
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onEdit(purchase)}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => onDelete(purchase)}
        >
          <Trash className="mr-2 h-4 w-4" />
          Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
