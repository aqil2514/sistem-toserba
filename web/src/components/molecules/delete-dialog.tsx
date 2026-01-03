import { LabelValue } from "@/@types/general";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface Props {
  title?: string;
  description?: string;
  contents?: LabelValue[];

  open: boolean;
  onOpenChange: (state: boolean) => void;

  onDeleteHandle: () => Promise<void> | void;
}

export function DeleteDialog({
  description = "Data yang dihapus tidak akan bisa dipulihkan",
  title = "Yakin Hapus Data?",
  contents,

  open,
  onOpenChange,
  onDeleteHandle,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteHandler = async () => {
    try {
      setIsLoading(true);
      await onDeleteHandle();
      toast.success("Data berhasil dihapus");
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat hapus data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-destructive/50">
        <DialogHeader>
          <DialogTitle className="text-destructive">{title}</DialogTitle>
          <DialogDescription className="font-medium">
            {description}
          </DialogDescription>
        </DialogHeader>

        {contents && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Data yang akan dihapus</AlertTitle>
            <AlertDescription>
              {contents.map((content, i) => (
                <p key={i} className="flex justify-between w-full">
                  <span className="text-muted-foreground">{content.label}</span>
                  <span className="font-medium">{content.value}</span>
                </p>
              ))}
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter className="flex gap-4">
          <Button
            variant={"destructive"}
            disabled={isLoading}
            onClick={deleteHandler}
          >
            {isLoading ? "Menghapus" : "Hapus"}
          </Button>
          <DialogClose asChild>
            <Button variant={"outline"} disabled={isLoading}>
              Batal
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
