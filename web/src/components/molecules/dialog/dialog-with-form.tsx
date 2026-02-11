import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import React from "react";

interface DialogWithFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  FormComponent: React.ReactNode;
  title: string;
  description: string;
  isLoadingEdit?: boolean;
}

export function DialogWithForm({
  onOpenChange,
  open,
  FormComponent,
  title,
  description,
  isLoadingEdit,
}: DialogWithFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl space-y-4">
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
