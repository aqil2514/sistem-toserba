import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MutateButton } from "@/components/ui/mutate-button";
import { cn } from "@/lib/utils";
import React from "react";
import { KeyedMutator } from "swr";

type SizeType = "sm" | "md" | "lg" | "xl" | "xxl";

interface DialogWithFormProps<T = unknown> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  Component: React.ReactNode;
  title: string;
  description: string;
  isLoading?: boolean;
  size?: SizeType;
  mutate?: KeyedMutator<T>;
}

const sizeMapper: Record<SizeType, string> = {
  sm: "sm:max-w-lg",
  md: "sm:max-w-2xl",
  lg: "sm:max-w-3xl",
  xl: "sm:max-w-4xl",
  xxl: "sm:max-w-5xl",
};

export function DetailDialog<T = unknown>({
  onOpenChange,
  open,
  Component,
  title,
  description,
  isLoading,
  size = "md",
  mutate,
}: DialogWithFormProps<T>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("space-y-4", sizeMapper[size])}>
        <DialogHeader className="flex flex-row justify-between pr-4 items-center">
          <div>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </div>
          {mutate && <MutateButton mutate={mutate} />}
        </DialogHeader>

        {isLoading ? <LoadingSpinner /> : Component}
      </DialogContent>
    </Dialog>
  );
}
