import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface Props {
  open: boolean;
  onOpenChange: (state: boolean) => void;

  title?: string;
  description?: string;
}

export function LoadingDialog({
  onOpenChange,
  open,
  description = "Data sedang diambil, mohon tunggu...",
  title = "Mengambil data...",
}: Props) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <LoadingSpinner label="Loading..." />
      </DialogContent>
    </Dialog>
  );
}
