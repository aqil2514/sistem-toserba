import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";
import React from "react";

type SizeType = "sm" | "md" | "lg" | "xl" | "xxl";

interface DialogWithFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  FormComponent: React.ReactNode;
  title: string;
  description: string;
  isLoadingEdit?: boolean;
  size?: SizeType;
}

const sizeMapper: Record<SizeType, string> = {
  sm: "sm:max-w-lg",
  md: "sm:max-w-2xl",
  lg: "sm:max-w-3xl",
  xl: "sm:max-w-4xl",
  xxl: "sm:max-w-5xl",
};

export function DialogWithForm({
  onOpenChange,
  open,
  FormComponent,
  title,
  description,
  isLoadingEdit,
  size = "md",
}: DialogWithFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("space-y-4", sizeMapper[size])}>
        <DialogHeader className="flex justify-between">
          <div>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </div>
        </DialogHeader>

        {isLoadingEdit ? <LoadingSpinner /> : FormComponent}
      </DialogContent>
    </Dialog>
  );
}
